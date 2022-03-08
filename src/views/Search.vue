<template>
  <div class="search-wrapper">
    <input type="text" placeholder="Search for something..." />
  </div>
  <RecipeCard
    v-for="(recipe, recipeIndex) of recipes"
    :key="recipeIndex"
    :title="recipe.title"
    :time="recipe.time"
    :tags="recipe.tags"
    :slug="recipe.slug"
    :author="recipe.author"
  />
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  name: 'Search',
  components: {
    RecipeCard: defineAsyncComponent(() => import('@/components/RecipeCard.vue')),
  },

  data() {
    return {
      recipes: [
        {
          title: 'Bolo',
          time: 25,
          tags: ['Italian', 'Meat', 'Pasta'],
          author: 'fili',
          slug: 'bolo-boys',
        },
        {
          title: 'Lasagne',
          time: 25,
          tags: ['Italian', 'Meat', 'Pasta'],
          author: 'lil mart',
          slug: 'lasagne',
        },
        {
          title: 'dunser',
          time: 25,
          tags: ['dansk'],
          author: 'børge',
          slug: 'dunser',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
input {
  border: 1px solid #7e7e7e;
  width: 100%;
  height: 2rem;
  border-radius: 4px;
  margin: 10px 0px;
}
</style>
