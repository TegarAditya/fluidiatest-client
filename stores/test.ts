export const useTestStore = defineStore('test', {
  state: () => ({
    test: {} as Test | undefined,
  }),
  persist: {
    storage: piniaPluginPersistedstate.localStorage(),
  },
  actions: {
    setTest(test: Test) {
      this.test = test
    }
  },
})
