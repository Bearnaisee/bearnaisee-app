<template>
  <div v-if="!loading && !user">
    <!-- TODO: pimp up this shit -->
    <h1>User not found</h1>
  </div>

  <div v-else>
    <Image :src="avatarUrl" class="avatar" />

    <h1 size="h1" class="name">{{ user?.displayName || user?.username || $route.params.username }}</h1>

    <p class="username">@{{ user?.username || $route.params.username }}</p>

    <p v-if="user?.description" class="description">
      {{ user.description }}
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

    <Button
      :label="following ? 'Unfollow' : 'Follow'"
      type="button"
      kind="primary"
      style="margin-left: auto; height: fit-content"
      v-if="user?.id !== getUserInfo?.id"
      @click="followUser"
    />

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
      user: null,
      followerCount: 0,
      followingCount: 0,
      recipes: [],
      following: false,
    };
  },

  computed: {
    ...mapGetters(['getUserInfo']),

    avatarUrl() {
      if (this.user?.avatarUrl) {
        return this.user.avatarUrl;
      }

      if (this.user?.email) {
        const emailHash = md5(this.user.email.toLowerCase());

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
    async fetchUserInfo() {
      this.user = await axios
        .get(`${process.env.VUE_APP_API_URL}/user/${this.$route.params.username}`)
        .then((res) => res?.data)
        .catch((error) => {
          console.error('Error fetching userinfo', error);
        });

      this.loading = false;

      this.fetchUserStats();

      if (this.user.id !== this.getUserInfo.id) {
        this.checkIfFollowing();
      }
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
      if (this.user.id) {
        const stats = await axios
          .get(`${process.env.VUE_APP_API_URL}/user/stats/${this.user.id}`)
          .then((res) => res?.data)
          .catch((error) => {
            console.error('Error fetching user stats', error);
          });

        this.followerCount = abbreviateNumber(stats?.followerCount || 0);
        this.followingCount = abbreviateNumber(stats?.followingCount || 0);
      }
    },

    async checkIfFollowing() {
      const userId = this.user.id;
      const followerId = this.getUserInfo.id;

      this.following = await axios
        .get(`${process.env.VUE_APP_API_URL}/user/follow/${userId}/${followerId}`)
        .then((res) => res?.data?.following || false)
        .catch((error) => {
          console.error('Error checking if following', error);
          return false;
        });
    },

    async followUser() {
      const userId = this.user.id;
      const followerId = this.getUserInfo.id;

      await axios
        .post(`${process.env.VUE_APP_API_URL}/user/follow/${userId}/${followerId}`)
        .then((res) => res?.data?.following || false)
        .catch((error) => {
          console.error('Error checking following user', error);
          return false;
        });

      this.checkIfFollowing();
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
