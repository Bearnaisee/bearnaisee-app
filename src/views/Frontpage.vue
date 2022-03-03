<template>
  <TopNav />
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

  <div id="app">
    <button type="button" class="btn" @click="showModal">Open Modal!</button>

    <Modal v-show="isModalVisible" @close="closeModal" />
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
    Modal: defineAsyncComponent(() => import('@/components/Modal.vue')),
    TopNav: defineAsyncComponent(() => import('@/components/TopNav.vue')),
  },

  data() {
    return {
      isModalVisible: false,
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

  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
