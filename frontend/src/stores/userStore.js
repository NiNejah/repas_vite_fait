import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    const user = ref(null);
    const connected = ref(false);

    const userInfo = computed(() => user.value);
    const userId = computed(() => user.value?.data._id);
    const userToken = computed(() => user.value?.token);

    const userName = computed(() => user.value?.data.username);
    const userMail = computed(() => user.value?.data.email);
    const userVegetarian = computed(() => user.value?.data.vegetarian);


    const setUser = (userData) => {
        user.value = userData;
    }

    const isConnected = computed(() => connected.value);
    const connect = () => {
        connected.value = true;
    }

    const disconnect = () => {
        connected.value = false;
    }

    return {
        user,
        connected,
        userInfo,
        userId,
        userName,
        userMail,
        userVegetarian,
        setUser,
        isConnected,
        connect,
        disconnect,
        userToken };
});