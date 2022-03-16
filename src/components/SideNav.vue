<template>
  <div class="nav">
    <h2>Bearnaisee</h2>

    <router-link to="/" class="nav__link"> Frontpage </router-link>

    <router-link to="/home" class="nav__link"> Dashboard </router-link>

    <router-link :to="`/${getUserInfo.username}`" class="nav__link"> Profile </router-link>

    <router-link :to="`/${getUserInfo.username}/recipes`" class="nav__link"> My recipes </router-link>

    <router-link :to="`/${getUserInfo.username}/spaghetti`" class="nav__link"> Dummy recipe </router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'SideNav',

  computed: {
    ...mapGetters(['getUserInfo']),
  },
};
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  width: fit-content;
  flex-direction: column;
  padding: 0 1rem;

  .nav__link {
    font-size: 1.25rem;
    text-decoration: none;
    width: 100%;

    &.router-link-exact-active {
      color: var(--color-highlight);
    }
  }
}
</style>
