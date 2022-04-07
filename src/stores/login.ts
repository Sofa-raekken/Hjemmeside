import { defineStore } from 'pinia'

export const loginStore = defineStore({
  id: 'login',
  state: () => ({
    msalConfig: {
      auth: {
        clientId: '5def4d67-7693-4a08-a71f-f3ff47182412',
        authority:
          'https://login.microsoftonline.com/e801a3ad-3690-4aa0-a142-1d77cb360b07',
      },
      cache: {
        cacheLocation: 'localStorage',
      },
    },
    accessToken: ''
  }),
  getters: {
  },
  actions: {
    setAccessToken(state, token){
      state.accessToken = token;
    }
  }
})
