import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    const user = ref(null);
    const connected = ref(false);

    const userInfo = computed(() => user.value);
    const userId = computed(() => user.value?._id);

    const setUser = (userData) => {
        user.value = userData;
    }

    const isConnected = computed(() => user.connected);
    const connect = () => {
        connected.value = true;
    }

    const disconnect = () => {
        connected.value = false;
    }

    return { user, connected, userInfo, userId, setUser, isConnected, connect, disconnect };
});