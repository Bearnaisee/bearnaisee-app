<template>
  <div>
    <Image />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  name: 'RecipeCard',

  components: {
    Image: defineAsyncComponent(() => import('@/components/Image.vue')),
  },
};
</script>

<style></style>
