<script setup>
import {defineEmits} from "vue";
const emit = defineEmits(['click']);

const handleClick = () => {
  emit('click');
};

</script>

<template>
    <button class="bg-green-400 hover:bg-green-500 font-sm text-white rounded py-1.5 px-4 md:mx-4 md:my-0 my-6" @click="handleClick">
        <slot></slot>
    </button>
</template>