<template>
  <div class="bg-zoo-green text-zootext text-lg font-bold">
    <ul class="mt-10">
      <li class="">
        <a
          v-if="!account"
          @click="SignIn"
          target="_blank"
          rel="noopener noreferrer"
        >
          Log ind
        </a>
        <a v-else @click="SignOut" target="_blank" rel="noopener noreferrer">
          <i class="fas fa-sign-out-alt fa-2x" aria-hidden="false"></i>
        </a>
        <p v-if="account">{{ account.name }}</p>
      </li>
      <li class="border-y-2 border-gray-500">
        <a href="/animals" class="text-green" >
          Dyr
        </a>
      </li>
      <li>
        <a href="/events" >
          Begivenheder
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { PublicClientApplication } from '@azure/msal-browser'

export default {
  data () {
    return {
      account: undefined
    }
  },
  async created () {
    this.$msalInstance = new PublicClientApplication(
      this.$store.state.msalConfig
    )
  },
  mounted () {
    const accounts = this.$msalInstance.getAllAccounts()
    if (accounts.length === 0) {
      return
    }
    this.account = accounts[0]
    this.$emitter.emit('login', this.account)
  },
  methods: {
    async SignIn () {
      await this.$msalInstance
        .loginPopup({})
        .then(() => {
          const myAccounts = this.$msalInstance.getAllAccounts()
          this.account = myAccounts[0]
          this.$emitter.emit('login', this.account)
        })
        .catch(error => {
          console.error(`error during authentication: ${error}`)
        })
    },
    async SignOut () {
      await this.$msalInstance
        .logout({})
        .then(() => {
          this.$emitter.emit('logout', 'logging out')
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
}
</script>

<style>

</style>
