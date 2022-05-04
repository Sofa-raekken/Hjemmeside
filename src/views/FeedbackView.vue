<template>
<div>
  <div class="grid grid-cols-4 gap-3">
    <div v-for="objFeedback in feedback" :key="objFeedback.idFeedback" class="border-4 rounded border-gray-200 float-left">
      <p>
        {{objFeedback.comment}}
      </p>
      <p>Vurdering: {{objFeedback.rate}}</p>
      <button class="p-1 rounded bg-red-600 text-white" @click="CloseFeedback(objFeedback.idFeedback)">Luk Feedback</button>
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
      this.$axios.get('https://sofaapi.azurewebsites.net/feedback?count=8').then(response => { this.feedback = response.data }).catch(err => { console.log(err) })
    },
    CloseFeedback (id) {
      this.$axios.put('https://sofaapi.azurewebsites.net/feedback/' + id + '/resolve', { isResolved: 'true' })
    }
  }
})
</script>
