---
title: Asynchronous <select> options for dynamic forms with Vue 3
date: 2021-10-04
tags: [vue, typescript]
---

When working with generic forms, I came across another asynchronous behaviour issue. These forms were generated from a json schema, and some `<select>` fields needed their options fetched from an API. This fetch being done at form generation, two problems appeared: 
- The API call was made even when the field wasnt visible yet.
- The whole form/page would go boom if an API call failed (probably due to poor error handling as well).

The implementation would not really allow me to rewrite the whole thing and I had to come up with a workaround to lazy load the field options so the API would be called at the very last moment possible: when the field would appear on screen.

## Introducing asyncComputed

While I could have made a simple call to populate the options during my component's `mounted` hook. I wanted a bit more options related to asynchronous behaviour:
- knowing when the API call is loading.
- handling potential errors properly.

This is where VueUse and its `asyncComputed` come in. For those unfamiliar with the Vue 3 ecosystem and community, [VueUse](https://vueuse.org/) is an amazing project containing a lot of Composition API utilities for Vue.

This composable takes an asynchronous function and an initial state as parameters. It then resolves the function to populate that state and returns this wrapper in a reactive `Computed`. Even better, you can pass a boolean `Ref` as a third argument to keep track of the function resolution state (is it still pending?).

## Creating our own composable

Thanks to the composition API, we can make things as clean as possible and create our very own composable that will take care of fetching data and handling errors, exposing only the fetched values, the resolution state and a potential error.

We will assume you have a module that takes care of your API call given a string such as the following:

```ts title=src/services/options.ts
export async function getOptions(
  type: string
): Promise<Array<{ text: string; value: string }>> {
  const data = await fetch(`my-fake-api/${type}`)
  const options = await data.json()
  return options
}
```

Let's create a composable to consume that service and give us reactive options!

```ts title=src/composables/useAsyncOptions.ts
import type { Ref } from 'vue'
import { asyncComputed } from '@vueuse/core'

import { getOptions } from '~/services/options'

export default function useAsyncOptions(optionType: string): {
  evaluating: Ref<boolean>
  asyncOptions: Ref<Array<{ text: string; value: string }>>
  apiError: Ref<string>
} {
  const evaluating = ref(false)
  const apiError = ref('')

  const asyncOptions = asyncComputed(
    async () => {
      const options = await getOptions(optionType)
      apiError.value = ''
      return options
    },
    [],
    {
      lazy: true,
      evaluating,
      onError: e => {
        const { message } = e as Error
        apiError.value = message
      },
    }
  )

  return { evaluating, asyncOptions, apiError }
}
```

It may look complex but let's break it down.

We first initialize two reactive refs to store the API call status (`evaluating`) and store a potential error (`error`).
Then we call the `asyncComputed` composable with:
- a function that calls our `options` service and returns the fetched data (as well as resetting a previous error)
- a default list of options (here an empty array) to use while the call is evaluating
- an `AsyncComputedOptions` object.

This last object makes sure of 3 things:
- `lazy: true` makes it so the API call is only done when the `asyncOptions` computed property is accessed. Feel free to set it to `false` if you want the call to be done when the composable is called.
- `evaluating` keeps track of the API call resolution status.
- `onError` is the callback that will be executed if the asynchronous function passed as first parameter throws an error. Here we set it to fill our `apiError` data.

Here is how things will behave:
1. `asyncOptions` computed is accessed by the `<select>` field.
2. The API call is made and the `apiError` is reset to `''`. `asyncOptions`'s value is currently `[]` and `evaluating`'s value is `true`.
3. If the call resolves, `asyncOptions`'s value is now the API fetched values. If the call throws, `apiError`'s value is now the thrown error's message.
4. Either way, `evaluating`'s value is now `false`.

## Using our fresh asyncOptions composable

Because of the nature of Vue composables, using it in a Vue component is super easy and does not clutter the component with code it should not be responsible of. Here would be a very simple example if we were using Vuetify's `<v-select>` as our select.

```html title=src/components/AsyncSelect.vue
<script setup lang="ts">
import useAsyncOptions from '~/composables/useAsyncOptions'

const props = defineProps<{ optionType: string, modelValue: string }>()
const emit = defineEmits<{
  (e: 'update:model-value', value: string): void
}>()

const { 
  asyncOptions, 
  evalutating, 
  apiError 
} = useAsyncOptions(props.optionType)
</script>

<template>
  <v-select
    :error="apiError"
    :items="asyncOptions"
    :loading="evaluating"
    :model-value="modelValue"
    @update:model-value="(v: string) => emit('update:model-value', v)"
  />
</template>
```

We can now use our asynchronous select field in a form like any other :

```html
<!-- ... -->
<async-select
  v-if="selectIsVisible"
  v-model="selectValue"
  option-type="song"
/>
<!-- ... -->
```

In this example, our `<async-select>` waits until `selectIsVisible` is `true` to fetch some songs from our API. The component shows a loading state, until the user can select his favourite song from the dropdown. 

## Going further

This example was fairly simple in the way it handles errors and does not offer proper retry. But thanks (again) to how the Composition is used in Vue, everything is expandable, and you can absolutely complexify the composable with a more complete error handling, or add some field validation to the component.

Since we moved the fetching mechanism from the component itself, we only need to test the composable's behaviour. While this topic is not covered in this post, it is much easier to test a composable than a complete component.

I hope this article helped you understand some of the power of the Vue Composition API and how it can make not only make your Vue applications more efficient, but also your code cleaner.

## What if I still use Vue 2?

Everything explained above is compatible with Vue 2 if you use the [Composition API Plugin](https://github.com/vuejs/composition-api). You will just need to replace the `<script setup>` syntax with:

```html
<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup() {
    // the setup code here

    return {
      // variables and functions exposed to the template
    }
  }
})
</script>
```
And since any TypeScript code is also valid JavaScript, removing type annotations will make all the code compatible with plain JavaScript. And honestly, I would not be mad at anyone not willing to use TypeScript with Vue 2, but I hope this serves as an example of why the switch to Vue 3 can only be beneficial.

---

_If you want to know more about the composable used in this post, I highly recommend diving into [VueUse documentation](https://vueuse.org/core/asynccomputed). You may find other composables as well to help you in your projects. And if you can, consider helping the project by either contributing or sponsoring!_