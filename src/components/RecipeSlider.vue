<template>
  <div class="slider">
    <div v-for="(card, cardIndex) of cardsData" :key="cardIndex">
      <Image :url="card.img" class="slider__image" />
      <div class="slider__card-title">{{ card.title }}</div>
    </div>
  </div>
</template>

<script>
import Image from '@/components/Image.vue';

export default {
  name: 'RecipeSlider',

  components: {
    Image,
  },

  data() {
    return {
      cardsData: [
        {
          img: 'https://placeimg.com/100/140/animals',
          title: 'Bolo',
          description: 'Nem og hurtig bolo',
          rating: 9.5,
          stars: 4,
        },
        {
          img: 'https://placeimg.com/100/140/arch',
          title: 'Carbonara',
          description: 'Min specielle Carbo',
          rating: 8.4,
          stars: 5,
        },
        {
          img: 'https://placeimg.com/100/140/people',
          title: 'Lasagne',
          description: 'Alt hvad du skal bruge',
          rating: 7.234,
          stars: 2,
        },
        {
          img: 'https://placeimg.com/100/140/people',
          title: 'Lasagne',
          description: 'Alt hvad du skal bruge',
          rating: 7.234,
          stars: 2,
        },
        {
          img: 'https://placeimg.com/100/140/people',
          title: 'Lasagne',
          description: 'Alt hvad du skal bruge',
          rating: 7.234,
          stars: 2,
        },
        {
          img: 'https://placeimg.com/100/140/people',
          title: 'Lasagne',
          description: 'Alt hvad du skal bruge',
          rating: 7.234,
          stars: 2,
        },
        {
          img: 'https://placeimg.com/100/140/people',
          title: 'Lasagne',
          description: 'Alt hvad du skal bruge',
          rating: 7.234,
          stars: 2,
        },
        {
          img: 'https://placeimg.com/100/140/people',
          title: 'Lasagne',
          description: 'Alt hvad du skal bruge',
          rating: 7.234,
          stars: 2,
        },
        {
          img: 'https://placeimg.com/100/140/people',
          title: 'Lasagne',
          description: 'Alt hvad du skal bruge',
          rating: 7.234,
          stars: 2,
        },
        {
          img: 'https://placeimg.com/100/140/people',
          title: 'Lasagne',
          description: 'Alt hvad du skal bruge',
          rating: 7.234,
          stars: 2,
        },
        {
          img: 'https://placeimg.com/100/140/people',
          title: 'Lasagne',
          description: 'Alt hvad du skal bruge',
          rating: 7.234,
          stars: 2,
        },
        {
          img: 'https://placeimg.com/100/140/people',
          title: 'Lasagne',
          description: 'Alt hvad du skal bruge',
          rating: 7.234,
          stars: 2,
        },
        // copy and paste those three items as many times as you want
      ],
    };
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

  .slider__card-title {
    text-align: center;
  }
}
</style>
