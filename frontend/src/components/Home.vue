<script setup >
import {ref} from 'vue';

const isConnected = ref(false);

const signout = () =>{
  console.log("disconnected");
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
</style>