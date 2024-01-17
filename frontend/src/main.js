
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import './assets/style.css';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BootstrapVue3 } from 'bootstrap-vue-3';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { Calendar } from 'v-calendar';
import 'v-calendar/style.css';

import {
    faHome,
    faStar,
    faUser,
    faX,
    faUserPlus,
    faSignInAlt,
    faSignOutAlt,
    faCalendar,
    faTrash
} from '@fortawesome/free-solid-svg-icons';

library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt, faStar, faX, faCalendar, faTrash);
const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.component('VCalendar', Calendar);

app.use(createPinia());
app.use(BootstrapVue3);
app.use(router);
app.mount('#app');
