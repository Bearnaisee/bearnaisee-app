<template>
  <div class="web-layout">
    <div class="sidenav">
      <SideNav />
    </div>

    <div class="content">
      <div v-if="!loading && !user">
        <!-- TODO: pimp up this shit -->
        <h1>User not found</h1>
      </div>

      <div v-else>
        <Image :src="avatarUrl" class="content__avatar" />

        <div class="content__social">
          <div>
            <h1 size="h1" class="content__name">
              {{ user?.displayName || user?.username || $route.params.username }}
            </h1>

            <p class="content__username">@{{ user?.username || $route.params.username }}</p>
          </div>

          <Button
            v-if="user?.id !== getUserInfo?.id"
            :label="following ? 'Unfollow' : 'Follow'"
            class="follow-button"
            type="button"
            kind="primary"
            @click="followUser"
          />
        </div>

        <p v-if="user?.description" class="description">
          {{ user.description }}
        </p>

        <div class="content__stats">
          <p>
            <span>
              {{ followerCount || 0 }}
            </span>
            followers
          </p>

          <p>
            <span>
              {{ followingCount || 0 }}
            </span>
            following
          </p>
        </div>

        <Title text="Recipes" size="h2" class="content__title" />

        <RecipeGrid v-if="recipes?.length" :recipes="recipes" />
        <p v-else>User has no recipes</p>
      </div>
    </div>

    <div class="search">
      <input type="text" placeholder="Search for something..." class="searchbar" />
    </div>
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
    SideNav: defineAsyncComponent(() => import('@/components/SideNav.vue')),
    Title: defineAsyncComponent(() => import('@/components/Title.vue')),
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
.web-layout {
  display: flex;
  flex-direction: row;
  gap: 2rem;

  @media (max-width: 1024px) {
    display: block;
  }

  .sidenav {
    @media (min-width: 1024px) {
      width: 20%;
    }
  }

  .content {
    .content__title {
      padding: 20px 0px;
      padding-top: 4rem;
    }

    .content__stats {
      display: flex;
      gap: 1rem;

      span {
        font-weight: 700;
      }
    }

    .content__avatar {
      width: 12rem;
      aspect-ratio: 1/1;
      border-radius: 50%;
    }

    .content__social {
      display: flex;
      gap: 2.5rem;
      place-items: center;

      .content__name {
        font-size: 1.5rem;
      }

      .content__username {
        font-size: 1.25rem;
      }

      .follow-button {
        margin-left: auto;
        height: fit-content;
        margin: 20px 0px;
      }
    }

    @media (min-width: 1024px) {
      width: 60%;
      margin-top: 2.5rem;
    }
  }

  .search {
    display: none;

    .searchbar {
      text-align: center;
      border-radius: 4px;
      border: solid 1px var(--color-black);
      width: 100%;
      height: 2rem;
    }

    @media (min-width: 1024px) {
      display: block;
      width: 20%;
      padding-top: 2.5rem;
      height: fit-content;
      gap: 1rem;
    }
  }
}
</style>
