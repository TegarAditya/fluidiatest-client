<template>
  <div class="relative min-h-[100dvh] w-screen bg-blue-100 select-none">
    <div class="sticky top-0 w-full h-16 bg-blue-400">
      <div class="flex justify-center items-center h-full">
        <h1 class="text-white font-space_grotesk text-lg font-semibold">
          {{ test?.code }}
        </h1>
      </div>
    </div>
    <div class="px-5 flex flex-col gap-7 py-10">
      <div
        class="flex flex-col gap-4"
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
              class="flex items-start gap-2 p-2 border rounded-xl bg-white"
              v-for="(choice, choiceIndex) in question.options"
              :key="choiceIndex"
            >
              <input
                type="radio"
                :id="`${question.id}-${choiceIndex}`"
                :name="`${question.id}`"
                :value="choiceIndex"
                class="mt-2"
                required
              />
              <label
                class="w-full overflow-x-auto flex items-start gap-2"
                :for="`${question.id}-${choiceIndex}`"
              >
                <div>
                  <span>{{ choice.label }}.</span>
                </div>
                <div v-html="choice.option"></div>
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
                v-for="(choice, choiceIndex) in question.reasons"
                :key="choiceIndex"
              >
                <input
                  type="radio"
                  :id="`reason-${question.id}-${choiceIndex}`"
                  :name="`reason-${question.id}`"
                  :value="choiceIndex"
                  class="mt-2"
                  required
                />
                <label
                  class="w-full overflow-x-auto flex items-start gap-2"
                  :for="`reason-${question.id}-${choiceIndex}`"
                >
                  <div>
                    <span>{{ choice.label }}.</span>
                  </div>
                  <div v-html="choice.reason"></div>
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
        <Button severity="secondary" rounded v-show="!isLastQuestion">
          <span>{{ questionIndex + 1 }} / {{ test?.questions.length }}</span>
        </Button>
        <Button
          label="Selesai"
          severity="danger"
          rounded
          v-show="isLastQuestion"
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
  </div>
</template>

<script lang="ts" setup>
const questionIndex = ref(0)
const testStore = useTestStore()

const test = computed(() => testStore.test)

const isLastQuestion = computed(
  () => questionIndex.value === (test.value?.questions.length ?? 0) - 1,
)

function nextQuestion() {
  questionIndex.value++
}

function prevQuestion() {
  questionIndex.value--
}
</script>

<style></style>
