<template>
  <div class="top">
    <div class="topnav-container">
      <div class="topnav-logo">
        <Title text="Bearnaisee" size="h1" />
      </div>

      <div v-if="!getUserInfo" class="buttons">
        <Button kind="secondary" label="Signup" @clicked="switchLoginModal(false)" />

        <Button kind="primary" label="Login" @clicked="switchLoginModal(true)" />
      </div>
      <div v-if="getUserInfo" class="buttons">
        <button type="button" class="nav__button" @click="logout">Log out</button>
      </div>
    </div>

    <div class="search-wrapper">
      <input type="text" placeholder="Search for something..." />
    </div>

    <LoginModal v-if="showLoginModal" :start-login-tab="loginModalTab" @close="switchLoginModal" />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Frontpage',

  components: {
    Button: defineAsyncComponent(() => import('@/components/Button.vue')),
    Title: defineAsyncComponent(() => import('@/components/Title.vue')),
    LoginModal: defineAsyncComponent(() => import('@/components/LoginModal.vue')),
  },

  data() {
    return {
      showLoginModal: false,
      loginModalTab: null,
    };
  },

  computed: {
    ...mapGetters(['getUserInfo']),
  },

  methods: {
    ...mapMutations(['setUserInfo']),
    /**
     * @param {boolean | null} tab
     */
    switchLoginModal(tab = null) {
      this.startTab = tab;
      this.showLoginModal = !this.showLoginModal;
    },

    logout() {
      this.setUserInfo(null);
      localStorage.clear();
      window.location.reload();
    },
  },
};
</script>

<style lang="scss" scoped>
.buttons {
  margin-left: auto;
  gap: 0.5rem;
  display: flex;
  align-items: center;

  .nav__button {
    border: 1px solid var(--color-highlight);
    background-color: #fff;
    font-size: 1rem;
    color: var(--color-highlight);
    text-align: left;
    width: fit-content;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
  }
}
input {
  border: 1px solid #7e7e7e;
  width: 100%;
  height: 2rem;
  border-radius: 0.25rem;
  margin: 0.5rem 0;
}
.top {
  margin-bottom: 1rem;
  display: none;

  @media (max-width: 1024px) {
    display: block;
  }

  .topnav-container {
    display: flex;
  }
}
</style>
