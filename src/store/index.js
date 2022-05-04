import { createStore } from 'vuex'

export default createStore({
  state () {
    return {
      msalConfig: {
        auth: {
          clientId: 'a48a1ddd-adac-4b5c-981e-498871d6a602',
          authority:
            'https://login.microsoftonline.com/1f1d0810-cd59-4055-868b-fd8c0739f409'
        },
        cache: {
          cacheLocation: 'localStorage'
        }
      },
      accessToken: ''
    }
  },
  getters: {
    getToken (state) {
      return state.accessToken
    }
  },
  mutations: {
    setAccessToken (state, token) {
      state.accessToken = token
    }
  },
  actions: {
  },
  modules: {
  }
})
