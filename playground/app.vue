<template>
  <div class="flex flex-col min-h-screen">
    <header class="sticky top-0 z-50 w-full backdrop-blur flex-none border-b border-gray-900/10 dark:border-gray-50/[0.06] bg-white/75 dark:bg-gray-900/75">
      <UContainer class="py-3">
        <div class="flex items-center justify-between">
          <NuxtLink
            to="/"
            class="flex items-center gap-1.5 font-bold text-xl text-gray-900 dark:text-white"
          >
            Nuxt
            <div class="text-primary-500 dark:text-primary-400">
              Scripts
            </div>
          </NuxtLink>
        </div>
      </UContainer>
    </header>
    <main class="min-h-full h-full flex-grow">
      <UContainer class="mt-10">
        <div class="grid grid-cols-4">
          <div class="col-span-3">
            <NuxtPage />
          </div>
        </div>
      </UContainer>
    </main>
  </div>
</template>
