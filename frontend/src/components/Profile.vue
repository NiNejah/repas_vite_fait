<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from "../stores/userStore";

let user = ref(null);
onMounted(() => {
    const store = useUserStore();
    if (store && store.user) {
        console.log(store.user.data);
        user.value = {
            name: store.user.data.username,
            email: store.user.data.email,
            vegetarian: store.user.data.vegetarian,
        };
    }
})


const updateUser = () => {
    // Mettez à jour les valeurs de l'utilisateur ici
    // Vous pouvez également effectuer des validations si nécessaire
};

</script>

<template>
    <div v-if="user != null" class="container mx-auto p-4">
        <div>
            <h1> Your profile</h1>
        </div>
        <div class="profil max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md">
            <div class="p-4">
                <h2 class="mt-2 text-xl font-semibold text-gray-800">
                    <font-awesome-icon icon="user" /> {{ user.name }}
                </h2>
                <p class="text-gray-600">Email: {{ user.email }}</p>
                <p class="text-gray-600" v-if="user.vegetarian">Vegetarian </p>
            </div>
        </div>
    </div>
    <div v-else class="profil max-w-md mx-auto bg-white rounded-md overflow-hidden shadow-md py-4 px-4">
        <h4>signin to have your profile </h4>
    </div>
</template>

<style scoped>
.profil {
    margin-top: 6em;
}
</style>
