<template>
  <div
    class="relative min-h-[100dvh] w-full bg-blue-100 select-none scroll-smooth"
  >
    <ClientOnly>
      <div class="sticky top-0 w-full h-16 z-20 bg-blue-400">
        <div class="flex justify-between items-center h-full">
          <div></div>
          <h1 class="text-white font-space_grotesk text-lg font-semibold">
            {{ remaingTime }}
          </h1>
          <div></div>
        </div>
      </div>
      <div
        ref="el"
        class="px-5 flex flex-col items-center gap-7 py-10 min-h-[100dvh]"
      >
        <div
          class="flex flex-col gap-4 max-w-2xl"
          v-for="(question, index) in test?.questions"
          v-show="index === questionIndex"
        >
          <Card>
            <template #title>
              <h2 class="text-lg font-semibold font-space_grotesk">
                Soal {{ index + 1 }}
              </h2>
            </template>
            <template #content>
              <div
                class="prose prose-p:leading-6 overflow-x-hidden text-justify"
                v-html="question.question"
              ></div>
            </template>
          </Card>
          <Panel header="Pilih jawabanmu" class="rounded-xl" toggleable>
            <div class="grid grid-cols-1 gap-2">
              <div
                v-for="option in question.options"
                :key="option.id"
                class="flex items-start gap-2"
              >
                <input
                  type="radio"
                  :id="'option-' + option.id"
                  :name="'question-' + question.id"
                  :value="option.id"
                  class="mt-2"
                  :checked="selectedOptions[question.id] === option.id"
                  @change="updateAnswer(question.id, option.id, selectedReasons[question.id] ?? null)"
                />
                <label class="flex gap-3" :for="'option-' + option.id">
                  <div>
                    <span>{{ option.label }}.</span>
                  </div>
                  <div v-html="option.option"></div>
                </label>
              </div>
            </div>
          </Panel>
          <div>
            <Panel
              header="Pilih alasan jawabanmu"
              class="rounded-xl"
              toggleable
              v-if="test?.isMultiTier"
            >
              <div class="grid grid-cols-1 gap-2">
                <div
                  class="flex items-start gap-2 p-2 border rounded-xl bg-white h-full"
                  v-for="(reason, reasonIndex) in question.reasons"
                  :key="reasonIndex"
                >
                  <input
                    type="radio"
                    :id="`reason-${question.id}-${reasonIndex}`"
                    :name="`reason-${question.id}`"
                    :value="reasonIndex"
                    class="mt-2"
                    required
                    :checked="selectedReasons[question.id] === reason.id"
                    @change="updateAnswer(question.id, reason.id, selectedReasons[question.id] ?? null)"
                  />
                  <label
                    class="w-full overflow-x-auto flex items-start gap-2"
                    :for="`reason-${question.id}-${reasonIndex}`"
                  >
                    <div>
                      <span>{{ reason.label }}.</span>
                    </div>
                    <div v-html="reason.reason"></div>
                  </label>
                </div>
              </div>
            </Panel>
          </div>
        </div>
      </div>
      <div
        class="sticky bottom-0 w-full h-16 bg-blue-400 shadow-lg z-10 border-t"
      >
        <div class="flex justify-center items-center gap-5 h-full">
          <Button
            label="<<"
            severity="secondary"
            rounded
            @click="prevQuestion"
            :disabled="questionIndex === 0"
          />
          <Button
            severity="secondary"
            rounded
            v-show="!isLastQuestion"
            class="w-32"
            @click="visibleNavigation = true"
          >
            <span
              >{{ questionIndex + 1 }} dari {{ test?.questions.length }}</span
            >
          </Button>
          <Button
            label="Selesai"
            severity="danger"
            rounded
            v-show="isLastQuestion"
            class="w-32 font-semibold"
            @click="confirmSubmit"
          />
          <Button
            label=">>"
            severity="secondary"
            rounded
            @click="nextQuestion"
            :disabled="questionIndex === Number(test?.questions.length) - 1"
          />
        </div>
      </div>
      <Drawer
        v-model:visible="visibleNavigation"
        position="bottom"
        style="height: auto"
      >
        <template #header>
          <div class="flex items-center gap-2">
            <span class="font-bold">Daftar Nomor Soal</span>
          </div>
        </template>
        <div class="w-full">
          <div class="grid grid-cols-5 gap-5 pb-5">
            <div v-for="(question, index) in test?.questions" :key="index">
              <Button
                :label="String(index + 1)"
                class="w-8 h-8"
                :class="{
                  'bg-blue-400 text-white': index === questionIndex,
                  'bg-white text-blue-400': index !== questionIndex,
                }"
                @click="navigateQuestion(index), (visibleNavigation = false)"
              />
            </div>
          </div>
        </div>
      </Drawer>
      <Toast />
      <ConfirmDialog></ConfirmDialog>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
const confirm = useConfirm()
const toast = useToast()

const el = ref<HTMLElement | null>(null)

const visibleNavigation = ref(false)

const questionIndex = ref(0)
const testStore = useTestStore()
const test = computed(() => testStore.test)

let interval: ReturnType<typeof setInterval>
const elapsedTime = ref(0)
const remaingTime = computed(() => {
  const duration = Number(test.value?.duration)
  const remaining = duration - elapsedTime.value
  return formatTime(remaining)
})

const confirmSubmit = () => {
  confirm.require({
    message: 'Are you sure you want to proceed?',
    header: 'Konfirmasi',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Kembali',
      severity: 'secondary',
    },
    acceptProps: {
      label: 'Submit',
    },
    accept: () => {
      toast.add({
        severity: 'info',
        summary: 'Submitted',
        detail: 'Terimakasih, jawaban anda telah disubmit',
        life: 3000,
      })
      setTimeout(() => {
        navigateTo('https://fluidiatest.id/student', { external: true })
      }, 3000)
    },
  })
}

const isLastQuestion = computed(
  () => questionIndex.value === (test.value?.questions.length ?? 0) - 1,
)

function nextQuestion() {
  questionIndex.value++
  window.scrollTo(0, 0)
}

function prevQuestion() {
  questionIndex.value--
  window.scrollTo(0, 0)
}

function navigateQuestion(index: number) {
  questionIndex.value = index
  window.scrollTo(0, 0)
}

const selectedOptions = ref<Record<number, number>>({})
const selectedReasons = ref<Record<number, number>>({})

const initializeSelections = () => {
  testStore.answers.forEach((answer) => {
    selectedOptions.value[answer.questionId] = answer.optionId
    selectedReasons.value[answer.questionId] = answer.reasonId
  })
}

const updateAnswer = (questionId: number, optionId: number | null, reasonId: number | null) => {
  if (optionId && reasonId) {
    testStore.setAnswer(questionId, optionId, reasonId)
  }
  if (optionId) {
    selectedOptions.value[questionId] = optionId
  }
  if (reasonId) {
    selectedReasons.value[questionId] = reasonId
  }
}

onMounted(async () => {
  if (!testStore.test) {
    await navigateTo('/')
  }

  initializeSelections()

  if (interval) clearInterval(interval)
  interval = setInterval(() => {
    elapsedTime.value += 1000
  }, 1000)
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>

<style></style>
