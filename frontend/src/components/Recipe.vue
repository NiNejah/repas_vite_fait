<script setup>
import {ref, defineProps} from 'vue';
import { useUserStore } from '../stores/userStore.js';

const props = defineProps({
    id: String,
    name: String,
    url: String, 
    image_url: String,
    calories: Number
});
const userStore = useUserStore();

const name = ref(props.name);

</script>

<template>
    <div class="card">
        <div class="header">
            <a v-bind:href="props.url" target="_blank"><h3>{{ props.name }}</h3></a>
            <b-button class="favorite" v-if="userStore.isConnected"><font-awesome-icon icon="star"/> </b-button>
        </div>
        <div class="content">
            <img v-bind:src="props.image_url">
        </div>
        <div class="footer" v-if="userStore.isConnected">
            <div class="selectDate">
                <input class="schedule" type="date" value="2023-01-18" min="2023-01-01" max="2029-12-31"/>
                <div class="meal"><b-button variant="success" size="sm">Submit meal to my schedule</b-button></div>
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

.content img {
    border-radius: 10px;
    margin: 10px;
    max-width: 50%;
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
</style>