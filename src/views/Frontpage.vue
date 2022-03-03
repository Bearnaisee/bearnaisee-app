<template>
  <div style="padding: 0 1rem">
    <Title text="Top categories" size="h2" />

    <div class="categories">
      <router-link
        v-for="(category, categoryIndex) of categories"
        :key="categoryIndex"
        :to="`/category/${category}`"
        class="categories__link"
      >
        <Icon class="categories__icon" :icon="category" width="30" height="30" />

        <p>{{ category }}</p>
      </router-link>
    </div>

    <Title text="Trending" size="h2" />

    <RecipeSlider style="padding: 1rem 0" :recipes="recipes" />

    <div class="recipes">
      <Title text="Recent" size="h2" class="recipe__card" />

      <RecipeCard
        v-for="(recipe, recipeIndex) of recipes"
        :key="recipeIndex"
        :title="recipe.title"
        :time="recipe.time"
        :tags="recipe.tags"
        :slug="recipe.slug"
        :author="recipe.author"
      />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  name: 'Frontpage',

  components: {
    Icon: defineAsyncComponent(() => import('@/components/Icon.vue')),
    RecipeCard: defineAsyncComponent(() => import('@/components/RecipeCard.vue')),
    Title: defineAsyncComponent(() => import('@/components/Title.vue')),
    RecipeSlider: defineAsyncComponent(() => import('@/components/RecipeSlider.vue')),
  },

  data() {
    return {
      categories: ['meat', 'fish', 'poultry', 'vegetarian', 'pasta', 'soup', 'baking', 'dessert'],
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
.categories {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin: 1rem 0;
  .categories__link {
    margin: 0 auto;
    text-align: center;

    p {
      text-transform: capitalize;
    }
  }
}

.recipes {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
