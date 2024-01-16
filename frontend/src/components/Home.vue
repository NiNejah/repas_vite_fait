<script setup >
import {ref, toRefs} from 'vue';
import { useUserStore } from "../stores/userStore";
const store = useUserStore();
const { connected } = toRefs(store);

const searchQuery = ref('');

const signout = () =>{
  console.log("disconnected");
  store.disConnect();
  store.setUser(null);
}

const search = () => {
  console.log('Recherche de :', searchQuery.value);
};

</script>

<template>
  <div id="app">
    <nav>
      <ul v-if="!connected">
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
    <div class="px-4 py-5 text-center bgr-home food "> 
      <h1 class="display-5 fw-bold home-title col-8 mx-auto"> Repas Vite Fait </h1>
      <div class="col-lg-6 mx auto">
        <p class="lead mb-4"></p>
      </div>
    </div>

    <div class="flex items-center justify-center space-x-2 search">
      <input
        v-model="searchQuery"
        type="text"
        class="border p-2 rounded focus:outline-none focus:ring focus:border-blue-300 w-full md:w-3/4 lg:w-1/2"
        placeholder="Search recipe..."
      />
      <button
        @click="search"
        class="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600 focus:outline-none focus:ring focus:border-blue-300"
      >
      Search
      </button>
    </div>
  </div>
</template>

<style scoped>

.search{
  margin-top: 10rem;
  
}
.bgr-home{
  /* background-image: url('https://womensfitness.co.uk/wp-content/uploads/sites/3/2022/11/Shutterstock_1675475479.jpg?w=900'); */
  /* background-image: url('https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/800px-Good_Food_Display_-_NCI_Visuals_Online.jpg?20100603030321'); */
  background-image: url('https://cdn.britannica.com/36/123536-050-95CB0C6E/Variety-fruits-vegetables.jpg');
  background-position: center;
  background-size: cover;
  min-height: 14rem;
}

.bgr-home h1 {
  color: white; 
}

#app {
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  /* background-color: #333; */
  background-color: #1d2834;
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
</style>