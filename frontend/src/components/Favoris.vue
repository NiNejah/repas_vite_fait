<script setup>
import Recipe from './Recipe.vue';
import { useUserStore } from '../stores/userStore.js';
import { usePageStore } from '../stores/pageStore.js';
import { ref, computed, toRefs, onMounted } from 'vue';
import router from '../router/index';
import { api } from '../../http-api';

const userStore = useUserStore();
const pageStore = usePageStore();
const recipes = ref([]);

onMounted( async () => {
    try {
        if(!userStore.isConnected) router.push({ name: 'home'});
        pageStore.joinFavoritePage();
        const responseUser = await api.getFavorites(userStore.userId);
        // console.log(responseUser.data);
        await fetchRecipes(responseUser.data);
    } catch (error) {
        console.error('Failed to fetch favourite recipes: ', error);
    }
})

const fetchRecipes = async (uriList) => {
    let listRecipes = [];
    for(const uri of uriList){
        const id = uri.split('#recipe_').pop();
        // const responseEdamam = await fetch("https://api.edamam.com/api/recipes/v2/" + id + "?type=public&app_id=01c306cf&app_key=6179f34f1acea7368bcd5d4020b90b0c");
        const responseEdamam = await api.getRecipeByID(id);
        console.log(responseEdamam);
        if(responseEdamam.success){
            // const json = await responseEdamam.json();
            listRecipes.push(responseEdamam.data.recipe);
            /*const jsonRecipes = json.hits;
            for (const hit of jsonRecipes) {
                const recipe = hit.recipe;
                listRecipes.push(recipe);
            }*/
        }
    }
    recipes.value = listRecipes;
    console.log(recipes.value);
}

const handleFavoriteDeleted = (recipeId) => {
    // console.log(recipeId);
    recipes.value = recipes.value.filter(recipe => recipe.uri !== recipeId);
}

</script>

<template>
    <p>Favoris</p>
    <div id="recipes">
      <div class="col-md-4">
        <div class="recipe" v-for="recipe in recipes" :key="recipe.id">
          <Recipe :id="recipe.uri" :name="recipe.label" :url="recipe.url" :image_url="recipe.image"
            :calories="recipe.calories" :servings="recipe.yield" :source="recipe.source" @favorite-deleted="handleFavoriteDeleted"/>
        </div>
      </div>
    </div>
</template>

<style scoped>
#recipes {
    text-align: center;
}

.col-md-4 {
    display: inline-block;
}
</style>