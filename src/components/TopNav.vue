<template>
  <div class="nav">
    <h2>Bearnaisee</h2>

    <router-link to="/">Frontpage</router-link>

    <router-link to="/home">Dashboard</router-link>

    <router-link to="/hougesen">Profile</router-link>
    <!-- 
    <router-link to="/hougesen/recipes">Recipes</router-link>

    <router-link to="/hougesen/recipe/spaghetti">Dummy recipe</router-link> -->
  </div>
</template>

<script>
export default {
  name: 'TopNav',
};
</script>

<style lang="scss" scoped>
.nav {
  width: 100%;
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;

  a {
    font-weight: bold;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
