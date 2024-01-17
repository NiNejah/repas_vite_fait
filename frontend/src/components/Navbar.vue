<script setup>
import { ref, defineProps, onMounted ,defineEmits} from "vue";
import { useUserStore } from '../stores/userStore';
import router from "../router";
import Button from './Button.vue';


const store = useUserStore();
let mylinks = ref([]);
let open = ref(true);
const props = defineProps(['isConnected']);

onMounted(() => {
    if(true){
        mylinks.value = [
            { name: "Home", link: "/" },
            { name: "Profil", link: "/profil" },
            { name: "Favoris", link: "/favoris" },
            { name: "Calendar", link: "/calendar" },
        ];
    }else {
        mylinks.value = [{ name: "Home", link: "/" }]
    }
    console.log("Links:", mylinks.value);
});

const navigateTo = (link) => {
    console.log("Navigating to:", link);
    router.push(link);
    open.value = false ;
};
const MenuOpen = ()=> {
    open.value = !open.value ; 
}
const login = ()=>{
    navigateTo("/login");
}
const signup = ()=>{
    navigateTo("/registre");
}
const signout = () => {
  console.log("disconnected");
  store.disconnect();
  store.setUser(null);
}
</script>

<template>
    <div class="z-100 bg-gray-900 text-gray-100 py-3.5 px-6 shadow md:flex justify-between items-center">
        <div class="flex items-center cursor-pointer">
            <span class="text-green-500 text-xl mr-5">
                <font-awesome-icon icon="fa-utensils" /> 
            </span>
            <h1 class="text-xl" @click="navigateTo('/')">Repas Vite Fait </h1>
        </div>

        <span @click="MenuOpen()" class="absolute md:hidden right-6 top-1.5 cursor-pointer text-4x1">
            <font-awesome-icon :icon="open? 'fa-xmark':'fa-bars'" /> 
        </span>

        <ul class="md:flex md:items-center md:px-0 px-6 md:pb-0 pb-10 md:static absolute 
        bg-gray-900 md:w-auto w-full top-14 duration-500 ease-in" :class="[open?'left-0':'left-[-100%]']">
            <li class="md:mx-4 md:my-0 my-6" v-for="l in mylinks" :key="l.name">
                <a class="text-xl hover:text-green-500 text-white" :href="l.link" @click.prevent="() => navigateTo(l.link)">
                    {{ l.name }} 
                </a>
            </li>
            <div v-if="!props.isConnected">
                <Button @click="signup" class="md:mx-4 md:my-0 my-1 mx-1"><font-awesome-icon icon="user-plus" /> Sign Up </Button>
                <Button @click="login" class="md:mx-4 md:my-0 my-1 mx-1" > <font-awesome-icon icon="sign-in-alt" /> Login </Button>
            </div>
            <Button v-else @click="signout" class="md:mx-4 md:my-0 my-1 mx-1" > <font-awesome-icon icon="sign-out-alt" /> Sign Out</Button>
        </ul>
    </div>
</template>
<style scoped>
a {
text-decoration: none;
}
</style>    