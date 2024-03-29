---
title: Making a Discord bot with TypeScript and deploying to Heroku
date: 2020-01-20
tags: [node, typescript, heroku]
---

As being part of communities (mostly revolving around gaming), I use Discord a lot. With the exponential growth of the platform arrived the use of Bots. They allow automated tasks ranging from welcoming new members to moderating chats as well as organize minigames for users. I wanted to create my own bot, because there was no bot that had all the features I needed. The great news is that JavaScript is the language of choice when it comes to building Discord bots. The amazing [Discord.JS](https://discord.js.org/) library almost covers 100% of the Discord API.

## Building the bot

To create a bot, we need to access the Discord API and inject our keys into our bots.

### Setting up on Discord's side

Before creating a bot, we need to create an application on the [Discord Developer portal](https://discordapp.com/developers/applications). Just click the `New Application` button, give it a name and `Create`. You can give your app some descriptive information if you want, keep in mind that it is your app and not the bot itself. To create it, go to the `Bot` tab, then `Add Bot`. This is where you can customize your bot, and how it will appear to other users. Copy the token and keep it preciously aside, the Node app will use it to connect to Discord.

Our final task in the Discord dashboard is to add the bot to one of our servers. Go to the `OAuth2` tab, tick the `bot` scope and pick the permissions you want your bot to be granted upon connection (you can change them later if you can edit roles on the server). For now `Send messages` will be enough. Copy the link generated, and navigate to it, you are prompted to pick a server (that you are admin of) for your bot to join. And voilà, your bot is now on the server, sleeping in the `offline` group.

### Bootstrapping our server

Discord.JS gives a tiny example of a simple bot. Here is the code:

```javascript title=src/app.js
require('dotenv').config()

const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!')
  }
})

client.login(process.env.D_TOKEN)
```

I assume you know how to create a node application so we just add the dependency with `yarn add discord.js` and paste our token in an environment variable called `D_TOKEN`. I use [dotenv](https://www.npmjs.com/package/dotenv) to keep the variables in the project, remember to never push your `.env` file! Now we run `node app.js` and our bot is automagically connected to our server! Type "ping" and it will respond with "pong".

That's great... but what about TypeScript ?

Discord.JS has the amazing advatage to be built with classes in mind. It comes with types so we won't even need to get some `@types`. I do think TypeScript is a great way to build a Discord bot for several reasons. On the left hand, since we constantly use the API and the client, it is really tricky to write useful unit tests; types give us a level of security, making sure our calls to the API will always be well formatted and complete, meaning less potential error on our side. On the second hand, leveraging the type system allow us to bring in abstraction and write reusable and more secure code.

### Let's convert it!

I will assume you have `tsc` installed and know the basics of TypeScript. Since any valid JavaScript is valid TypeScript, we can add our TS dependency with `yarn add -D typescript` and our dotenv types with `yarn add -D @types/dotenv` and change our `app.js` to `app.ts`. We then initialize our tsconfig with `tsc --init` and uncomment the following lines:

```json title=tsconfig.json
{
  "compilerOptions": {
    ...
    "outDir": "./dist",
    "rootDir": "./src",
    ...
  }
}
```

Then we change the scripts in our `package.json`:

```json title=package.json
{
  ...
  "scripts": {
    "build": "tsc --builld tsconfig.json",
    "start": "node dist/app.js",
    "dev": "yarn build && yarn start"
  }
  ...
}
```

I will not cover a `--watch` for now. Feel free to do it on your own.

### Singleton to the rescue

Since we work with TypeScript, how about using the **Singleton design pattern** for our bot? Since the Discord API Key is stored as an environment variable, we want to avoid having multiple instances of it as they would conflict with each other. Typescript makes it super easy; all we need is:

- a `private` constructor, not callable outside of the class.
- a `static instance` referencing our single insance of the class.
- a `getInstance` method to get the instance of the class. It follows a lazy evaluation strategy, so it creates the instance when called for the first time.

```typescript title=src/app.ts
import { DiscordBot } from './DiscordBot'

require('dotenv').config()

const bot = DiscordBot.getInstance()

bot.connect()
```

```typescript title=src/DiscordBot.ts
import { Client } from 'discord.js'

export class DiscordBot {
  private static instance: DiscordBot

  private client: Client = new Client()

  private constructor() {
    this.initializeClient()
  }

  static getInstance(): DiscordBot {
    if (!DiscordBot.instance) {
      DiscordBot.instance = new DiscordBot()
    }
    return DiscordBot.instance
  }

  connect(): void {
    this.client
      .login(process.env.D_TOKEN)
      .then(_ => console.log('Connected to Discord'))
      .catch(error =>
        console.error(`Could not connect. Error: ${error.message}`)
      )
  }

  private initializeCient(): void {
    if (!this.client) return

    this.setReadyHandler()
    this.setMessageHandler()
  }

  private setReadyHandler(): void {
    this.client.on('ready', () => {
      console.log(`Logged in as ${this.client.user.tag}!`)
    })
  }

  private setMessageHandler(): void {
    this.client.on('message', async (message: Message) => {
      //* filters out requests from bots
      if (message.author.bot) return

      if (message.content === 'ping') {
        await message.reply('Pong!')
      }
    })
  }
}
```

We have our `client` as the only property, instantiated when `DiscordBot` is created. It is private because we do not want to access it (or modify it) from outside of the class. The constructor then initializes out handlers. Those will handle (duh) events our client catches. They are listed in the [Client documentation](https://discord.js.org/#/docs/main/stable/class/Client).

We can now run our server with `yarn dev` and we should see it on the server, up and running. It should respond to "ping" messages with "pong". Time to deploy the bot and have it running 24/7!

## Deploying the bot

There are many ways to deploy a NodeJS application. I like Heroku because it is dead simple to use to host websites or applications and build convenient CI/CD pipelines. It uses containers called "dynos". Just sign up or login into [Heroku](https://id.heroku.com/login) and install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#download-and-install).

### Configuring the app

We built a bot, which is an application that will be running all the time, listening to events we asked it to. We need to tell Heroku our application will be using a "Worker" dyno type and which script it should run on start. We just add a file named `Procfile` at the root of the project container the script.

```yaml title=Procfile
worker: yarn start
```

To get the code running up there, Heroku needs to get the source code, build the app, then run it. We need to initialize a git repo (if that's not done already) and add the `.gitignore` for node apps, you can find one [here](https://www.gitignore.io/api/node).

### Pushing the code

With a couple commands, we will be set.

```bash
$ git add .
$ git commit -m 'To heroku!'
$ heroku login
```

We are now prompted to log in to Heroku, before being redirected to the command line.

```bash
$ heroku create
$ git push heroku master
```

We now let it do its job until it's done, hopefully without a single error.

### Switching to the worker

We need to "activate" our worker dyno. From our app dashboard on Heroku. Next to `Dyno formation` is `Configure Dynos ->`. Click on it, turn the web off, and the worker on.

![Screenshot of the Heroku interface showing worker dyno on and web dyno off](heroku-dynos-discord.png)

Finally, we set our `D_TOKEN` in our app's variables from the `Settings` tab in `Config Vars`.

And that's it. All we need to have a Discord bot running 24/7, built using TypeScript and Discord.JS.

---

_All this code is part of my ZoeBot3 project. You can find more infos on the [GitHub repo](https://github.com/prazdevs/zoebot3). If you encounter any issue, or have any question, let me know, I'd be more than happy to help!_
