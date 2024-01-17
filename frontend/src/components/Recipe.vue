<script setup>
import {ref, defineProps} from 'vue';
import { api } from '../../http-api';
import { useUserStore } from '../stores/userStore.js';
import { usePageStore } from '../stores/pageStore.js';

const emit = defineEmits(['favorite-deleted']);

const props = defineProps({
    id: String,
    name: String,
    url: String, 
    image_url: String,
    source: String,
    calories: Number,
    servings: Number
});
const userStore = useUserStore();
const pageStore = usePageStore();

const name = ref(props.name);
const dateQuery = ref('');

const addFavoriteToUser = async (uri) => {
    try {
        //console.log(userStore.userId);
        const body = {
            favoriteId: uri
        };
        const response = await api.addFavorite(userStore.userId, body);
        //console.log(response);
    } catch (error){
        console.error('Failed to add favourite to user: ', error);
    }
}

const removeFavoriteFromUser = async (uri) => {
    try {
        console.log(userStore.userId);
        const body = {
            favoriteId: uri
        };
        console.log(body);
        const response = await api.deleteFavorite(userStore.userId, body);
        console.log(response);
        emit('favorite-deleted', uri);
    } catch (error){
        console.error('Failed to add favourite to user: ', error);
    }
}

const recipeToSchedule = async (uri) => {
    try {
        const dateQ = dateQuery.value;
        const dateF = new Date(dateQ);
        console.log(dateF);
        if(dateQuery.value !== ""){
            const body = {
                programDate: {
                    id: uri,
                    date: dateQ
                }
            }
            const response = await api.addToSchedule(userStore.userId, body);
            console.log(response);
        }
    } catch (error) {
        console.error('Failed to add meal to schedule : ', error);
    }
}

</script>

<template>
    <div class="card">
        <div class="header">
            <a v-bind:href="props.url" target="_blank"><h3>{{ props.name }}</h3></a>
            <b-button class="favorite" v-if="userStore.isConnected && !pageStore.inFavorite" @click="addFavoriteToUser(props.id)"><font-awesome-icon icon="star"/> </b-button>
            <b-button class="favorite" v-if="userStore.isConnected && pageStore.inFavorite" @click="removeFavoriteFromUser(props.id)" variant="danger"><font-awesome-icon icon="trash"/> </b-button>
        </div>
        <div class="content">
            <div class="recipeImg">
                <img v-bind:src="props.image_url">
            </div>
            <div class="recipeInfos">
                <p class="cal">{{ Math.round(props.calories / props.servings) }}</p>
                <p>Kcal par serving</p>
                <div class="smallInfos">
                    <p>Servings: {{ props.servings }}</p>
                    <p>Source: {{ props.source }}</p>
                </div>
            </div>
        </div>
        <div class="footer" v-if="userStore.isConnected">
            <div class="selectDate">
                <input v-model="dateQuery" class="schedule" type="date" value="2024-01-18" min="2023-01-01" max="2029-12-31"/>
                <div class="meal"><b-button variant="success" size="sm" type="submit" @click="recipeToSchedule(props.id)">Submit meal to my schedule</b-button></div>
            </div>
        </div>
    </div>
</template>

<style scoped>

.card {
    background-color: #fff;
    border: 1px solid #e2e2e2;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: 10px;
    overflow: hidden;
    transition: box-shadow 0.3s ease;
    position: relative;
    width: 100%;
    text-align: center;
}

a {
    color: inherit;
    text-decoration: none;
}

.header h3 {
    float: left;
    padding: 10px;
    overflow: hidden;
    min-width: min-content;
    font-weight: bolder;
    max-width: 80%;
}

.header {
    background-color: lightyellow;
    border-bottom-width: 1px;
}

.recipeImg img {
    border-radius: 10px;
    margin-left: 10px;
    margin-bottom: 10px;
    margin-top: 10px;
    max-width: 100%;
    height: auto;
    width: auto;
    float: left;
}

.recipeImg {
    width: 48%;
}
.content {
    display: inline;
}

.favorite{
    float: right;
    margin: 10px;
}

.footer {
    border-top-width: 1px;
    margin-left: 10px;
}

.footer p {
    float: left;
    margin-bottom: 5px;
}

.footer input {
    float: left;
    margin-bottom: 10px;
}

.meal {
    height: 20px;
    display: inline-block;
    margin-top: 5px;
}

.schedule {
    display: inline-block;
    margin-top: 5px;
    height: 30px;
}

.selectDate {
    text-align: left;
}

.cal {
    font-size: 4.5vw;
    height: auto;
    margin-bottom: 0px;
    max-width: 100%;
    text-align: center;
}

.recipeInfos {
    width: 40%;
    max-width: 40%;
    height: 100%;
    float: right;
    text-align: center;
    margin-right: 20px;
}

.smallInfos p{
    text-align: left;
    clear: left;
    float: left;
    font-weight: bold;
}
</style>