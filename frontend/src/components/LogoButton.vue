<script setup>
const props = defineProps({
    routerlink: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

function getImageUrl(){
    let url = '../assets/' + props.image;
    return new URL(url, import.meta.url);
}
</script>


<template>
    <div class="icon">
        <RouterLink :to="props.routerlink" >
            <img :alt="props.routerlink" :src="getImageUrl()" width="50" height="50"/>
        </RouterLink>
    </div>
</template>