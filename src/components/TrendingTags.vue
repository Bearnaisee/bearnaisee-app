<template>
  <div class="container">
    <div>
      <Title text="Top Tags" size="h2" class="container__title" />
    </div>

    <div class="list">
      
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  name: 'RecommendedFollow',

  components: {
    Title: defineAsyncComponent(() => import('@/components/Title.vue')),
  },

  
};
</script>

<style lang="scss" scoped>
.container {
  border-color: rgba(126, 126, 126, 0.3);
      border-radius: 4px;
      border: 2px solid rgba($color: #7e7e7e, $alpha: 0.3);
      margin-bottom: 10px;

  @media (min-width: 1024px) {
    border-radius: 10px;
    padding: 0.8rem;
    display: block;

    .container__title {
      padding-bottom: 0.8rem;
    }

    .list {
      display: flex;
      place-items: center;
      width: 100%;
      gap: 1rem;
      padding: 0.6rem 0rem;
      

      .list__users {
        display: flex;
        flex-direction: column;
        .displayname {
          text-transform: capitalize;
          font-size: 0.85rem;
        }
        .username {
          font-size: 0.8rem;
        }
      }

      .list__avatar {
        width: 2.5rem;
        aspect-ratio: 1/1;
        border-radius: 50%;
      }

      .button {
        padding: 0.15rem 0.4rem;
        margin-left: auto;
      }
    }
  }
}
</style>
