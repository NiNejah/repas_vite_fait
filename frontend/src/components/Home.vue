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
    if(searchQuery.value === ''){}
    else {
     recipes.value = recipesList;
    }
  } catch (error) {
    console.log(error);
  }
}

</script>

<template>
  <div id="app">
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
      <b-button variant="success">Search</b-button>
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
          <Recipe :id="recipe.id" :name="recipe.name" :url="recipe.url" :image_url="recipe.image_url"/>
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
  margin-top: 20px;
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
</style>