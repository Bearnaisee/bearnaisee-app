<template>
  <div class="top">
    <div class="topnav-container">
      <div class="topnav-logo">
        <Icon class="top__mlogo" icon="logo" width="25" height="25" color="#FF7D61" />
        <Title class="top__title" text="Bearnaisee" size="h1" />
      </div>

      <div v-if="!getUserInfo" class="buttons">
        <Button kind="secondary" label="Signup" @clicked="switchLoginModal(false)" />

        <Button kind="primary" label="Login" @clicked="switchLoginModal(true)" />
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
import { mapGetters } from 'vuex';

export default {
  name: 'Frontpage',

  components: {
    Button: defineAsyncComponent(() => import('@/components/Button.vue')),
    Title: defineAsyncComponent(() => import('@/components/Title.vue')),
    LoginModal: defineAsyncComponent(() => import('@/components/LoginModal.vue')),
    Icon: defineAsyncComponent(() => import('@/components/Icon.vue')),
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
    /**
     * @param {boolean | null} tab
     */
    switchLoginModal(tab = null) {
      this.startTab = tab;
      this.showLoginModal = !this.showLoginModal;
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

    .topnav-logo {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      @media (max-width: 435px) {
        .top__mlogo {
          width: 40px;
          height: 40px;
        }
        .top__title {
          display: none;
        }
      }
    }
  }
}
</style>
