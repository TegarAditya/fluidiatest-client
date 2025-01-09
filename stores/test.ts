export const useTestStore = defineStore('test', {
  state: () => ({
    tests: {} as Test | undefined,
  }),
  persist: {
    storage: piniaPluginPersistedstate.localStorage(),
  },
  actions: {},
})
