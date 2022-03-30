<template>
  <div class="web-layout">
    <div class="sidenav">
      <SideNav />
    </div>

    <div class="content">
      <TopNav />

      <h1>Settings</h1>

      <form class="form" @submit.prevent="saveSettings">
        <label class="form__label" for="displayName">Name</label>
        <input v-model="user.displayName" class="form__input" type="text" name="displayName" maxlength="50" />

        <label class="form__label" for="description">Description</label>
        <textarea
          v-model="user.description"
          class="form__textarea"
          name="description"
          type="text"
          rows="5"
          maxlength="255"
        />

        <label class="form__label" for="displayName">Location</label>
        <input v-model="user.location" class="form__input" type="text" name="location" maxlength="40" />

        <label class="form__label" for="website">Website</label>
        <input v-model="user.website" class="form__input" type="text" name="website" maxlength="40" />

        <Button type="submit" label="Save settings" class="form__button" />
      </form>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import axios from 'axios';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Settings',

  components: {
    SideNav: defineAsyncComponent(() => import('@/components/SideNav.vue')),
    TopNav: defineAsyncComponent(() => import('@/components/TopNav.vue')),
    Button: defineAsyncComponent(() => import('@/components/Button.vue')),
  },

  data() {
    return {
      user: {
        displayName: null,
        description: null,
        location: null,
        website: null,
      },
    };
  },

  computed: {
    ...mapGetters(['getUserInfo']),
  },

  watch: {
    getUserInfo: {
      handler() {
        this.initSettings();
      },
    },
  },

  created() {
    this.initSettings();
  },

  methods: {
    ...mapActions(['saveUserInfo']),

    initSettings() {
      if (!this.user?.displayName && this.getUserInfo?.id) {
        this.user.displayName = this.getUserInfo?.displayName ?? this.getUserInfo?.username;
        this.user.description = this.getUserInfo?.description;
        this.user.location = this.getUserInfo?.location;
        this.user.website = this.getUserInfo?.website;
      }
    },

    async saveSettings() {
      await axios
        .post('/user/settings', {
          ...this.user,
          userId: this.getUserInfo.id,
        })
        .then(() => {
          this.saveUserInfo({
            ...this.getUserInfo,
            ...this.user,
          });
        })
        .catch((error) => {
          console.error('Error saving user settings', error?.response?.data || error?.response || error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.web-layout {
  display: flex;
  flex-direction: row;
  gap: 2rem;

  .sidenav {
    @media (min-width: 1024px) {
      width: 20%;
    }
  }

  .content {
    .form {
      .form__label {
        color: var(--color-black);
        font-size: 0.875rem;
        margin-top: 1.25rem;
        font-weight: 500;
      }

      .form__input {
        border-color: rgba(126, 126, 126, 0.3);
        border-radius: 4px;
        border: 2px solid rgba($color: #7e7e7e, $alpha: 0.3);
        width: 100%;
        // height: 2rem;
        padding: 0.25rem;
      }

      .form__textarea {
        border-color: rgba(126, 126, 126, 0.3);
        border-radius: 4px;
        border: 2px solid rgba($color: #7e7e7e, $alpha: 0.3);
        width: 100%;
        resize: vertical;
        padding: 00.25rem;
        font-family: 'Poppins', sans-serif;
      }

      .form__button {
        margin-top: 1rem;
      }
    }

    @media (min-width: 1024px) {
      width: 60%;
      margin-top: 2.5rem;
      background-color: #f7e8e855;
      border-radius: 1.5rem;
      padding: 0 1.5rem 1.5rem;
    }
  }

  @media (max-width: 1024px) {
    display: block;
    padding: 1rem;
  }
}
</style>
