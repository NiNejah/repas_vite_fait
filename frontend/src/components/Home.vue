<script setup >
import {ref, computed} from 'vue';
import recipesList from '../data/recipes.js';
import Recipe from './Recipe.vue';

const isConnected = ref(false);
const searchQuery = ref('');

const recipes = ref([]);

const signout = () =>{
  console.log("disconnected");
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
      <input v-model="searchQuery" class="searchBar" type="search" placeholder="Give a list of ingredients">
      <b-button variant="success" @click="searchRecipes">Search</b-button>
    </div>
    <div id="recipes">
      <div class="recipe" v-for="recipe in recipes" :key="recipe.id">
        <Recipe :id="recipe.id" :name="recipe.name" :url="recipe.url" :image_url="recipe.image_url"/>
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

.recipe {
  text-align: center;
}
</style>