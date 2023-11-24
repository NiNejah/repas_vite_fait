<script setup>
import {ref,onMounted} from 'vue';
import {api} from '../../http-api';
const uers = ref(null);
onMounted(async () => {
  try {
    uers.value = await api.getContacts();
  }catch (err){
    console.log("in home : " + err)
  }
})
const addUser =async ()=>{
  const body =  {name: 'toto', email: "email@exaple.fr"};
  try {
    const resp = await api.addContact(body);
    console.log(resp);
  }catch (err){
    console.log("in home : " + err)
  }
}
</script>

<template>
  <div class="about">
    <h1>This is an about page {{ uers }}</h1>
  </div>
  <button @click="addUser">add</button>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
