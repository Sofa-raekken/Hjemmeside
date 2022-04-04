<template>
  <div>
    <h2 class="text-4xl center">Login</h2>
    <label for="LoginUsername" class="text-xl">Username</label>
    <input type="text" v-model="username" name="Username" id="Username"/>
    <label for="LoginPassword" class="text-xl">Password</label>
    <input type="password" v-model="password" name="LoginPassword" id="LoginPassword"/>
    <button @click="submit">Log ind</button>
  </div>
</template>

<script lang="ts">
export default {
  data () {
    return {
      password:"",
      username:""
    }
  },
  methods: {
    submit () {
      this.$http.post("https://login.microsoftonline.com/1f1d0810-cd59-4055-868b-fd8c0739f409/oauth2/v2.0/authorize", )
    }
  }
};
</script>

<style></style>
