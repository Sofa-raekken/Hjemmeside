<template>
<div>
  <div class="grid col-4 col-gap1">
    <div v-for="objFeedback in feedback" :key="objFeedback.idFeedback" class="border-4 rounded border-gray-200">

    </div>
  </div>
</div>
</template>
<script>

export default ({
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      vm.GetFeedback()
    })
  },
  data () {
    return {
      feedback: []
    }
  },
  computed: {
    CalculateRating () {
      return this.feedback.reduce((a, b) => a.rate + b.rate)
    }
  },
  methods: {
    GetFeedback () {
      this.$axios.get('https://sofaapi.azurewebsites.net/feedback/').then(response => { this.feedback = response.data }).cathch(err => { console.log(err) })
    }
  }
})
</script>
