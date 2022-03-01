<template>
  <div>
    <Image />
  </div>

  <div class="rc-title">
    <h2>{{ title }}</h2>
  </div>

  <div class="rc-wrapper">
    <div class="rc-icon">
      <svg width="15" height="15" viewBox="0 0 11 11" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5.52 10.624A5.224 5.224 0 1 1 10.744 5.4a5.23 5.23 0 0 1-5.224 5.224Zm0-9.448a4.224 4.224 0 1 0 0 8.448 4.224 4.224 0 0 0 0-8.448Zm2.634 4.456a.498.498 0 0 0-.5-.5H6.02v-2.4a.5.5 0 1 0-1 0v2.9a.5.5 0 0 0 .5.5h2.134a.5.5 0 0 0 .5-.5Z"
          :fill="rccolor"
        />
      </svg>
    </div>
    <div>{{ time }}</div>

    <div class="rc-icon">
      <svg width="15" height="15" viewBox="0 0 8 11" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1.104 10.05c-.154 0-.306-.033-.446-.096a1.086 1.086 0 0 1-.658-1V1.852a1.102 1.102 0 0 1 1.1-1.1h4.976a1.102 1.102 0 0 1 1.1 1.1v7.096a1.1 1.1 0 0 1-1.846.8l-1.742-1.6-1.742 1.6c-.2.19-.465.299-.742.302Zm0-8.298a.1.1 0 0 0-.1.1v7.096a.1.1 0 0 0 .168.072l1.946-1.8a.702.702 0 0 1 .948 0l1.946 1.8a.1.1 0 0 0 .168-.072V1.852a.1.1 0 0 0-.1-.1H1.104Z"
          :fill="rccolor"
        />
      </svg>
    </div>
    <div>
      <router-link v-for="(tag, tagIndex) of tags" :key="tagIndex" :to="`#${tag}`">
        {{ tagIndex === 0 ? tag : `, ${tag}` }}
      </router-link>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  name: 'RecipeCard',

  props: {
    title: String,
    image: String,
    time: Number,
    tags: Array,

    rccolor: {
      type: String,
      default: '#D53F29',
    },
  },

  components: {
    Image: defineAsyncComponent(() => import('@/components/Image.vue')),
  },
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}

.rc-wrapper {
  display: grid;
  grid-template-columns: 30px 150px;
  grid-template-rows: repeat(2, 0fr);
}

.rc-icon {
  margin: 0px auto;
  text-align: center;
  padding-top: 1.5px;
}

.rc-title,
h2 {
  font-family: var(--header-text);
  font-weight: 200;
}
</style>
