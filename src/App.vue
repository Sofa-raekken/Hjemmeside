<template>
<div>
  <div class="flex flex-row">
    <SideBar class="w-1/6 h-screen"/>
    <div class="grow" >
      <HeaderBar/>
      <router-view class="h-full"/>
    </div>
  </div>
</div>
</template>

<script>

import HeaderBar from '@/layout/HeaderBar.vue'
import SideBar from '@/layout/SideBar.vue'

export default {
  name: 'StartView',
  components: {
    HeaderBar,
    SideBar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
