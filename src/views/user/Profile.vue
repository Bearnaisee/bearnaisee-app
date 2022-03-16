<template>
  <div v-if="!loading && !userInfo">
    <!-- TODO: pimp up this shit -->
    <h1>User not found</h1>
  </div>

  <div v-else>
    <!--     <div style="display: flex; align-content: center; align-items: center">
 -->
    <Image :src="avatarUrl" class="avatar" />

    <!--    </div> -->

    <h1 size="h1" class="name">{{ userInfo.displayName || userInfo.username || $route.params.username }}</h1>

    <p class="username">@{{ userInfo.username || $route.params.username }}</p>

    <p v-if="userInfo.description" class="description">
      {{ userInfo.description }}
    </p>

    <div style="display: flex; gap: 1rem">
      <p>
        <span style="font-weight: 700">
          {{ followerCount || 0 }}
        </span>
        followers
      </p>

      <p>
        <span style="font-weight: 700">
          {{ followingCount || 0 }}
        </span>
        following
      </p>
    </div>
    <Button label="Follow" type="button" kind="primary" style="margin-left: auto; height: fit-content" />

    <h2>Recipes</h2>

    <RecipeGrid v-if="recipes?.length" :recipes="recipes" />
    <p v-else>User has no recipes</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import md5 from 'md5';
import { defineAsyncComponent } from 'vue';
import axios from 'axios';
import abbreviateNumber from '@/helpers/abbreviateNumber';

export default {
  name: 'Profile',

  components: {
    Image: defineAsyncComponent(() => import('@/components/Image.vue')),
    RecipeGrid: defineAsyncComponent(() => import('@/components/RecipeGrid.vue')),
    Button: defineAsyncComponent(() => import('@/components/Button.vue')),
  },

  data() {
    return {
      loading: true,
      userInfo: null,
      followerCount: 0,
      followingCount: 0,
      recipes: [],
    };
  },

  computed: {
    avatarUrl() {
      if (this.userInfo?.avatarUrl) {
        return this.userInfo.avatarUrl;
      }

      if (this.userInfo?.email) {
        const emailHash = md5(this.userInfo.email.toLowerCase());

        return `https://gravatar.com/avatar/${emailHash}?s=192`;
      }

      return 'http://www.gravatar.com/avatar/?d=mp&s=192';
    },
  },

  created() {
    this.fetchUserInfo();
    this.fetchUserRecipes();
  },

  methods: {
    ...mapGetters(['getUserInfo']),

    async fetchUserInfo() {
      this.userInfo = await axios
        .get(`${process.env.VUE_APP_API_URL}/user/${this.$route.params.username}`)
        .then((res) => res?.data)
        .catch((error) => {
          console.error('Error fetching userinfo', error);
        });

      this.loading = false;

      this.fetchUserStats();
    },

    async fetchUserRecipes() {
      this.recipes = await axios
        .get(`${process.env.VUE_APP_API_URL}/recipes/${this.$route.params.username}`)
        .then((res) => res?.data?.recipes || [])
        .catch((error) => {
          console.error('Error fetching recipes', error);
          return [];
        });
    },

    async fetchUserStats() {
      if (this.userInfo.id) {
        const stats = await axios
          .get(`${process.env.VUE_APP_API_URL}/user/stats/${this.userInfo.id}`)
          .then((res) => res?.data)
          .catch((error) => {
            console.error('Error fetching user stats', error);
          });

        this.followerCount = abbreviateNumber(stats?.followerCount || 0);
        this.followingCount = abbreviateNumber(stats?.followingCount || 0);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.avatar {
  width: 12rem;
  aspect-ratio: 1/1;
  border-radius: 50%;
}

.name {
  font-size: 1.5rem;
}

.username {
  font-size: 1.25rem;
}
</style>
