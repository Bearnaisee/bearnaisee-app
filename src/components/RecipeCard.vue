<template>
  <div>
    <Image />
  </div>

  <router-link :to="`/${author}/${slug}`" class="rc-title">
    <Title :text="title" size="h2" />
  </router-link>

  <div>
    <div class="rc-icon">
      <Icon icon="time" color="#D53F29" width="18" height="18" />
      <div>{{ time }}</div>
    </div>

    <div class="rc-icon">
      <Icon icon="tag" color="#D53F29" width="18" height="auto" />
      <div>
        <router-link v-for="(tag, tagIndex) of tags" :key="tagIndex" :to="`#${tag}`">
          {{ tagIndex === 0 ? tag : `, ${tag}` }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import Icon from '@/components/Icon.vue';

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
    author: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
  },

  components: {
    Image: defineAsyncComponent(() => import('@/components/Image.vue')),
    Title: defineAsyncComponent(() => import('@/components/Title.vue')),
    Icon,
  },
};
</script>

<style lang="scss" scoped>
.rc-icon {
  display: flex;
  gap: 0.5rem;
  align-content: center;
  align-items: center;
}

.rc-title,
h2 {
  font-family: var(--header-text);
  font-weight: 200;
}
</style>
