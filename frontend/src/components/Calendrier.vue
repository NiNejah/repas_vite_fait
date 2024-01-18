<script setup>
import { ref, computed, toRefs, onMounted } from 'vue';
import recipesList from '../data/recipes.js';
import router from '../router/index';
import Recipe from './Recipe.vue';
import { useUserStore } from '../stores/userStore.js';
import { usePageStore } from '../stores/pageStore';
import { api } from '../../http-api.js';

const userStore = useUserStore();
const pageStore = usePageStore();
const programs = ref([]);

const selectedDate = ref('');

const attributes = ref([
    {
        highlight: true,
        dates: []
    }
]);

const recipes = ref([]);

onMounted(async () => {
    if (!userStore.isConnected) router.push({ name: 'home' });
    if (pageStore.inFavorite) pageStore.leaveFavoritePage();
    const response = await api.getSchedule(userStore.userId);
    programs.value = response.data;
    for (const program of programs.value) {
        const date = program.date.split('T')[0];
        const dateSplit = date.split('-');
        attributes.value[0].dates.push(new Date(dateSplit[0], dateSplit[1] - 1, dateSplit[2]));
    }
});

const loadPrograms = async () => {
    recipes.value = [];
    let listRecipes = [];
    console.log(selectedDate.value.toString());
    for (const program of programs.value) {
        const date = program.date.split('T')[0];
        const dateSplit = date.split('-');
        const dateFormat = new Date(dateSplit[0], dateSplit[1] - 1, dateSplit[2]);
        if (selectedDate.value.toString() === dateFormat.toString()) {
            //const responseRecipe = await api.getRecipe(program.id);
            const responseRecipe = await fetch("https://api.edamam.com/api/recipes/v2/" + program.id.split('#recipe_').pop() + "?type=public&app_id=01c306cf&app_key=6179f34f1acea7368bcd5d4020b90b0c");
            if (responseRecipe.status === 200) {
                const json = await responseRecipe.json();
                console.log(json);
                listRecipes.push(json.recipe);
            }
        }
    }
    recipes.value = listRecipes;
}

const calculateCalories = () => {
    let total = 0;
    for (const recipe of recipes.value) {
        total += Math.round(recipe.calories / recipe.yield);
    }
    return total;
}

const calculateProtein = () => {
    let total = 0;
    for (const recipe of recipes.value) {
        total += recipe.totalDaily.PROCNT.quantity / recipe.yield;
    }
    return Math.round(total * 100) / 100;
}

const calculateFat = () => {
    let total = 0;
    for (const recipe of recipes.value) {
        total += recipe.totalDaily.FAT.quantity / recipe.yield;
    }
    return Math.round(total * 100) / 100;
}

const calculateCarb = () => {
    let total = 0;
    for (const recipe of recipes.value) {
        total += recipe.totalDaily.CHOCDF.quantity / recipe.yield;
    }
    return Math.round(total * 100) / 100;
}
</script>

<template>
    <div class="container mx-auto p-4">
        <h1> Your Calendrier</h1>

        <div id="content">
            <div id="calendar">
                <VDatePicker :attributes="attributes" mode="date" v-model="selectedDate" expanded @change="loadPrograms" />
                <button
                    class="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600 focus:outline-none focus:ring focus:border-blue-300"
                    @click="loadPrograms">Check recipes</button>
                <div class="nutrition" v-if="recipes.length > 0">
                    <h2>Nutritional stats: (for one serving per meal)</h2>
                    <div class="calories"><font-awesome-icon icon="bowl-food" />
                        <p>CALORIES: {{ calculateCalories() }}</p>
                    </div>
                    <div class="calories"><font-awesome-icon icon="bowl-food" style="color: greenyellow" />
                        <p>PROTEIN: {{ calculateProtein() }}%</p>
                    </div>
                    <div class="calories"><font-awesome-icon icon="bowl-food" style="color: orange" />
                        <p>FAT: {{ calculateFat() }}%</p>
                    </div>
                    <div class="calories"><font-awesome-icon icon="bowl-food" style="color: red" />
                        <p>CARB: {{ calculateCarb() }}%</p>
                    </div>
                    <p></p>
                </div>
            </div>

            <div id="recipes">
                <div class="col-md-4">
                    <div class="recipe" v-for="recipe in recipes" :key="recipe.id">
                        <Recipe :id="recipe.uri" :name="recipe.label" :url="recipe.url" :image_url="recipe.image"
                            :calories="recipe.calories" :servings="recipe.yield" :source="recipe.source" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#calendar {
    margin-left: 20px;
    width: 40%;
    text-align: center;
    display: inline-block;
    float: left;
}

#calendar VCalendar {
    width: 50%;
}

#calendar button {
    width: 30%;
    margin-top: 10px;
    display: inline-block;
}

#content {
    text-align: center;
}

#recipes {
    min-width: 50%;
    float: right;
    text-align: center;
}

.recipe {
    width: 200%;
}

.nutrition {
    margin-top: 10px;
    font-size: 1.5vw;
}

.calories {
    text-align: center;
}

.calories * {
    display: inline-block;
}

.calories p {
    margin-left: 5px;
}</style>