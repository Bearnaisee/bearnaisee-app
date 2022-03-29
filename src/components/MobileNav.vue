<template>
  <div class="nav">
    <router-link to="/" class="nav__link"> <Icon icon="home" width="40" height="40" /> </router-link>

    <router-link to="/" class="nav__link"> <Icon icon="search" width="40" height="40" /> </router-link>

    <router-link to="/create" class="nav__link">
      <Icon icon="create" width="60" height="60" color="#ff7d61" />
    </router-link>

    <router-link to="/" class="nav__link"> <Icon icon="bookmark" width="40" height="40" /> </router-link>

    <router-link to="/" class="nav__link"> <Icon icon="settings" width="40" height="40" /> </router-link>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  name: 'MobileNav',

  components: {
    Icon: defineAsyncComponent(() => import('@/components/Icon.vue')),
  },
};
</script>

<style lang="scss" scoped>
.nav {
  display: none;

  @media (max-width: 1024px) {
    display: flex;
    justify-content: space-around;
    background-color: #f7e8e8;
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 0.2rem 10rem;
    align-items: center;
  }

  @media (max-width: 640px) {
    padding: 0.2rem 3rem;
  }

  @media (max-width: 390px) {
    padding: 0.2rem 1rem;
  }
}
</style>
