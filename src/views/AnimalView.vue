<template>
<div>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <button class="float-right rounded bg-indigo-500 p-1 mb-3 mr-4 text-white font-semibold">Opret nyt dyr</button>

    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"      >
        <tr>
          <th scope="col" class="px-6 py-3">Name</th>
          <th scope="col" class="px-6 py-3">Species</th>
          <th scope="col" class="px-6 py-3" colspan="2">Actions</th>
          <th scope="col" class="px-6 py-3">Opret QR</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700" v-for="objAnimal in animals" :key="objAnimal.id">
          <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
            {{objAnimal.Name}}
          </th>
          <td class="px-6 py-4">{{objAnimal.Species}}</td>
          <td class="px-6 py-4">
            <button v-on:click="DeleteAnimal(objAnimal.id, objAnimal.Name)">
              Edit
            </button>
          </td>
          <td class="px-6 py-4">
            <button v-on:click="DeleteAnimal(objAnimal.id, objAnimal.Name)">
              Delete
            </button>
          </td>
          <td>
            <button class="button">
              Opret
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      axios.get('https://sofaapi.azurewebsites.net/animals').then((response) => {
        vm.animals = response.data
      }).catch((error) => {
        console.log(error)
      })
      vm.animals.push({ id: 1, Name: 'test', Species: 'test' })
    })
  },
  data () {
    return {
      animals: [],
      animal: {}
    }
  },
  methods: {
    DeleteAnimal (id, name) {
      if (confirm('Er du sikker på du vil slette ' + name + '?')) {
        axios.delete('https://sofaapi.azurewebsites.net/animals/' + id).then(response => { console.log(response.data) }).catch(error => { console.log(error) })
      }
    },
    UpdateAnimal () {
      axios.patch('https://sofaapi.azurewebsites.net/animals/' + this.animal.id, this.animal).then((response) => {
        console.log(response.data)
      })
    },
    CreateQR (id) {
      axios.get('https://sofaapi.azurewebsites.net/animals/' + id).then(response => { console.log(response.data) }).catch(error => { console.log(error) })
    }
  }
}
</script>
