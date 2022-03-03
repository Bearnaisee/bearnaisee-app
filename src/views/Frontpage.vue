<template>
  <div>
    <Title text="Bearnaise" size="h1" />
    <Title text="Top categories" size="h2" />

    <div class="CategoryWrapper">
      <router-link
        v-for="(category, categoryIndex) of categories"
        :key="categoryIndex"
        :to="`/category/${category}`"
        style="margin: 0 auto; text-align: center"
      >
        <Icon class="CategoryWrapper__icon" :icon="category" />
        <p class="CategoryWrapper__p">{{ category }}</p>
      </router-link>
    </div>

    <Title text="Trending" size="h2" />

    <RecipeSlider />

    <Title text="Recent" size="h2" />

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
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.CategoryWrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}
.CategoryWrapper__icon {
  width: 30px;
  height: 30px;
}
.CategoryWrapper__p {
  text-transform: capitalize;
}
</style>
