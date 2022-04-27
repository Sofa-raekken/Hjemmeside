<template>
  <div class="bg-zoo-green text-zootext text-lg font-bold">
    <ul class="mt-10">
      <div v-if="!account">
        <li class="border-b-2 border-gray-500"  >
          <a
            @click="SignIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Log ind
          </a>
        </li>
      </div>
      <div v-else>
        <li class="border-b-2 border-gray-500">
          <p v-if="account">{{ account.name }}</p>
        </li>
        <li class="border-b-2 border-gray-500">
          <a href="/animals" class="text-green" >
            Dyr
          </a>
        </li>
        <li class="border-b-2 border-gray-500">
          <a href="/events" >
            Begivenheder
          </a>
        </li>
        <li class="border-b-2 border-gray-500">
          <a href="/feedback" >
            Feedback
          </a>
        </li>
        <a @click="SignOut" target="_blank" rel="noopener noreferrer">
            Log out
        </a>
      </div>
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
    console.log('Got acconts')
    if (accounts.length === 0) {
      console.log('Not found')
      return
    }
    this.account = accounts[0]
    this.$emitter.emit('loginStuff', this.account)
    console.log(this.account)
  },
  methods: {
    async SignIn () {
      await this.$msalInstance
        .loginPopup({})
        .then(() => {
          const myAccounts = this.$msalInstance.getAllAccounts()
          // this.$axios.defaults.headers.common = {'Authorization': `bearer ${access_token}`}
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
