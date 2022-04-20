<template>
<div>
  <div class="grid grid-cols-4 gap 3">
    <div>
    </div>
    <div>
    </div>
    <div>
    </div>
    <div>
      <select>
        <option v-for="animal in animals" :key="animal.idAnimal">
          {{animal.name}}
        </option>
      </select>
    </div>
  </div>
  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead
      class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"      >
      <tr>
        <th scope="col" class="px-6 py-3">Navn</th>
        <th scope="col" class="px-6 py-3">Tidspunkt</th>
        <th scope="col" class="px-6 py-3 center" colspan="2">Actions</th>
        <th scope="col" class="px-6 py-3">Dyr</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700" v-for="objAnimal in animals" :key="objAnimal.idAnimal">
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
          {{objAnimal.name}}
        </th>
        <td class="px-6 py-4">{{objAnimal.Species}}</td>
        <td class="px-6 py-4">
          <button v-on:click="UpdateAnimal(objAnimal)">
            Edit
          </button>
        </td>
        <td class="px-6 py-4">
          <button v-on:click="DeleteAnimal(objAnimal.idAnimal, objAnimal.name)">
            Delete
          </button>
        </td>
        <td>
          <button class="button">
            Download
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
export default {
  data () {
    return {
      events: [],
      animals: [],
      event: {}
    }
  },
  methods: {
    init () {
      this.$axios.get('https://sofaapi.azurewebsites.net/events').then(response => { this.events = response.data }).catch(err => { console.log(err) })
      this.$axios.get('https://sofaapi.azurewebsites.net/animals').then(response => { this.animals = response.data }).catch(err => { console.log(err) })
    },
    UpdateAnimal (objAnimal) {
      this.animal = objAnimal
      this.modalType = 'Opdater'
      this.showModal()
    },
    CreateAnimal () {
      this.animal = {
        birthWeight: '',
        description: '',
        height: '',
        latinName: '',
        lifeExpectancy: '',
        name: '',
        pregnancy: '',
        qr: '',
        weight: ''
      }
      this.modalType = 'Opret'
      this.showModal()
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
