<script setup >
import {ref, computed, toRefs} from 'vue';
import recipesList from '../data/recipes.js';
import Recipe from './Recipe.vue';
import { useUserStore } from '../stores/userStore.js';

const userStore = useUserStore();
const { isConnected } = toRefs(userStore);
const searchQuery = ref('');

const recipes = ref([]);
const keywords = ref([]);

const signout = () =>{
  console.log("disconnected");
  userStore.disconnect();
  userStore.setUser(null);
}

const addKeyword = () => {
  if(searchQuery.value !== ''){
    keywords.value.push(searchQuery.value);
    let newArray = keywords._rawValue;
    keywords.value = newArray;
    searchQuery.value = '';
  }
}

const deleteKeyword = (keyword) => {
  keywords.value = keywords.value.filter(word => word !== keyword);
  console.log(keywords._rawValue);
}

const searchRecipes = async () => {
  try {
    if(keywords._rawValue.length > 0){
      const filters = keywords._rawValue.join(' ');
      let health = "";
      if(document.getElementById("vegetarian").checked) health += "&health=vegetarian";
      if(document.getElementById("peanut").checked) health += "&health=peanut-free";
      if(document.getElementById("pork").checked) health += "&health=pork-free";
      console.log(filters);
      const response = await fetch("https://api.edamam.com/api/recipes/v2?type=public&q=" + filters 
      + "&app_id=01c306cf&app_key=6179f34f1acea7368bcd5d4020b90b0c" + health);
      if(response.status === 200){
        //removeRecipesCards();

        const json = await response.json();
        const jsonRecipes = json.hits;
        let listRecipes = [];
        for(const hit of jsonRecipes){
          const recipe = hit.recipe;
          listRecipes.push(recipe);
        }
        recipes.value = listRecipes;
        console.log(recipes.value);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

const removeRecipesCards = () => {
  let cards = document.getElementsByClassName("recipe");
  while(cards.length > 0){
    cards[0].parentNode.removeChild(cards[0]);
  }
}

</script>

<template>
  <div id="app" class="bg-gray-100">
    <nav>
      <ul v-if="!isConnected">
        <li >
          <router-link to="/registre" ><font-awesome-icon icon="user-plus" /> Sign Up</router-link>
        </li>
        <li>
          <router-link to="/login" ><font-awesome-icon icon="sign-in-alt" /> Login</router-link>
        </li>
      </ul>
      <ul v-else>
        <li >
          <!-- <b-button class="button" variant="outline-secondary" @click="signout" >Sign Out</b-button> -->
          <router-link to="" @click="signout"><font-awesome-icon icon="sign-out-alt" /> Sign Out</router-link>
        </li>
      </ul>
    </nav>
    <div id="search">
      <input v-model="searchQuery" class="searchBar" type="search" placeholder="Add an ingredient to your list">
      <b-button variant="warning" @click="addKeyword">+</b-button>
      <b-button variant="success" @click="searchRecipes">Search</b-button>
    </div>
    <div id="checkboxes">
      <div class="checkbox">
        <input type="checkbox" id="vegetarian" name="vegetarian"/>
        <label for="vegetarian">Vegetarian</label>
      </div>
      <div class="checkbox">
        <input type="checkbox" id="peanut" name="peanut"/>
        <label for="peanut">Peanut-free</label>
      </div>
      <div class="checkbox">
        <input type="checkbox" id="pork" name="pork"/>
        <label for="pork">Pork-free</label>
      </div>
    </div>
    <div id="keywords">
      <div class="keyword" v-for="keyword of keywords" :key="keyword">
        <p>{{ keyword }}</p>
        <button class="delKeyword" @click="deleteKeyword(keyword)"><font-awesome-icon icon="x"/></button>
      </div>
    </div>
    <div id="recipes">
      <div class="col-md-4">
        <div class="recipe" v-for="recipe in recipes" :key="recipe.id">
          <Recipe :id="recipe.uri" :name="recipe.label" :url="recipe.url" :image_url="recipe.image"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

#app {
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}
li {
  float: right;
}
li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}
.error {
  color: red;
  font-weight: bold;
  list-style-type: none;
  margin-top: 1em;
}

#search {
  margin-top: 20px;
  display: inline;
}

.searchBar {
  width: 50%;
  padding: 10px;
  border-radius: 10px;
  margin-top: 20px;
  margin-right: 10px;
}

.col-md-4 {
  display: inline-block;
  width: 40%;
}

#recipes {
  text-align: center;
}

#keywords {
  margin-top: 10px;
}

.keyword {
  text-align: center;
  background-color: lightgoldenrodyellow;
  padding: 5px;
  width: 5%;
  border-radius: 15px;
  border-width: 2px;
  margin-right: 5px;
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