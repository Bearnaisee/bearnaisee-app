<template>
  <div class="container">
    <div>
      <Title text="Seasonal recipes" size="h4" class="container__title" />
    </div>
    <div>
      <router-link
        v-for="(recipe, recipeIndex) of filters"
        :key="recipeIndex"
        class="list"
        :to="`/${recipe.author}/${recipe.slug}`"
      >
        <div>
          <Image :src="recipe.coverImage" class="container__img" />
        </div>
        <div>
          <Title :text="recipe.title" size="h6" class="" />
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  name: 'Seasonal',

  components: {
    Title: defineAsyncComponent(() => import('@/components/Title.vue')),
    Image: defineAsyncComponent(() => import('@/components/Image.vue')),
  },
  props: {
    recipes: {
      type: Array,
      required: true,
    },
  },

  computed: {
    filters() {
      return this.recipes?.filter((recipe) => recipe.tags?.findIndex((tag) => tag?.tag === 'fish') !== -1);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: none;
  margin-top: 2rem;

  @media (min-width: 1024px) {
    border-radius: 10px;
    padding: 1rem;
    background: #fbfbfb;
    display: block;

    .list {
      display: flex;
      place-items: center;
      gap: 0.5rem;
    }

    .container__img {
      width: 2.5rem;
      aspect-ratio: 1/1;
      border-radius: 30%;
      object-fit: cover;
    }

    .container__title {
      padding-bottom: 0.8rem;
    }
  }
}
</style>
