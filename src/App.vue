<template>
  <div class="container">
    <TopNav />

    <router-view />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  components: {
    TopNav: defineAsyncComponent(() => import('@/components/TopNav.vue')),
  },
};
</script>

<style lang="scss">
:root {
  --black: #101010;
}

* {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  transition: 0.4s;
  line-height: 1.6;
  color: var(--black);
  &::before,
  &::after {
    margin: 0;
    padding: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 1.6;
  }
}

body,
html {
  scroll-behavior: smooth;
  font-family: sans-serif;
  height: 100%;
  padding-top: 0;
  width: 100%;
  color: var(--black);
}

.container {
  width: 100%;
  margin: auto;
  @media (min-width: 640px) {
    max-width: 640px;
  }

  @media (min-width: 768px) {
    max-width: 768px;
  }

  @media (min-width: 1024px) {
    max-width: 1024px;
  }

  @media (min-width: 1280px) {
    max-width: 1280px;
  }

  @media (min-width: 1536px) {
    max-width: 1536px;
  }
}
</style>
