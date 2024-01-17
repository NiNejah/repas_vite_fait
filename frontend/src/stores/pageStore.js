import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usePageStore = defineStore('page', () => {
    const favorite = ref(false);
    const inFavorite = computed(() => favorite.value);

    const joinFavoritePage = () => {
        favorite.value = true;
    }

    const leaveFavoritePage = () => {
        favorite.value = false;
    }

    return { favorite, inFavorite, joinFavoritePage, leaveFavoritePage };
});