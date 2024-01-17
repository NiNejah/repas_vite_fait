<script setup>
import { useUserStore } from './stores/userStore';
import Navbar from  './components/Navbar.vue'
const store = useUserStore();
</script>

<template>
  <div class="bg-gray-200">
    <Navbar :isConnected ="store.isConnected"/>
    <div class="flex-1">
      <router-view />
    </div>
  </div>
</template>

<style scoped>

</style>

