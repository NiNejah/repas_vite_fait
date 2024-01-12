<!-- <script setup >
</script>

<template>
  <div id="app">
    <nav>
      <ul>
        <li>
          <router-link to="/" ><font-awesome-icon icon="home"/> Home</router-link>
        </li>
        <li>
          <router-link to="/registre" ><font-awesome-icon icon="user-plus" /> Sign Up</router-link>
        </li>
        <li>
          <router-link to="/login" ><font-awesome-icon icon="sign-in-alt" /> Login</router-link>
        </li>
      </ul>
    </nav>

    <div>
      <h1 class="text-3xl font-bold underline bg-red-100">Repas Vite Fait</h1>
      <router-view />
    </div>
  </div>
</template>

<style scoped>
#app {
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  color: #2c3e50;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}
li {
  float: left;
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
</style> -->


<template>
  <div class="flex h-screen bg-gray-100">
    <div class="w-64 bg-gray-800 text-white">
      <div class="p-4">
        <h1 class="text-xl font-bold">RepasViteFait</h1>
      </div>
      <div class="p-4">
        <router-link class="menu-link" to="/"><font-awesome-icon icon="home"/> Home</router-link>
        <router-link class="menu-link" to="/profil"><font-awesome-icon icon="user"/> Profile</router-link>
        <router-link class="menu-link" to="/favoris"><font-awesome-icon icon="home"/> Favoris</router-link>
        <router-link class="menu-link" to="/calendar"><font-awesome-icon icon="home"/> Calendar</router-link>
      </div>
    </div>
    <div class="flex-1">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.menu-link {
  display: block;
  padding: 0.5rem 1rem;
  color: white;
  text-decoration: none;
  transition: background-color 0.3s;
}

.menu-link:hover {
  background-color: #2c3e50;
}
</style>

