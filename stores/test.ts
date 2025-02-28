export const useTestStore = defineStore('test', {
  state: () => ({
    user: {} as User | undefined,
    test: {} as Test | undefined,
    meta: {} as TestMeta | undefined,
    answers: [] as Answer[],
  }),
  persist: {
    storage: piniaPluginPersistedstate.localStorage(),
  },
  actions: {
    setUser(user: User) {
      this.user = user
    },
    setTest(test: Test) {
      this.test = test
    },
    setMeta() {
      const now = Date.now()
      const durationInMs = this.test?.duration ?? 0

      const startedAt = new Date(now)
      const closedAt = new Date(now + durationInMs)
      const finishedAt = new Date(now + durationInMs)

      this.meta = {
        userId: this.user?.public_id ?? '',
        testId: this.test?.id ?? '',
        duration: this.test?.duration ?? 0,
        startedAt,
        closedAt,
        finishedAt,
      }
    },
    setFinishedAt() {
      this.meta!.finishedAt = new Date()
    },
    setAnswer(questionId: number, optionId: number, reasonId: number) {
      const existingAnswer = this.answers.find(
        (answer) => answer.questionId === questionId
      )
      if (existingAnswer) {
        existingAnswer.optionId = optionId
        existingAnswer.reasonId = reasonId
      } else {
        this.answers.push({ questionId, optionId, reasonId })
      }
    },
    clearMeta() {
      this.meta = undefined
    },
    clearAnswers() {
      this.answers = []
    },
  },
})
