<template>
<div>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <button class="float-right rounded bg-indigo-500 p-1 mb-3 mr-4 text-white font-semibold" @click="CreateEvent">Opret nyt dyr</button>

    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"      >
        <tr>
          <th scope="col" class="px-6 py-3">Name</th>
          <th scope="col" class="px-6 py-3">Species</th>
          <th scope="col" class="px-6 py-3 text-center" colspan="2">Actions</th>
          <th scope="col" class="px-6 py-3">Download QR</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700" v-for="objAnimal in animals" :key="objAnimal.idAnimal">
          <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
            {{objAnimal.name}}
          </th>
          <td class="px-6 py-4">{{objAnimal.Species}}</td>
          <td class="px-6 py-4">
            <button v-on:click="UpdateAnimal(objAnimal)" class="rounded-lg bg-red-600 p-2 text-white">
              Edit
            </button>
          </td>
          <td class="px-6 py-4">
            <button v-on:click="DeleteEvent(objAnimal.idAnimal, objAnimal.name)" class="rounded-lg bg-blue-700 text-white p-2">
              Delete
            </button>
          </td>
          <td>
            <a href="https://sofastorage.blob.core.windows.net/container-qrcode/test.png" download class="rounded-lg bg-blue-700 text-white p-2" @click="Download">
              Download
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
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
          <input type="text" class="grow" id="nameInput" v-model="animal.name">
        </div>
        <div class="my-2 p-2 mx-3 rounded border-2 flex">
          <label for="latinName" class="pr-2">Latinsk navn</label>
          <input type="text" class="grow" id="latinNameInput" v-model="animal.latinName">
        </div>
        <div class="my-2 p-2 mx-3 rounded border-2 flex">
          <label for="animalBirthweight" class="pr-2">Fødselsvægt</label>
          <input id="animalBirthweight" type="text" class="grow"/>
        </div>
        <div class="my-2 p-2 mx-3 rounded border-2 flex">
          <label for="description" class="pr-2">Beskrivelse</label>
          <input type="text" class="grow" id="descriptionInput" v-model="animal.description">
        </div>
        <div class="my-2 p-2 mx-3 rounded border-2 flex">
          <label for="height" class="pr-2">Højde</label>
          <input type="text" class="grow" id="heightInput" v-model="animal.height">
        </div>
        <div class="my-2 p-2 mx-3 rounded border-2 flex">
          <label for="lifeExpectancy" class="pr-2">Levetid</label>
          <input type="text" class="grow" id="lifeExpectancyInput" v-model="animal.lifeExpectancy">
        </div>
        <div class="my-2 p-2 mx-3 rounded border-2 flex">
          <label for="pregnancy" class="pr-2">Graviditetslængde</label>
          <input type="text" class="grow" id="pregnancyInput" v-model="animal.pregnancy">
        </div>
        <div class="my-2 p-2 mx-3 rounded border-2 flex">
          <label for="weight" class="pr-2">Vægt</label>
          <input type="text" class="grow" id="weightInput" v-model="animal.weight">
        </div>
      </div>
      <div class="flow-root p-2">
        <button @click="SendRequest()" class="float-left">
          {{modalType}}
        </button>
        <button @click="closeModal" class="float-right">
          close
        </button>
      </div>
    </div>
  </Modal>
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
    })
  },
  data () {
    return {
      isShow: false,
      animals: [],
      animal: {
        birthWeight: '',
        description: '',
        height: '',
        latinName: '',
        lifeExpectancy: '',
        name: '',
        pregnancy: '',
        qr: '',
        weight: ''
      },
      modalType: ''
    }
  },
  methods: {
    DeleteEvent (id, name) {
      if (confirm('Er du sikker på du vil slette ' + name + '?')) {
        axios.delete('https://sofaapi.azurewebsites.net/events/' + id).then(response => { console.log(response.data) }).catch(error => { console.log(error) })
      }
    },
    UpdateEvent (objAnimal) {
      this.animal = objAnimal
      this.modalType = 'Opdater'
      this.showModal()
    },
    CreateEvent () {
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
    CreateQR (id) {
      axios.get('https://sofaapi.azurewebsites.net/animals/' + id).then(response => { console.log(response.data) }).catch(error => { console.log(error) })
    },
    SendRequest () {
      if (this.modalType === 'Opdater') {
        axios.put('https://sofaapi.azurewebsites.net/animals/' + this.animal.idAnimal, this.animal).then((response) => { console.log(response.data) })
      } else {
        axios.post('https://sofaapi.azurewebsites.net/animals/' + this.animal.idAnimal, this.animal).then((response) => { console.log(response.data) })
      }
    },
    showModal () {
      this.isShow = true
    },
    closeModal () {
      this.isShow = false
    }
  }
}
</script>
