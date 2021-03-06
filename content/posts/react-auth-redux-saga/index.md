---
title: Handling async authentication flow in React with Redux & Redux-Saga
date: 2020-06-30
tags: [react, redux]
---
# Handling async authentication flow in React with Redux & Redux-Saga

Redux is an amazing state management solution but it doesn't allow proper handling of asynchronous operations. You may have heard of a common solution that is the `redux-thunk` middleware. But for this time, we will use another solution called `redux-saga`. Sagas make use of generator functions (introduced in ES6) to handle impure actions. In this post we'll build a small (and fairly ugly, no styling this time) React app that implements a basic authentication flow. We'll use `json-server` as a fake backend to keep things simple and frontend-centered.

## Preparing the project

Let's start with creating and adding everything we need before diving into Redux things.

### Creating the app and adding dependencies

You're probably used to creating apps by now, so as usual, let's use the `yarn create react-app redux-sagas-auth` to create our app.

Then we add some dev dependencies for our backend with `yarn add -D json-server json-server-auth`, and dependencies for our frontend with `yarn add axios redux react-redux redux-saga redux-logger`.

### Setting up the backend environment

If you're not familiar with _json-server_, it's a great way to mock a REST API and database from a simple json file. We are using `json-server-auth` which implements JWT based authentication on top of json-server, you can learn more about that amazing package [here](https://www.npmjs.com/package/json-server-auth). Let's add some scripts and a proxy to our `package.json` to start up our backend server.

```json package.json
{
  // ...
  "scripts": {
    "server": "json-server-auth db.json --port 3001",
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "proxy": "http://localhost:3001"
  // ...
}
```

It simply runs the binary contained in the package with a `--port 3001` option to avoid conflicts with the React app that usually runs on port 3000.

Finally, let's add our database json file at the root of the project.

```json title=db.json
{
  "users": []
}
```

And that's it, we can start our server by running `yarn server` and we should see a friendly face saying hi and some infos about the running database/server. Now onto the real stuff...

_Note: feel free to clean up the default CRA app, I usually strip it down to a single h1 tag._

## Redux and sagas

I assume you are a bit familiar with Redux, if not, feel free to check [their documentation](https://redux.js.org/), there is a lot to be learnt from there. _Reducers are just pure functions that take the previous state and an action, and return the next state_ (taken from the documentation), that's great but when it comes to handling impure behaviors such as asynchronous calls (like our API calls), we need to add a bit to Redux. As stated earlier, you could use thunks which are fairly simple (don't let the name fool you). Or you could use... sagas. Sagas make use of generator functions, if you're not familiar with them, I recommend checking [this great article from Tania Rascia](https://www.taniarascia.com/understanding-generators-in-javascript/). Let's configure Redux in our app.

### Creating the store

Let's start by adding the provider in our `index.js`.

```js title=src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import store from './store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

Now let's create the store itself.

```js title=src/store/index.js
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware, logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export default store;
```

We simply create our store with a root reducer (that we will add right after) and also add 2 pieces of middleware to Redux :

- `redux-logger` will log everything that passes through Redux, you can see it as a simple version of the more complete `redux-devtools`. Note that you don't want to log everything in production, so be careful to only add the middleware in your dev environment.
- `redux-saga` will handle the sagas (duh) and deal with our asynchronous behavior, we pass it a root saga in the same fashion as we pass a root reducer to the store creation method.

### Adding actions, action creators and reducers

Our store will only have one reducer (and one module basically), the auth one. So let's now create our root reducer, nothing fancy.

```js title=src/store/rootReducer.js
import { combineReducers } from 'redux';

import auth from './auth/authReducer';

export default combineReducers({ auth });
```

I personally like defining the action types available first, and I try to be exhaustive, that way, I am less prone to forget one. Here are our action types for authentication.

```js title=src/store/auth/authActionTypes.js
const userActionTypes = {
  LOG_IN_START: 'LOG_IN_START',
  LOG_IN_SUCCESS: 'LOG_IN_SUCCESS',
  LOG_IN_FAILURE: 'LOG_IN_FAILURE',
  REGISTER_START: 'REGISTER_START',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAILURE: 'REGISTER_FAILURE',
  LOG_OUT: 'LOG_OUT',
};

export default userActionTypes;
```

For both asynchronous actions, we define an entry point and two issues: success or failure. The `LOG_OUT` will not call the API and simply wipe our token from the store.
Let's add the action creators.

```js title=src/store/auth/authActions.js
import types from './authActionTypes';

export const logInStart = (credentials) => ({
  type: types.LOG_IN_START,
  payload: credentials,
});

export const logInSuccess = (user) => ({
  type: types.LOG_IN_SUCCESS,
  payload: user,
});

export const logInFailure = (error) => ({
  type: types.LOG_IN_FAILURE,
  payload: error,
});

export const registerStart = (credentials) => ({
  type: types.REGISTER_START,
  payload: credentials,
});

export const registerSuccess = (user) => ({
  type: types.REGISTER_SUCCESS,
  payload: user,
});

export const registerFailure = (error) => ({
  type: types.REGISTER_FAILURE,
  payload: error,
});

export const logOut = () => ({
  type: types.LOG_OUT,
});
```

Nothing special here either, we make sure to pass the right payload depending on the situation. Finally, we add the reducer.

```js title=src/store/auth/authReducer.js
import types from './authActionTypes';

const INITIAL_STATE = {
  currentUser: null,
  error: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.LOG_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
      };
    case types.LOG_IN_FAILURE:
    case types.REGISTER_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case types.LOG_OUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default authReducer;
```

The reducer's goal is to upate the state. It cannot handle impure functions, that is why `LOG_IN_START` and `REGISTER_START` will be handled by sagas.

That's it for our usual Redux stuff, it is time to get our hands dirty with sagas, and make clean code.

### Creating sagas

First we need a root saga, as opposed to the root reducer.

```js title=src/store/rootSaga.js
import { all, call } from 'redux-saga/effects';

import { authSagas } from './auth/authSagas';

export default function* rootSaga() {
  yield all([call(authSagas)]);
}
```

But what are those `all` and `call` function ?  
_"In redux-saga, Sagas are implemented using Generator functions. To express the Saga logic, we yield plain JavaScript Objects from the Generator. We call those Objects Effects. An Effect is an object that contains some information to be interpreted by the middleware."_ Those functions are effect creators (call) and combinators (all). You can find much more complete explanation [here](https://redux-saga.js.org/docs/basics/DeclarativeEffects.html).

Now let's create our auth sagas.

```js title=src/store/auth/authSagas/js
import axios from 'axios';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  logInFailure,
  logInSuccess,
  registerFailure,
  registerSuccess,
} from './authActions';
import types from './authActionTypes';

const logIn = async (email, password) => {
  const response = await axios.post('/login', {
    email,
    password,
  });
  return { token: response.data.accessToken };
};

const register = async (email, password) => {
  await axios.post('/register', {
    email,
    password,
  });
};

export function* logInWithCredentials({ payload: { email, password } }) {
  try {
    const user = yield logIn(email, password);
    yield put(logInSuccess(user));
  } catch (error) {
    yield put(logInFailure(error));
  }
}

export function* registerWithCredentials({ payload: { email, password } }) {
  try {
    yield register(email, password);
    yield put(registerSuccess({ email, password }));
  } catch (error) {
    yield put(registerFailure(error));
  }
}

export function* logInAfterRegister({ payload: { email, password } }) {
  yield logInWithCredentials({ payload: { email, password } });
}

export function* onLogInStart() {
  yield takeLatest(types.LOG_IN_START, logInWithCredentials);
}

export function* onRegisterStart() {
  yield takeLatest(types.REGISTER_START, registerWithCredentials);
}

export function* onRegisterSuccess() {
  yield takeLatest(types.REGISTER_SUCCESS, logInAfterRegister);
}

export function* authSagas() {
  yield all([
    call(onLogInStart),
    call(onRegisterStart),
    call(onRegisterSuccess),
  ]);
}
```

I know that looks like a lot, so let's break it down bit by bit.

The two first functions `logIn` and `register` are the functions responsible for calling the API, we could put them in a separate layer (such as a service) but to avoid having too many files around, they will remain here.

`logInWithCredentials` receives a payload (the one from the `LOG_IN_START` action). It yields the result of the previous `logIn` method: if it succeeds, it will then `put` (read dispatch) the `LOG_IN_SUCCESS` action, if it fails, it will then `put` the `LOG_IN_FAILURE` action. Each action will get its corresponding payload.

`registerWithCredentials` is identical, but with registration.

`logInAfterRegister` is a bit more special but self explanatory. It will be called upon registration to trigger login. Sagas can call sagas!

`onLoginStart`, `onRegisterStart` and `onRegisterSuccess` are the functions responsible of creating the effect corresponding to the action dispatched. For example, with `onLoginStart`,
`yield takeLatest(types.LOG_IN_START, logInWithCredentials);` will trigger the `logInWithCredentials` saga when `LOG_IN_START` is dispatched. `takeLatest` will cancel any previous saga task started previously if it's still running. There are other effect creators such as `take`, `takeEvery`, `takeMaybe`... All described extensively in the documentation.

Finally, the exported `authSagas` combines the effect creators, just like the root saga does.

And if you think of it, all of our actions can now be handled properly, so let's create some very basic form components and try it out!

## Putting things together

### Creating components

I decided to go for some very basic and ugly components to keep the focus on Redux and not styling. We start with login.

```js title=src/components/LogIn.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { logInStart } from '../store/auth/authActions';

const LogIn = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const dispatch = useDispatch();

  const handleChange = (e) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(logInStart(credentials));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>LOGIN</h2>
      <label>
        Email
        <input
          name="email"
          type="text"
          value={credentials.email}
          onChange={handleChange}
        />
      </label>
      <label>
        Password
        <input
          name="password"
          type="password"
          value={credentials.password}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Log In</button>
    </form>
  );
};

export default LogIn;
```

Then onto the registration.

```js title=src/components/Register.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { registerStart } from '../store/auth/authActions';

const Register = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const dispatch = useDispatch();

  const handleChange = (e) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerStart(credentials));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>REGISTER</h2>
      <label>
        Email
        <input
          name="email"
          type="text"
          value={credentials.email}
          onChange={handleChange}
        />
      </label>
      <label>
        Password
        <input
          name="password"
          type="password"
          value={credentials.password}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Log In</button>
    </form>
  );
};

export default Register;
```

They are so similar we could have only made one more generic component, but in a real world app, we usually have different logic and complexity in those.  
Add the fresh components to the main app with some conditional rendering based on the store data, put a logout button and an error display.

```js title=src/App.js
import './App.css';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LogIn from './components/LogIn';
import Register from './components/Register';
import { logOut } from './store/auth/authActions';

function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div className="App">
      {auth.currentUser ? (
        <>
          <div>Connected user with token {auth.currentUser.token}</div>
          <button onClick={() => dispatch(logOut())}>Log out</button>
        </>
      ) : (
        <>
          <LogIn />
          <Register />
          {auth.error ? <span>{auth.error?.response.data}</span> : null}
        </>
      )}
    </div>
  );
}

export default App;
```

It's time to try things out in the browser!

### Seeing our sagas in action

If you didn't already, start your react app with `yarn start`. Let's also open the browser console.
If we try creating a user, it should work fine and we should also be logged in right away!

![redux-logger in the console](redux-sagas-auth-log.png)

As you can see, _redux-logger_ logs the actions that run through the reducers. We also get the infos about actions that are dispatched by sagas with the `@@redux-saga/SAGA_ACTION: true`. Feel free to play around with it and also try logging in with the wrong credentials or creating a user with an already registered email to see how errors are being handled!

That wraps up that very basic take on authentication with redux-sagas. I hope it helped you understand a bit of the power of sagas, it might seem like a lot of code at first, but they are very convenient for handling complex asynchronous behaviors such as authentication.

---

_All this code is availabe on the [GitHub repo](https://github.com/prazdevs/react-auth-redux-saga). If you encounter any issue, or have any question, let me know, I'd be more than happy to help!_
