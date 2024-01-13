<script setup>
import { api } from '../../http-api';
import { reactive } from 'vue';
import router from '../router/index';

const data = reactive({
  email: '',
  password: '',
//   token: '',
  loading:false
});

const login = async () => {
  const userData = {
    email: data.email,
    password: data.password
  };
  try {
    data.loading = true;
    const response = await api.login(userData);
    console.log(response);
    data.errorMessage =''
    router.push({ name: 'home'});//todo
  } catch (error) {
    data.loading = false;
    console.error(error.message);
    data.errorMessage = 'Email ou mot de passe incorrect.';
  }
};
 
const closeSigninAndOpenSginup = () =>{
    router.push({ name: 'registre'});
};
</script>

<template>
    <div class="col-md-12">
        <div class="card card-container">
            <img id="profile-img" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" class="profile-img-card" />
            <form name="form" @submit.prevent="login">
                <div class="form-group">
                        <label for="email">Email</label>
                        <input v-model="data.email" required type="email" class="form-control"
                            name="email" />
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input v-model="data.password" v-validate="'required'" type="password" class="form-control"
                        name="password" />
                </div>
                <div class="form-group">
                    <button class="btn btn-primary btn-block" :disabled="data.loading">
                        <span v-show="data.loading" class="spinner-border spinner-border-sm"></span>
                        <span>Login</span>
                    </button>
                </div>
                <router-link to="/registre" > Vous n'avez pas un compte ?</router-link>
                <!-- <a class="creatCompte" @click="closeSigninAndOpenSginup"> Vous n'avez pas un compte ? </a> -->
                <div class="form-group">
                    <div v-if="data.errorMessage" class="alert alert-danger" >{{ data.errorMessage }}</div>
                </div>
            </form>
        </div>
    </div>
</template>
  

  
<style scoped>
label {
    display: block;
    margin-top: 10px;
}

.card-container.card {
    max-width: 350px !important;
    padding: 40px 40px;
}

.card {
    background-color: #f7f7f7;
    padding: 20px 25px 30px;
    margin: 0 auto 25px;
    margin-top: 50px;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    border-radius: 2px;
    -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
    width: 96px;
    height: 96px;
    margin: 0 auto 10px;
    display: block;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
}
</style>
  