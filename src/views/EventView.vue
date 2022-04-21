<template>
<div>
  <div class="grid grid-cols-3 gap 3">
    <div>
      <select>
        <option selected value="0">
          Alle dage
        </option>
      </select>
    </div>
    <div>
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
      <button class="float-right rounded bg-indigo-500 p-1 mb-3 mr-4 text-white font-semibold" @click="showModal">Opret ny event</button>
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
      <tr class="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700" v-for="objEvent in CleanEvents" :key="objEvent.idEvent">
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
          {{objEvent.name}}
        </th>
        <td class="px-6 py-4">
          Tidspunkt mangler
        </td>
        <td class="px-6 py-4">
          <button v-on:click="DeleteAnimal(objEvent.idAnimal, objEvent.name)">
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
    <div class="bg-white w-3/4 h-3/4">
      <h2 class="center text-4xl">
        {{modalType}}
      </h2>
      <div>
        <label for="name" class="">Navn</label>
        <input type="text" class="" id="nameInput" v-model="event.name">
        <label for="latinName" class="">Latinsk navn</label>
        <input type="text" class="" id="latinNameInput" v-model="event.latinName">
        <label for="animalBirthweight">Fødselsvægt</label>
        <input id="animalBirthweight" type="text" class=""/>
        <label for="description" class="">Beskrivelse</label>
        <input type="text" class="" id="descriptionInput" v-model="event.description">
        <label for="height" class="">Højde</label>
        <input type="text" class="" id="heightInput" v-model="event.height">
        <label for="latinName" class="">Latinsk navn</label>
        <input type="text" class="" id="latinNameInput" v-model="event.latinName">
        <label for="lifeExpectancy" class="">Levetid</label>
        <input type="text" class="" id="lifeExpectancyInput" v-model="event.lifeExpectancy">
        <label for="pregnancy" class="">Graviditetslængde</label>
        <input type="text" class="" id="pregnancyInput" v-model="event.pregnancy">
        <label for="weight" class="">Vægt</label>
        <input type="text" class="" id="weightInput" v-model="event.weight">
      </div>
      <button @click="SendRequest()" class="">
        {{modalType}}
      </button>
      <button @click="closeModal" class="">
        close
      </button>
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
      animalFilter: 0
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
      this.objEvent = {
        description: '',
        name: '',
        animal: {}
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
    SendRequest () {
      if (this.modalType === 'Opdater') {
        this.$axios.put('https://sofaapi.azurewebsites.net/events/' + this.event.idEvent, this.event).then((response) => { console.log(response.data) })
      } else {
        this.$axios.post('https://sofaapi.azurewebsites.net/animals/' + this.event.idEvent, this.event).then((response) => { console.log(response.data) })
      }
    }
  }
}
</script>
