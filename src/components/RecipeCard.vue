<template>
  <div>
    <div>
      <Image />
    </div>

    <router-link :to="`/${author}/${slug}`" class="rc-title">
      <Title :text="title" size="h2" />
    </router-link>

    <router-link :to="`/${author}`">
      <p style="color: #7e7e7e">by {{ author }}</p>
    </router-link>

    <div>
      <div class="rc-icon">
        <Icon icon="time" color="#D53F29" width="12" height="auto" />

        <p style="font-size: 0.675rem">{{ time }} minutes</p>
      </div>

      <div class="rc-icon">
        <Icon icon="tag" color="#D53F29" width="12" height="auto" />

        <div>
          <router-link v-for="(tag, tagIndex) of tags" :key="tagIndex" :to="`#${tag}`">
            {{ tagIndex === 0 ? tag : `, ${tag}` }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import Icon from '@/components/Icon.vue';
import Title from './Title.vue';

export default {
  name: 'RecipeCard',

  props: {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    time: {
      type: Number,
    },
    tags: {
      type: Array,
      default: () => [],
    },
  },

  components: {
    Image: defineAsyncComponent(() => import('@/components/Image.vue')),
    Title: defineAsyncComponent(() => import('@/components/Title.vue')),
    Icon,
  },

  Title,
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
