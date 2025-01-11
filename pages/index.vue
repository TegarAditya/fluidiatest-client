<template>
  <div class="w-screen">
    <div class="flex justify-center items-center w-full min-h-[100dvh]">
      <ClientOnly>
        <Card
          class="md:max-w-md mx-2 overflow-hidden"
          v-if="test?.id"
          v-motion-pop-visible-once
        >
          <template #header>
            <div class="h-44 md:h-56 w-full aspect-video">
              <img
                class="object-cover w-full h-full"
                src="https://static.vecteezy.com/system/resources/previews/009/800/389/non_2x/back-to-school-doodle-a-large-set-of-elements-illustration-in-line-style-vector.jpg"
                alt="thumbnail"
              />
            </div>
          </template>
          <template #title>
            <span class="font-semibold text-xl font-space_grotesk">
              {{ test?.code }} {{ test?.isMultiTier ? '- Diagnostik' : '' }}
            </span>
          </template>
          <template #subtitle>
            <div class="flex gap-2 font-semibold">
              <p class="text-sm">
                Durasi: {{ formatDuration(Number(test?.duration)) }},
              </p>
              <p class="text-sm">Jumlah: {{ test?.questions.length }} soal</p>
            </div>
          </template>
          <template #content>
            <div class="border rounded-md p-4 bg-gray-100">
              <div class="text-sm prose" v-html="test?.description"></div>
            </div>
          </template>
          <template #footer>
            <div class="flex gap-4 mt-1">
              <Button
                label="Kerjakan"
                class="w-full font-bold text-white"
                @click="navigateTo('test')"
              />
            </div>
          </template>
        </Card>
      </ClientOnly>
    </div>
  </div>
</template>

<script lang="ts" setup>
const testStore = useTestStore()
const route = useRoute()
const config = useRuntimeConfig()

const testId = route.query.test_id as string
const userId = route.query.user as string

const test = computed(() => testStore.test)

const fetchTest = async () => {
  const data = await fetch(`${config.public.apiBaseUrl}/api/test/${testId}`)
  return await data.json()
}

onMounted(async () => {
  if (testId) {
    testStore.setTest(await fetchTest())
  }
})
</script>

<style></style>
