<script setup>
import {ref, defineProps} from 'vue';

const props = defineProps({
    id: String,
    name: String,
    url: String, 
    image_url: String
});

const name = ref(props.name);

</script>

<template>
    <div class="recipe">
        <div class="header">
            <a v-bind:href="url" target="_blank"><h3>{{ name }}</h3></a>
            <b-button><font-awesome-icon icon="star"/> </b-button>
        </div>
        <div class="content">
            <img v-bind:src="props.image_url">
        </div>
    </div>
</template>

<style scoped>

.recipe {
    background-color: #fff;
    border: 1px solid #e2e2e2;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: 10px;
    overflow: hidden;
    transition: box-shadow 0.3s ease;
    position: relative;
    width: 50%;
    text-align: center;
}

a {
    color: inherit;
    text-decoration: none;
    font-weight: bold;
}

.header h3 {
    text-align: left;
    padding: 10px;
    overflow: hidden;
    max-width: 80%;
}

.header {
    background-color: lightyellow;
}

.content img {
    border-radius: 10px;
    margin: 10px;
    max-width: 50%;
}
</style>