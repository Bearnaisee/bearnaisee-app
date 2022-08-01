<template>
  <div class="web-layout">
    <div class="sidenav">
      <SideNav />
    </div>

    <div class="content">
      <TopNav />

      <Title :text="categoryTitle" size="h1" class="content__title" />

      <Title text="Trending" size="h2" class="content__title" />

      <RecipeSlider v-if="trendingRecipes?.length" class="slider__recipes" :recipes="trendingRecipes" />
      <p v-else>No trending recipes</p>

      <div class="content__grid">
        <Title text="Recent" size="h2" class="content__title" />

        <RecipeGrid v-if="recipes?.length" :recipes="recipes" :show-author="true" />
        <p v-else>No recent recipes</p>
      </div>
    </div>

    <div class="right">
      <SearchBar />
      <div v-if="getUserInfo?.id">
        <RecommendedFollow />
      </div>
    </div>
  </div>

  <!-- Hacky way to set meta title -->
  <Teleport to="head">
    <title>{{ metaTitle || 'Category | Bearnaisee' }}</title>
    <meta name="title" :content="metaTitle || 'Category | Bearnaisee'" />
    <meta name="description" :content="metaDescription" />

    <meta property="og:type" content="website" />
    <meta property="og:url" :content="`https://bearnais.ee/${$route.params.category}`" />
    <meta property="og:title" :content="metaTitle || 'Category | Bearnaisee'" />
    <meta property="og:description" :content="metaDescription" />

    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" :content="`https://bearnais.ee/${$route.params.category}`" />
    <meta property="twitter:title" :content="metaTitle || 'Category | Bearnaisee'" />
    <meta property="twitter:description" :content="metaDescription" />
  </Teleport>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, ref, computed } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import { Recipe } from 'types';
import { useRoute } from 'vue-router';

const Title = defineAsyncComponent(() => import('@/components/Title.vue'));
const RecipeGrid = defineAsyncComponent(() => import('@/components/RecipeGrid.vue'));
const TopNav = defineAsyncComponent(() => import('@/components/TopNav.vue'));
const RecipeSlider = defineAsyncComponent(() => import('@/components/RecipeSlider.vue'));
const SideNav = defineAsyncComponent(() => import('@/components/SideNav.vue'));
const SearchBar = defineAsyncComponent(() => import('@/components/SearchBar.vue'));
const RecommendedFollow = defineAsyncComponent(() => import('@/components/RecommendedFollow.vue'));

const store = useStore();

const getUserInfo = computed(() => store?.getters?.getUserInfo);

const recipes = ref([] as Recipe[]);
const trendingRecipes = ref([] as Recipe[]);

const route = useRoute();

const category = typeof route.params.category === 'string' ? route.params.category : route.params.category[0];

const categoryTitle = computed((): string => {
  return `${category.slice(0, 1).toUpperCase()}${category.slice(1, category.length)}`;
});

const metaTitle = computed((): string => {
  return `${categoryTitle.value} | Bearnaisee`;
});

const metaDescription = computed((): string => {
  return process?.env?.VUE_APP_META_DESC;
});

const fetchRecentRecipes = async (): Promise<void> => {
  recipes.value = await axios
    .get(`${process.env.VUE_APP_API_URL}/recipes/${category.toLowerCase()}/recent`)
    .then((res) => res?.data?.recipes || [])
    .catch((error) => {
      console.error('ERROR fetching recent recipes', error);
      return [];
    });
};

const fetchTrendingRecipes = async (): Promise<void> => {
  trendingRecipes.value = await axios
    .get(`${process.env.VUE_APP_API_URL}/recipes/${category.toLowerCase()}/trending`)
    .then((res) => res?.data?.recipes || [])
    .catch((error) => {
      console.error('ERROR fetching recent recipes', error);
      return [];
    });
};

fetchRecentRecipes();

fetchTrendingRecipes();
</script>

<style lang="scss" scoped>
.web-layout {
  display: flex;
  flex-direction: row;
  gap: 2rem;

  @media (max-width: 1024px) {
    display: block;
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
    padding: 10px 0px;
  }

  .content__grid {
    padding-bottom: 1.5rem;
  }
}
.right {
  width: 20%;

  @media (max-width: 1024px) {
    display: none;
  }

  .searchbar {
    text-align: center;
    border-radius: 4px;
    border: solid 1px var(--color-black);
  }
}
.sidenav {
  width: 20%;
}

.categories {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin: 1rem 0;

  @media (min-width: 1024px) {
    margin: 3rem 0;
    gap: 3rem;
  }

  .categories__link {
    margin: 0 auto;
    text-align: center;

    @media (min-width: 1024px) {
      padding: 1rem 2rem;
      &:hover {
        background-color: #ff7e6120;
        border-radius: 10px;
      }
    }

    p {
      text-transform: capitalize;
    }
  }
}

.slider__recipes {
  padding: 1rem 0;
}
</style>
