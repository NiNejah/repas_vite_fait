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
    <div class="spacer">
      &nbsp;
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

.spacer {
  width: 256px;
  height: 100%;
}

.menu-link:hover {
  background-color: #2c3e50;
}

.w-64 {
  height: 100%;
  position: fixed;
}
</style>

