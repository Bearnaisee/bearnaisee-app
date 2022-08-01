<template>
  <img v-lazy="src" :alt="alt" />
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

defineProps({
  src: { type: String, default: 'https://picsum.photos/1000/1000' },
  alt: { type: String, default: null },
});
</script>
