<template>
  <input type="text" placeholder="Search for something..." class="searchbar" />
</template>

<script>
export default {
  name: 'SearchBar',
};
</script>

<style lang="scss" scoped>
.searchbar {
  text-align: center;
  border-radius: 4px;
  border: solid 1px var(--color-black);
  width: 100%;
  height: 2rem;
  margin-top: 20px;
  margin-bottom: 1.5rem;
}
</style>
