<template>
  <div class="web-layout">
    <div class="sidenav">
      <SideNav />
    </div>

    <div class="content">
      <TopNav />

      <Title text="Top categories" size="h2" class="content__title" />

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

      <Title text="Trending" size="h2" class="content__title" />

      <RecipeSlider v-if="trendingRecipes?.length" class="slider__recipes" :recipes="trendingRecipes" />
      <p v-else>No trending recipes</p>

      <div>
        <Title text="Recent" size="h2" class="content__title" />

        <RecipeGrid v-if="recipes?.length" :recipes="recipes" :show-author="true" />
        <p v-else>No recent recipes</p>
      </div>
    </div>

    <div class="search">
      <div>
        <SearchBar />
      </div>
      <div v-if="getUserInfo?.id">
        <RecommendedFollow />
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
  name: 'Frontpage',

  components: {
    Icon: defineAsyncComponent(() => import('@/components/Icon.vue')),
    RecipeGrid: defineAsyncComponent(() => import('@/components/RecipeGrid.vue')),
    Title: defineAsyncComponent(() => import('@/components/Title.vue')),
    TopNav: defineAsyncComponent(() => import('@/components/TopNav.vue')),
    RecipeSlider: defineAsyncComponent(() => import('@/components/RecipeSlider.vue')),
    SideNav: defineAsyncComponent(() => import('@/components/SideNav.vue')),
    SearchBar: defineAsyncComponent(() => import('@/components/SearchBar.vue')),
    RecommendedFollow: defineAsyncComponent(() => import('@/components/RecommendedFollow.vue')),
  },

  data() {
    return {
      categories: ['meat', 'fish', 'poultry', 'vegetarian', 'pasta', 'soup', 'baking', 'dessert'],
      recipes: [],
      trendingRecipes: [],
    };
  },

  computed: {
    ...mapGetters(['getUserInfo']),
  },

  created() {
    this.fetchRecentRecipes();

    this.fetchTrendingRecipes();
  },

  methods: {
    async fetchRecentRecipes() {
      const URL = `${process.env.VUE_APP_API_URL}/recipes/recent`;

      this.recipes = await axios
        .get(URL)
        .then((res) => res?.data?.recipes || [])
        .catch((error) => {
          console.error('ERROR fetching recent recipes', error);
          return [];
        });
    },

    async fetchTrendingRecipes() {
      const URL = `${process.env.VUE_APP_API_URL}/recipes/trending`;

      this.trendingRecipes = await axios
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
.web-layout {
  display: flex;
  flex-direction: row;
  gap: 2rem;

  @media (max-width: 1024px) {
    display: block;
    padding: 1rem;
  }

  .sidenav {
    @media (min-width: 1024px) {
      width: 20%;
    }
  }

  .content {
    @media (min-width: 1024px) {
      width: 60%;
      margin-top: 2.5rem;
      background-color: #f7e8e855;
      border-radius: 1.5rem;
      padding: 0 1.5rem;
    }

    .content__title {
      padding: 20px 0px;
    }

    .categories {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem;
      margin: 1rem 0;

      .categories__link {
        margin: 0 auto;
        text-align: center;

        @media (min-width: 1024px) {
          padding: 1rem 2rem;
          &:hover {
            background-color: #f7e8e855;
            border-radius: 10px;
          }
        }

        p {
          text-transform: capitalize;
        }
      }
    }
  }

  .search {
    display: none;

    @media (min-width: 1024px) {
      display: block;
      width: 20%;
    }
  }
}

.slider__recipes {
  padding: 1rem 0;
}
</style>
