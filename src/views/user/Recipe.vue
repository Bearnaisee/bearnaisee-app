<template>
  <div v-if="recipe" class="recipe">
    <div
      class="recipe__image"
      :style="{ backgroundImage: `url(${recipe?.coverImage || 'https://picsum.photos/1000/1000'})` }"
    >
      <div class="recipe__header">
        <button class="recipe__button">
          <Icon icon="arrow" width="24" height="auto" />
        </button>

        <button class="recipe__button" @click="likeRecipe">
          <Icon icon="heart" :color="userLikedRecipe ? '#FF7D61' : '#000'" width="24" height="auto" />
        </button>
      </div>
    </div>

    <div class="recipe__wrapper">
      <Title :text="recipe?.title" class="recipe__title" size="h1" />

      <div>
        <router-link :to="`/${$route.params.username}`"> By @{{ $route.params.username }} </router-link>

        <div>
          <div v-if="recipe?.estimatedTime > 0" class="recipe__icon">
            <Icon icon="time" color="#D53F29" width="12" height="auto" />

            <p>{{ recipe.estimatedTime }} minutes</p>
          </div>

          <div class="recipe__icon">
            <Icon icon="tag" color="#D53F29" width="12" height="auto" />

            <div>
              <router-link
                v-for="(tag, tagIndex) of recipe?.tags"
                :key="tagIndex"
                class="recipe__tag"
                :to="`#${tag.tag}`"
              >
                {{ tagIndex === 0 ? tag.tag : `, ${tag.tag}` }}
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <div class="recipe__section">
        <p>
          {{ computedDescription }}
        </p>

        <button
          v-if="recipe?.description?.split(' ').length > 20"
          class="section__description__button"
          @click="toggleShowMore"
        >
          <span v-if="showMore">Hide</span>

          <span v-else>More</span>
        </button>
      </div>

      <section class="recipe__section">
        <Title size="h3" text="Ingredients" class="section__title" />

        <div>
          <div
            v-for="(ingredient, ingredientIndex) of recipe?.ingredients"
            :key="ingredientIndex"
            style="display: grid; grid-template-columns: 1fr 5fr"
          >
            <p style="font-weight: 700">{{ ingredient.amount }}{{ ingredient.metric || '' }}</p>

            <p>
              {{ ingredient.ingredient }}

              <span v-if="ingredient.optional" style="font-weight: 700"> (optional) </span>
            </p>
          </div>
        </div>
      </section>

      <section class="recipe__section">
        <Title size="h3" text="Steps" class="section__title" />

        <div v-for="(step, stepIndex) of recipe?.recipeSteps" :key="stepIndex" style="margin-bottom: 1rem">
          <div
            style="display: flex; gap: 1rem; align-content: center; align-items: center"
            @click="switchStep(stepIndex)"
          >
            <div
              style="
                background-color: #e8e8e8;
                width: 3rem;
                height: 3rem;
                border-radius: 9999px;
                display: flex;
                place-items: center;
                place-content: center;
              "
            >
              <Title :text="stepIndex + 1" size="h2" style="z-index: 100; font-weight: 700" />
            </div>
          </div>

          <p v-if="step.show">
            {{ step.content }}
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
  name: 'Recipe',

  components: {
    Icon: defineAsyncComponent(() => import('@/components/Icon.vue')),
    Title: defineAsyncComponent(() => import('@/components/Title.vue')),
  },

  data() {
    return {
      showMore: false,
      recipe: null,
      userLikedRecipe: false,
    };
  },

  computed: {
    ...mapGetters(['getUserInfo']),

    computedDescription() {
      if (this.recipe?.description) {
        if (this.showMore) {
          return this.recipe?.description;
        }

        const description = this.recipe?.description?.split(' ');

        return `${description.splice(0, description.length > 20 ? 20 : description.length).join(' ')}${
          description.length > 20 ? '...' : ''
        }`;
      }

      return '';
    },
  },

  created() {
    this.fetchRecipe();
  },

  methods: {
    async fetchRecipe() {
      const HOST = process.env.VUE_APP_API_URL;
      const URL = `${HOST}/recipe/${this.$route.params.username}/${this.$route.params.slug}`;

      const recipe = await axios
        .get(URL)
        .then((res) => res?.data)
        .catch((error) => console.error('ERROR fetching recipe', error));

      for (let i = 0; i < recipe?.recipeSteps?.length; i += 1) {
        recipe.recipeSteps[i].show = true;
      }

      this.recipe = recipe;

      if (this.recipe) {
        this.checkIfLiked();
      }
    },

    toggleShowMore() {
      this.showMore = !this.showMore;
    },

    switchStep(index) {
      this.recipe.recipeSteps[index].show = !this.recipe.recipeSteps[index].show;
    },

    async likeRecipe() {
      const userId = this.getUserInfo.id;
      const recipeId = this.recipe.id;

      await axios
        .post(`${process.env.VUE_APP_API_URL}/recipe/like/${recipeId}/${userId}`)
        .then((res) => res?.data)
        .catch((error) => console.error('Something went wrong liking recipe', error));

      this.checkIfLiked();
    },

    async checkIfLiked() {
      const userId = this.getUserInfo.id;
      const recipeId = this.recipe.id;

      this.userLikedRecipe = await axios
        .get(`${process.env.VUE_APP_API_URL}/recipe/like/${recipeId}/${userId}`)
        .then((res) => res?.data?.userLiked || false)
        .catch((error) => {
          console.error('Something went wrong liking recipe', error);
          return false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.recipe {
  .recipe__image {
    height: 35vh;
    width: 100%;
    margin-bottom: 0%;
    z-index: 1;
    object-fit: cover;
    left: 0;
    top: 0;
  }

  .recipe__header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 2vh 3vw;
  }

  .recipe__button {
    background: none;
    border: none;
    height: 50px;
    width: 50px;
    background-color: #e8e8e8;
    border-radius: 50%;
    display: flex;
    place-items: center;
    place-content: center;
  }

  .recipe__wrapper {
    padding: 2rem 1rem;
    min-height: fit-content;
    height: 100%;
    background-color: #fdfdfd;
    border-radius: var(--border-radius) var(--border-radius) 0 0;
    z-index: 10;
    margin-top: -25%;
    width: 100%;

    .recipe__title {
      word-wrap: break-word;
    }

    .recipe__icon {
      display: flex;
      gap: 0.5rem;
      align-content: center;
      align-items: center;
      font-size: 0.8rem;

      .recipe__tag {
        font-size: 0.7rem;
        text-transform: capitalize;
      }
    }

    .recipe__section {
      margin: 1rem 0;

      .section__title {
        margin-bottom: 1rem;
      }

      .section__description__button {
        background: none;
        border: none;
        font-weight: 700;
      }
    }
  }
}
</style>
