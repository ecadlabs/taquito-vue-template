<template>
  <div id="app" class="h-screen w-screen flex flex-col items-center">
    <h1 class="mt-[15%] mb-12 text-2xl font-bold">Taquito dApp Vue Template</h1>
    <div class="flex flex-col items-center gap-y-1.5">
      <h2>Welcome to the Taquito Vue dApp Template</h2>
      <span class="flex gap-1 items-center">
        <h3>Edit</h3>
        <h3 class="font-mono text-xs mt-0.5 bg-gray-200 text-red-400 px-1 rounded-md">wallet-component.vue</h3>
        <h3>to get started</h3>
      </span>
      <div class="flex gap-1">
        <h3>Learn more with the</h3>
        <a href="https://taquito.io/docs/quick_start/" target="_blank" class="underline text-blue-500">Taquito
          Documentation</a>
      </div>
    </div>

    <WalletComponent class="mt-12" />
  </div>
</template>

<script setup lang="ts">
import WalletComponent from '@/components/wallet-component.vue';
</script>
