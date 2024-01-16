<script setup>
import { ref } from 'vue';
import { useUserStore } from "../stores/userStore";
const store = useUserStore();

console.log(store.user.data)
const user = ref({
    name: store.user.data.username,
    email: store.user.data.email,
    vegetarian: store.user.data.vegetarian,
});

const updateUser = () => {
    // Mettez à jour les valeurs de l'utilisateur ici
    // Vous pouvez également effectuer des validations si nécessaire
};

</script>

<template>
    <div class="container mx-auto p-4">
        <div>
            <h1> Your profile</h1>
        </div>
        <div class="profil max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md">
            <div class="p-4">
                <h2 class="mt-2 text-xl font-semibold text-gray-800">
                    <font-awesome-icon icon="user"/> {{ user.name }}
                </h2>
                <p class="text-gray-600">Email: {{ user.email }}</p>
                <p class="text-gray-600" v-if="user.vegetarian">Vegetarian </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.profil {
    margin-top: 6em;
}
</style>
