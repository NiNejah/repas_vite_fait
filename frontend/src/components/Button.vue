<script setup>
import {defineEmits} from "vue";
const emit = defineEmits(['click']);

const handleClick = () => {
  emit('click');
};

</script>

<template>
    <button class="bg-green-400 hover:bg-green-500 font-sm text-white rounded py-1.5 px-4" @click="handleClick">
        <slot></slot>
    </button>
</template>