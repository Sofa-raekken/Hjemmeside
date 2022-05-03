<template>
<div>
</div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'FrontPage',
  data () {
    return {
      account: undefined,
      containers: [],
      msg: String
    }
  },
  created () {
    this.$emitter.on(
      'loginStuff', async function (account) {
        this.account = account
        this.$msalInstance.setActiveAccount(this.account)
        console.log('Getting Token')
        await this.GetToken()
      }.bind(this)
    )
    this.$emitter.on('logout', function () {
      console.log('logging out')
      this.account = undefined
    }.bind(this))
  },
  methods: {
    ...mapMutations(['setAccessToken']),
    async GetToken () {
      const request = {
        scopes: ['api://a48a1ddd-adac-4b5c-981e-498871d6a602/ReadAccess']
      }
      try {
        const tokenResponse = await this.$msalInstance.acquireTokenSilent(request)
        this.$axios.defaults.headers.common = { Authorization: `Bearer ${tokenResponse.accessToken}` }
      } catch (error) {
        const tokenResponse = await this.$msalInstance.acquireTokenPopup(request)
        this.$axios.defaults.headers.common = { Authorization: `Bearer ${tokenResponse.accessToken}` }
        this.$store.commit('setAccessToken', tokenResponse.accessToken)
      }
      // this.$emitter.emit('login', this.account)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
