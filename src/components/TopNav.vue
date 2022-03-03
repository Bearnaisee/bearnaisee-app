<template>
  <div class="top">
    <div class="topnav-container">
      <div class="topnav-logo">
        <Title text="Bearnaisee" size="h1" />
      </div>
      <div class="buttons">
        <Button kind="secondary" label="Signup" />
        <Button kind="primary" label="Login" />
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
.buttons {
  margin-left: auto;
  gap: 0.5rem;
  display: flex;
  align-items: center;
}
input {
  border: 1px solid #7e7e7e;
  width: 100%;
  height: 2rem;
  border-radius: 4px;
  margin: 10px 0px;
}
.top {
  margin-bottom: 1rem;

  .topnav-container {
    display: flex;
  }
}
</style>
