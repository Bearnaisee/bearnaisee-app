<template>
  <div class="top">
    <div class="topnav-container">
      <div class="topnav-logo">
        <Title text="Bearnaisee" size="h1" />
      </div>
      <div class="buttons">
        <Button type="secondary" label="Signup" />
        <Button type="primary" label="Login" />
      </div>
    </div>
    <div class="search-wrapper">
      <input type="text" placeholder="Search for something..." />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  name: 'Frontpage',

  components: {
    Button: defineAsyncComponent(() => import('@/components/Button.vue')),
    Title: defineAsyncComponent(() => import('@/components/Title.vue')),
  },
};
</script>

<style lang="scss" scoped>
.topnav-container {
  display: flex;
}

.buttons {
  margin-left: auto;
  gap: 0.5rem;
  display: flex;
  align-items: center;
}
input {
  border: 1px solid #7e7e7e;
  width: 100vw;
  height: 2rem;
}
.top {
  margin-bottom: 1rem;
}
</style>
