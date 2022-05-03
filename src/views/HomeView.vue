<template>
<div>
  <div>
    <FrontPage msg="Welcome to Your Vue.js App"/>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import FrontPage from '@/components/FrontPage.vue'

export default {
  name: 'HomeView',
  components: {
    FrontPage
  }
}
</script>
