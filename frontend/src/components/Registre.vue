<script setup>
import { api } from '../../http-api';
import { reactive } from 'vue';
import router from '../router/index';
import { useUserStore } from '../stores/userStore';

const user = reactive({
  username: '',
  email: '',
  password: ''
});

const store = useUserStore();
let submitted = false;
let successful = false;
let message =  '';

const register = async () => {
  const userData = {
    username: user.username,
    email: user.email,
    password: user.password
  };
  try {
    console.log(userData);
    const response = await api.addUser(userData);
    console.log(response.data);
    successful = true;
    message = 'user created successfully!';
    store.connect();
    store.setUser(response);
    router.push({name: 'home'});
  } catch (error) {
    console.error(error.message);
    successful = false;
    message = 'failed to created user!';
  }
};
</script>

<template>
    <div class="col-md-12">
        <div class="card card-container">
            <img id="profile-img" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" class="profile-img-card" />
            <form name="form" @submit.prevent="register">
                <div v-if="!successful">
                    <div class="form-group">
                        <label for="username">Username</label>
                        <input v-model="user.username" required type="text" class="form-control"
                            name="username" />
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input v-model="user.email" required type="email" class="form-control"
                            name="email" />
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input v-model="user.password" required type="password"
                            class="form-control" name="password" />
                    </div>
                    <div class="form-group">
                        <button class="btn btn-primary btn-block" type="submit">Sign Up</button>
                    </div>
                </div>
            </form>

            <div v-if="message"  class="alert" :class="successful ? 'alert-success' : 'alert-danger'">{{ message }}</div>
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
  