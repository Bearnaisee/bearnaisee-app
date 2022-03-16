<template>
  <div class="card">
    <router-link :to="`/${author}/${slug}`">
      <Image class="card__image" :src="image" />
    </router-link>

    <router-link :to="`/${author}/${slug}`" class="card__title">
      <Title :text="title" size="h3" />
    </router-link>

    <p v-if="showAuthor">
      by
      <router-link :to="`/${author}`" class="card__author"> @{{ author }} </router-link>
    </p>

    <div v-if="time" class="card__icon">
      <Icon icon="time" color="#D53F29" width="12" height="12" />

      <p style="font-size: 0.675rem">{{ time }} minutes</p>
    </div>

    <div v-if="tags?.length" class="card__icon">
      <Icon icon="tag" color="#D53F29" width="12" height="12" />

      <div>
        <router-link
          v-for="(tag, tagIndex) of tags"
          :key="tagIndex"
          :to="`/category/${category}`"
          style="text-transform: capitalize"
        >
          {{ tagIndex > 0 && tags.length > tagIndex ? ', ' : '' }}
          {{ tag }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  name: 'RecipeCard',

  components: {
    Image: defineAsyncComponent(() => import('@/components/Image.vue')),
    Title: defineAsyncComponent(() => import('@/components/Title.vue')),
    Icon: defineAsyncComponent(() => import('@/components/Icon.vue')),
  },

  props: {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    showAuthor: {
      type: Boolean,
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
      default: null,
    },
    tags: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  width: 100%;

  .card__image {
    border-radius: var(--border-radius);
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  .card__author {
    color: #7e7e7e;

    &:hover {
      filter: brightness(0.15);
    }
  }

  .card__icon {
    display: flex;
    gap: 0.5rem;
    align-content: center;
    align-items: center;
  }

  .card__title > * {
    max-width: 100%;
    word-wrap: break-word;
    font-weight: 200;
  }
}
</style>
