<script lang="ts" setup>
import { useHead, useScriptHotjar } from '#imports'

useHead({
  title: 'Hotjar',
})

// composables return the underlying api as a proxy object and a $script with the script state
const { $script, hj } = useScriptHotjar({ id: 3925006, sv: 6 })
// this will be triggered once the script is ready async
hj('identify', '123456', { test: 'foo' })
</script>

<template>
  <div>
    <ClientOnly>
      <div>
        status: {{ $script.status }}
      </div>
    </ClientOnly>
  </div>
</template>
