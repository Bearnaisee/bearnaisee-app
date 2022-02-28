<template>
  <div>
    <Title text="Top categories" size="h2" />
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem">
      <router-link
        v-for="(category, categoryIndex) of categories"
        :key="categoryIndex"
        :to="`/category/${category}`"
        style="margin: 0 auto; text-align: center"
      >
        <Icon :icon="category" width="30px" height="30px" />

        <p style="text-transform: capitalize">
          {{ category }}
        </p>
      </router-link>
    </div>

    <RecipeCard />
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
  },

  data() {
    return {
      categories: ['meat', 'fish', 'poultry', 'vegetarian', 'pasta', 'soup', 'baking', 'dessert'],
    };
  },
};
</script>

<style lang="scss" scoped></style>
