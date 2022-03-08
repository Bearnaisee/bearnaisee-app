<template>
  <div class="recipe">
    <div class="recipe-img" :style="image">
      <div class="recipe-top-btn">
        <div class="recipe-back">
          <Icon icon="arrow" width="24" height="auto" />
        </div>

        <div class="recipe-like">
          <Icon icon="heart" color="#FF7D61" width="24" height="auto" />
        </div>
      </div>
    </div>

    <div class="recipe-wrapper">
      <div class="recipeinfo">
        <Title :text="recipe.title" style="padding-top: 1rem" size="h1" />

        <div style="margin-bottom: 1rem">
          <router-link :to="`/${recipe.author}`" style="font-weight: 400"> By @{{ recipe.author }} </router-link>

          <div>
            <div class="rc-icon">
              <Icon icon="time" color="#D53F29" width="12" height="auto" />

              <p style="font-size: 0.675rem">{{ recipe.time }} minutes</p>
            </div>

            <div class="rc-icon">
              <Icon icon="tag" color="#D53F29" width="12" height="auto" />

              <div>
                <router-link
                  v-for="(tag, tagIndex) of recipe.tags"
                  :key="tagIndex"
                  :to="`#${tag}`"
                  style="font-size: 0.675rem; font-weight: 400"
                >
                  {{ tagIndex === 0 ? tag : `, ${tag}` }}
                </router-link>
              </div>
            </div>
          </div>

          <div>
            <p>
              {{ computedDescription }}
            </p>

            <button
              v-if="recipe.description.split(' ').length > 20"
              style="background: none; border: none; font-weight: 700"
              @click="toggleShowMore"
            >
              <span v-if="showMore">Hide</span>

              <span v-else>More</span>
            </button>
          </div>
        </div>

        <div>
          <h3>Ingredients</h3>
          <div>
            <div
              v-for="(ingredient, ingredientIndex) of recipe.ingredients"
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
        </div>

        <div>
          <h3>Steps</h3>

          <div v-for="(step, stepIndex) of recipe.steps" :key="stepIndex" style="margin-bottom: 1rem">
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
              {{ step.text }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  name: 'Recipe',

  components: {
    Icon: defineAsyncComponent(() => import('@/components/Icon.vue')),
    Title: defineAsyncComponent(() => import('@/components/Title.vue')),
  },

  data() {
    return {
      showMore: false,
      image: { backgroundImage: "url('https://picsum.photos/1000/1000')" },

      recipe: {
        title: 'Bolognaise',
        author: 'filip_pedersen',
        time: 25,
        tags: ['Italian', 'Meat', 'Pasta'],
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Venenatis lectus magna fringilla urna. Etiam tempor orci eu lobortis. Integer quis auctor elit sed vulputate mi sit. Lacinia at quis risus sed vulputate odio ut enim blandit. Nibh praesent tristique magna sit amet purus. Eleifend donec pretium vulputate sapien nec sagittis. Facilisi morbi tempus iaculis urna id volutpat. Ultrices neque ornare aenean euismod.',

        steps: [
          {
            text: 'uno uno uno uno uno uno uno',
            show: true,
          },
          {
            text: 'dos dos dos dos dos dos',
            show: true,
          },
          {
            text: 'tres tres tres tres tres',
            show: true,
          },
        ],

        ingredients: [
          {
            metric: 'g',
            amount: 500,
            ingredient: 'beef minced',
            optional: false,
          },
          {
            metric: 'g',
            amount: 200,
            ingredient: 'spaghetti',
            optional: false,
          },
          {
            metric: 'g',
            amount: 200,
            ingredient: 'passata',
            optional: false,
          },
          {
            amount: 1,
            ingredient: 'garlic',
            optional: true,
          },
        ],
      },
    };
  },

  computed: {
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

  methods: {
    toggleShowMore() {
      this.showMore = !this.showMore;
    },

    switchStep(index) {
      this.recipe.steps[index].show = !this.recipe.steps[index].show;
    },
  },
};
</script>

<style lang="scss" scoped>
.recipe {
  .recipe-img {
    height: 35vh;
    width: 100%;
    margin-bottom: 0%;
    z-index: 1;
    object-fit: cover;
    left: 0;
    top: 0;
  }

  .recipe-top-btn {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 2vh 3vw;
  }

  .recipe-back {
    height: 50px;
    width: 50px;
    background-color: #e8e8e8;
    border-radius: 50%;
    display: flex;

    svg {
      display: block;
      justify-content: center;
      margin: auto;
    }
  }

  .recipe-like {
    height: 50px;
    width: 50px;
    background-color: #e8e8e8;
    border-radius: 50%;
    display: flex;

    svg {
      display: block;
      justify-content: center;
      margin: auto;
    }
  }

  .recipeinfo {
    margin: 10%;
  }
  h1 {
    font-family: var(--header-text);
  }

  h2 {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 21px;
    color: #7e7e7e;
  }

  h3 {
    margin-top: 2rem;
  }

  .recipe-wrapper {
    background-color: #fdfdfd;
    border-radius: 50px 50px 0 0;
    z-index: 10;
    margin-top: -25%;
    width: auto;
    height: auto;
    bottom: 0;

    padding-bottom: 5rem;
  }

  a {
    font-weight: bold;
    cursor: pointer;
    text-decoration: none;
  }

  .ingredients {
    display: inline-grid;
    grid-template-columns: 2fr 5fr;
    grid-template-rows: repeat(1, 1fr);
  }
}

.rc-icon {
  display: flex;
  gap: 0.5rem;
  align-content: center;
  align-items: center;
}

.rc-title {
  font-family: var(--header-text);
  font-weight: 200;
}
</style>
