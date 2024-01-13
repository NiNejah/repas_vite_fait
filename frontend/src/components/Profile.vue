<script setup>
import { ref } from 'vue';

const user = ref({
    name: 'alahmat',
    email: 'ali@example.com',
    // Ajoutez d'autres propriétés du profil
});
</script>


<template>
    <div class="container mx-auto p-4">
        <div class="max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md">
            <div class="p-4">
                <h2 class="mt-2 text-xl font-semibold text-gray-800"><font-awesome-icon icon="user"/> {{ user.name }}</h2>
                <p class="text-gray-600">{{ user.email }}</p>
            </div>
        </div>
    </div>
</template>
  

  
<style scoped>

</style>
  