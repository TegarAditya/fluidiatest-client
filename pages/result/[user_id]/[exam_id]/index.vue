<template>
  <div>
    <div class="relative flex flex-col justify-center" v-if="examResult">
      <div class="sticky top-0 bg-blue-300 z-10 w-full h-16">
        <div class="flex justify-center items-center h-full">
          <h1
            class="text-xl md:text-3xl text-white font-bold font-space_grotesk w-full text-center"
          >
            Hasil Ujian
          </h1>
        </div>
      </div>
      <div
        class="flex flex-col gap-5 items-center justify-center px-5 py-3 w-full mx-auto max-w-screen-lg"
      >
        <Card class="w-full">
          <template #content>
            <div class="flex flex-col gap-2">
              <p class="font-space_grotesk text-lg flex justify-between">
                Total Poin
                <span
                  :class="`${
                    totalPoints === examResult.responses.length * 4
                      ? 'text-green-500'
                      : 'text-red-500'
                  } font-semibold`"
                  >({{ totalPoints }}/{{
                    examResult.responses.length * 4
                  }})</span
                >
              </p>
            </div>
          </template>
        </Card>
      </div>
      <div class="flex flex-col gap-5 items-center justify-center px-5 py-5">
        <div
          v-for="(result, index) in examResult.responses"
          :key="result.questionCode"
          class="max-w-screen-lg"
        >
          <div class="flex justify-between items-center mb-2">
            <h2 class="text-lg font-semibold font-space_grotesk">
              Soal {{ index + 1 }} ({{ result.questionCode }})
            </h2>
            <div class="font-thin border px-2 py-1 rounded-md">
              Poin yang didapat:
              <span class="font-semibold font-space_grotesk">{{ result.points }}</span>
            </div>
          </div>
          <div
            class="prose prose-p:leading-6 overflow-x-hidden text-justify"
            v-html="result.question"
          ></div>
          <div class="flex flex-col gap-4 my-4">
            <Card>
              <template #content>
                <div>
                  <p class="font-bold font-space_grotesk">
                    Jawaban
                    <span
                      :class="`${
                        result.optionCorrect ? 'text-green-500' : 'text-red-500'
                      } font-semibold`"
                      >({{ result.optionCorrect ? 'Benar' : 'Salah' }})</span
                    >
                  </p>
                  <div class="flex gap-1" v-if="result.optionLabel">
                    <p
                      :class="`${
                        result.optionCorrect ? 'text-green-500' : 'text-red-500'
                      } prose font-semibold`"
                    >
                      {{ result.optionLabel }}.
                    </p>
                    <div
                      :class="`${
                        result.optionCorrect ? 'text-green-500' : 'text-red-500'
                      } prose`"
                      v-html="result.optionText"
                    ></div>
                  </div>
                  <p class="font-bold font-space_grotesk">
                    Alasan
                    <span
                      :class="`${
                        result.reasonCorrect ? 'text-green-500' : 'text-red-500'
                      } font-semibold`"
                      >({{ result.reasonCorrect ? 'Benar' : 'Salah' }})</span
                    >
                  </p>
                  <div class="flex gap-1" v-if="result.reasonLabel">
                    <p
                      :class="`${
                        result.reasonCorrect ? '' : 'text-red-500'
                      } prose font-semibold`"
                    >
                      {{ result.reasonLabel }}.
                    </p>
                    <div
                      :class="`${
                        result.reasonCorrect ? '' : 'text-red-500'
                      } prose`"
                      v-html="result.reasonText"
                    ></div>
                  </div>
                </div>
              </template>
            </Card>
            <Card>
              <template #title>
                <h4 class="text-lg font-semibold font-space_grotesk">Saran</h4>
              </template>
              <template #content>
                <div
                  class="prose prose-p:leading-6 overflow-x-hidden text-justify"
                  v-html="result.feedback"
                ></div>
              </template>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const config = useRuntimeConfig()

const userId = route.params.user_id as string
const examId = route.params.exam_id as string

const examResult = ref<ExamResultResponse | null>(null)
const isError = ref(false)

const totalPoints = computed(() => {
  if (!examResult.value) return 0
  return examResult.value.responses.reduce((acc, result) => {
    return acc + (result.points || 0)
  }, 0)
})

onMounted(async () => {
  try {
    const response = await fetch(
      `${config.public.apiBaseUrl}/api/result?user_id=${userId}&exam_id=${examId}`,
    )
    examResult.value = await response.json()
  } catch (error) {
    isError.value = true
  }
})
</script>

<style></style>
