<template>
  <div>

    <div class="recipe-img"></div>
    <div class="recipe-wrapper">
      <h1>{{ $route.params.slug }}</h1>
    
    <h2>By {{ $route.params.username }}</h2>
    </div>
    
    <RecipeCard />
  </div>
</template>

<script>
import {defineAsyncComponent} from 'vue';

export default {
  name: 'Recipe',

  components: {
      RecipeCard: defineAsyncComponent(() => import('@/components/RecipeCard.vue'))
  }
};
</script>

<style lang="scss" scoped>
  .recipe-img{
    height: 50px;
    width: auto;
    background-color: red;
  }
  .recipe-wrapper{
    background-color: orange;
    border-radius: 50% 50% 0 0;
  }
</style>
