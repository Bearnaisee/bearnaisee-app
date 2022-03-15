<template>
  <div style="padding: 0 1rem">
    <TopNav />

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

    <div>
      <Title text="Recent" size="h2" class="recipe__card" />

      <div class="recipes">
        <RecipeCard
          v-for="(recipe, recipeIndex) of recipes"
          :key="recipeIndex"
          :title="recipe.title"
          :time="recipe.time"
          :tags="recipe?.tags?.map((t) => t?.tag)"
          :slug="recipe.slug"
          :author="recipe.author"
          :image="`https://picsum.photos/seed/${recipe.slug}/1000/1000`"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import axios from 'axios';

export default {
  name: 'Frontpage',

  components: {
    Icon: defineAsyncComponent(() => import('@/components/Icon.vue')),
    RecipeCard: defineAsyncComponent(() => import('@/components/RecipeCard.vue')),
    Title: defineAsyncComponent(() => import('@/components/Title.vue')),
    TopNav: defineAsyncComponent(() => import('@/components/TopNav.vue')),
    RecipeSlider: defineAsyncComponent(() => import('@/components/RecipeSlider.vue')),
  },

  data() {
    return {
      categories: ['meat', 'fish', 'poultry', 'vegetarian', 'pasta', 'soup', 'baking', 'dessert'],
      recipes: null,
    };
  },

  created() {
    this.fetchRecentRecipes();
  },

  methods: {
    async fetchRecentRecipes() {
      const HOST = process.env.VUE_APP_API_URL;
      const URL = `${HOST}/recipes/recent`;

      this.recipes = await axios
        .get(URL)
        .then((res) => res?.data?.recipes || [])
        .catch((error) => {
          console.error('ERROR fetching recent recipes', error);
          return [];
        });
    },
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
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1536px) {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
