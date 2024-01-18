<script setup >
import { ref, toRefs, onMounted } from 'vue';
import Recipe from '../components/Recipe.vue';
import { useUserStore } from '../stores/userStore.js';
import { usePageStore } from '../stores/pageStore';
import { api } from '../../http-api';

const userStore = useUserStore();
const pageStore = usePageStore();
const { isConnected } = toRefs(userStore);
const searchQuery = ref('');

const recipes = ref([]);
const keywords = ref([]);
const recipesRef = ref(null);

onMounted(() => {
  pageStore.leaveFavoritePage();
  recipesRef.value = document.getElementById('goto');
});

const addKeyword = () => {
  if (searchQuery.value !== '') {
    keywords.value.push(searchQuery.value);
    let newArray = keywords._rawValue;
    keywords.value = newArray;
    searchQuery.value = '';
  }
}

const deleteKeyword = (keyword) => {
  keywords.value = keywords.value.filter(word => word !== keyword);
  // console.log(keywords._rawValue);
}

const searchRecipes = async () => {
  try {
    if (keywords._rawValue.length > 0) {
      const filters = keywords._rawValue.join(' ');
      let health = "";
      if (document.getElementById("vegetarian").checked) health += "&health=vegetarian";
      if (document.getElementById("peanut").checked) health += "&health=peanut-free";
      if (document.getElementById("pork").checked) health += "&health=pork-free";
      // console.log(filters);
      // const response = await fetch("https://api.edamam.com/api/recipes/v2?type=public&q=" + filters
      //   + "&app_id=01c306cf&app_key=6179f34f1acea7368bcd5d4020b90b0c" + health);
      const body = {
        filters: filters,
        health: health
      };
      const response = await api.getRecipes(body,userStore.userToken);
      // console.log(response);

      const jsonRecipes = response.data.hits;
      let listRecipes = [];
      for (const hit of jsonRecipes) {
        const recipe = hit.recipe;
        listRecipes.push(recipe);
      }
      recipes.value = listRecipes;
      if (recipesRef.value) {
        await recipesRef.value.scrollIntoView({ behavior: 'smooth' });
      }
      // console.log(recipes.value);

    }
  } catch (error) {
    console.log(error);
  }
}

const removeRecipesCards = () => {
  let cards = document.getElementsByClassName("recipe");
  while (cards.length > 0) {
    cards[0].parentNode.removeChild(cards[0]);
  }
}

const search = () => {
  console.log('Recherche de :', searchQuery.value);
};

</script>

<template>
  <div id="app" class="bg-gray-200">

    <div class="food flex items-center justify-center text-center bgr-home h-screen">

      <div class="main grid justify-items-stretch">

        <h1 class="text-5xl justify-self-end font-bold text-green-400 md:pb-20">
          Ingredient Alchemy: Discover Your Desired Dish!
        </h1>

        <div class="search-item md:mx-5 mx-5  md:my-7 my-2">

          <div id="keywords" class="justify-self-center md:my-7 my-2 flex flex-wrap items-center">
            <div class="md:mx-1 mx-1 mb-2" v-for="keyword of keywords" :key="keyword">
              <div class="flex items-center bg-yellow-500 px-2 pt-3 pb-0 rounded">
                <p class="text-white font-bold flex items-center">{{ keyword }}
                  <button class="delKeyword ml-2 text-red-600 hover:text-red-800 focus:outline-none focus:text-red-800"
                    @click="deleteKeyword(keyword)">
                    <font-awesome-icon icon="fa-xmark" />
                  </button>
                </p>
              </div>
            </div>
          </div>



          <div class="flex items-center justify-center space-x-2 search">
            <input v-model="searchQuery"
              class="border p-2 rounded focus:outline-none focus:ring focus:border-blue-300 w-full md:w-3/4 lg:w-1/2"
              type="text" placeholder="Add an ingredient to your list">
            <b-button variant="warning" @click="addKeyword">+</b-button>
            <button @click="searchRecipes"
              class="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600 focus:outline-none focus:ring focus:border-blue-300">
              Search
            </button>
          </div>
        </div>

        <div class="flex items-center justify-center text-white font-bold">
          <ul class="list-inside">
            <li class="flex items-center">
              <input type="checkbox" id="vegetarian" name="vegetarian" class="form-checkbox h-4 w-4" />
              <label for="vegetarian" class="ml-2">Vegetarian</label>
            </li>
            <li class="flex items-center">
              <input type="checkbox" id="peanut" name="peanut" class="form-checkbox h-4 w-4" />
              <label for="peanut" class="ml-2">Peanut-free</label>
            </li>
            <li class="flex items-center">
              <input type="checkbox" id="pork" name="pork" class="form-checkbox h-4 w-4" />
              <label for="pork" class="ml-2">Pork-free</label>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div id="recipes">
      <div class="m-10 grid lg:grid-cols-4 gap-10 ">
        <div class="recipe" v-for="recipe in recipes" :key="recipe.id">
          <Recipe :id="recipe.uri" :name="recipe.label" :url="recipe.url" :image_url="recipe.image"
            :calories="recipe.calories" :servings="recipe.yield" :source="recipe.source" />
        </div>
      </div>
    </div>
    <div id="goto"></div>
  </div>
</template>

<style scoped>
h1 {
  -webkit-text-stroke: 2px rgb(17, 24, 39);
}



.bgr-home {
  /* background-image: url('https://womensfitness.co.uk/wp-content/uploads/sites/3/2022/11/Shutterstock_1675475479.jpg?w=900'); */
  /* background-image: url('https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/800px-Good_Food_Display_-_NCI_Visuals_Online.jpg?20100603030321'); */
  background-image: url('https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg');
  background-position: center;
  background-size: cover;
  /* min-height: 14rem; */
}


.error {
  color: red;
  font-weight: bold;
  list-style-type: none;
  margin-top: 1em;
}



.col-md-4 {
  display: inline-block;
  width: 40%;
}

#recipes {
  /* text-align: center; */
}

.keyword {
  /* text-align: center;
  background-color: lightgoldenrodyellow;
  padding: 5px;
  width: 5%;
  border-radius: 15px;
  border-width: 2px; */
  /* margin-right: 5px; */
  display: inline;
}

.keyword * {
  display: inline;
}

.keyword p {
  margin-right: 5px;
}

.checkbox {
  display: inline;
  text-align: center;
}

.checkbox * {
  margin-right: 5px;
}
</style>