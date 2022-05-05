<template>
<div>
  <div class="grid grid-cols-3 gap 3">
    <div class="invisible">
      <select>
        <option selected value="0">
          Alle dage
        </option>
      </select>
    </div>
    <div class="invisible">
      <select v-model="animalFilter">
        <option selected value="0">
          Alle
        </option>
        <option v-for="animal in animals" :key="animal.idAnimal" :value="animal.idAnimal">
          {{animal.name}}
        </option>
      </select>
    </div>
    <div class="center">
      <button class="float-right rounded bg-indigo-500 p-1 mb-3 mr-4 text-white font-semibold" @click="CreateEvent">Opret ny event</button>
    </div>
  </div>
  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead
      class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"      >
      <tr>
        <th scope="col" class="px-6 py-3">Navn</th>
        <th scope="col" class="px-6 py-3">Tidspunkt</th>
        <th scope="col" class="px-6 py-3 center">Actions</th>
        <th scope="col" class="px-6 py-3">Dyr</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700" v-for="(objEvent, index) in CleanEvents" :key="objEvent.idEvent">
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
          {{objEvent.name}}
        </th>
        <td class="px-6 py-4">
          Ikke sat
        </td>
        <td class="px-6 py-4">
          <button v-on:click="DeleteEvent(objEvent, index)">
            Delete
          </button>
        </td>
        <td class="px-6 py-4">
          {{objEvent.animals[0].name}}
        </td>
      </tr>
    </tbody>
  </table>
  <Modal
  v-model="isShow"
  :close="closeModal"
  class=""
  >
    <div class="bg-white w-1/4 p-5 rounded-xl">
      <h2 class="text-center text-4xl">
        {{modalType}}
      </h2>
      <div class="grid grid-cols-1 col-gap-1 content-center flex">
        <div class="my-2 p-2 mx-3 rounded border-2 flex">
          <label for="name" class="pr-2">Navn</label>
          <input type="text" class="grow" id="nameInput" v-model="event.name">
        </div>
        <div class="my-2 p-2 mx-3 rounded border-2 flex">
          <label for="latinName" class="pr-2">Beskrivelse</label>
          <input type="text" class="grow" id="latinNameInput" v-model="event.description">
        </div>
      </div>
      <div class="flow-root p-2">
        <button @click="SendRequest()" class="float-left rounded bg-blue-700 p-1 mb-3 mr-4 text-white font-semibold">
          {{modalType}}
        </button>
        <button @click="closeModal" class="float-right rounded bg-blue-700 p-1 mb-3 mr-4 text-white font-semibold">
          close
        </button>
      </div>
    </div>
  </Modal>
</div>
</template>

<script>
export default {
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      vm.init()
    })
  },
  data () {
    return {
      isShow: false,
      events: [],
      animals: [],
      event: {},
      animalFilter: 0,
      modalType: ''
    }
  },
  computed: {
    CleanEvents () {
      const arr = []
      for (let i = 0; i < this.events.length; i++) {
        const event = this.events[i]
        if (this.animalFilter !== 0 && event.animals[0].idAnimal !== this.animalFilter) {
          continue
        }
        if (event.animals.length === 0) {
          event.animals = [{ name: 'Not set' }]
        }
        arr.push(event)
      }
      return arr
    }
  },
  methods: {
    init () {
      this.$axios.get('https://sofaapi.azurewebsites.net/events').then(response => { this.events = response.data }).catch(err => { console.log(err) })
      this.$axios.get('https://sofaapi.azurewebsites.net/animals').then(response => { this.animals = response.data }).catch(err => { console.log(err) })
    },
    UpdateEvent (objEvent) {
      this.event = objEvent
      this.modalType = 'Opdater'
      this.showModal()
    },
    CreateEvent () {
      this.event = {
        description: '',
        name: '',
        idAnimal: 1
      }
      this.modalType = 'Opret'
      this.showModal()
    },
    showModal () {
      this.isShow = true
    },
    closeModal () {
      this.isShow = false
    },
    DeleteEvent (objEvent, index) {
      if (confirm('Er du sikker på du vil slette eventen "' + objEvent.name + '"?')) {
        this.$axios.delete('https://sofaapi.azurewebsites.net/events/' + objEvent.idEvent).then(this.events.splice(index, 1)).catch(error => { console.log(error) })
      }
    },
    SendRequest () {
      if (this.modalType === 'Opdater') {
        this.$axios.put('https://sofaapi.azurewebsites.net/events/' + this.event.idEvent, this.event).then((response) => { console.log(response.data) })
      } else {
        this.$axios.post('https://sofaapi.azurewebsites.net/events/', this.event).then((response) => { console.log(response.data) })
      }
    }
  }
}
</script>
