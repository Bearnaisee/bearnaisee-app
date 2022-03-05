<template>
  <div class="slider">
    <router-link v-for="(card, cardIndex) of recipes" :key="cardIndex" :to="`/${card.author}/${card.slug}`">
      <Image :url="card.img" class="slider__image" style="width: 80vw" />

      <p class="slider__card-title">{{ card.title }}</p>
    </router-link>
  </div>
</template>

<script>
import Image from '@/components/Image.vue';

export default {
  name: 'RecipeSlider',

  components: {
    Image,
  },

  props: {
    recipes: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.slider {
  width: 100%;
  display: flex;
  overflow-x: scroll;
  gap: 1rem;
  height: auto;

  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  .slider__image {
    min-width: 200px;
    width: 100%;
  }
}
</style>
