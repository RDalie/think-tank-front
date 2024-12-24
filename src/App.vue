<template>
  <div>
    <p>
      {{ loggedInUser ? `Logged in as ${loggedInUser.name}` : 'Not logged in' }}
    </p>

    <form>
      <input type="email" placeholder="Email" v-model="email" />
      <input type="password" placeholder="Password" v-model="password" />
      <input type="text" placeholder="Name" v-model="name" />
      <button type="button" @click="login(email, password)">Login</button>
      <button type="button" @click="register">Register</button>
      <button type="button" @click="logout">Logout</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import { account, ID } from './lib/appwrite'
import type { Models } from 'appwrite'

const loggedInUser = ref<Models.User<Models.Preferences> | null>(null)
const email = ref('')
const password = ref('')
const name = ref('')

const login = async (email: string, password: string) => {
  await account.createEmailPasswordSession(email, password)
  loggedInUser.value = await account.get()
}

const register = async () => {
  await account.create(ID.unique(), email.value, password.value, name.value)
  login(email.value, password.value)
}

const logout = async () => {
  await account.deleteSession('current')
  loggedInUser.value = null
}
</script>
