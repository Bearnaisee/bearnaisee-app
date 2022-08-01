<template>
  <div v-if="users" class="container">
    <div>
      <Title text="Who to follow" size="h2" class="container__title" />
    </div>

    <div v-for="user in users" :key="user.id" class="list">
      <div>
        <router-link :to="`/${user.username}`">
          <img :src="user.avatarUrl" :alt="`${user.username || ''} profile image`" class="list__avatar" />
        </router-link>
      </div>

      <div class="list__users">
        <router-link :to="`/${user.username}`" class="displayname">
          {{ user?.displayName || user?.username }}
        </router-link>
        <router-link :to="`/${user.username}`" class="username"> @{{ user.username }} </router-link>
      </div>

      <Button
        :label="user?.following ? 'Unfollow' : 'Follow'"
        class="button"
        type="button"
        kind="primary"
        @click="followUser(user.id)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, ref, computed } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';
import { User } from 'types';

const users = ref<(User & { following?: boolean })[]>([]);

const Button = defineAsyncComponent(() => import('@/components/Button.vue'));
const Title = defineAsyncComponent(() => import('@/components/Title.vue'));

const store = useStore();

const getUserInfo = computed(() => store?.getters?.getUserInfo);

const getUserToFollow = async () => {
  users.value = await axios
    .get(`${process.env.VUE_APP_API_URL}/user/who-to-follow/${getUserInfo.value.id}`)
    .then((res) => res?.data?.users || [])
    .catch((error) => {
      console.error('Error fetching user to follow', error);
      return [];
    });
};

getUserToFollow();

const checkIfFollowing = async (userId: number) => {
  const followerId = getUserInfo.value.id;

  if (!followerId) return;

  const following = await axios
    .get(`${process.env.VUE_APP_API_URL}/user/follow/${userId}/${followerId}`)
    .then((res) => res?.data?.following || false)
    .catch((error) => {
      console.error('Error checking if following', error);
      return false;
    });

  const userIndex = users.value?.findIndex((u) => u?.id === userId) ?? -1;

  if (userIndex > -1 && users.value.length) {
    users.value[userIndex].following = following;
  }
};

const followUser = async (userId: number) => {
  const followerId = getUserInfo.value.id;
  if (!followerId) return;

  await axios
    .post(`${process.env.VUE_APP_API_URL}/user/follow/${userId}/${followerId}`)
    .then((res) => res?.data?.following || false)
    .catch((error) => {
      console.error('Error checking following user', error);
      return false;
    });

  checkIfFollowing(userId);
};
</script>

<style lang="scss" scoped>
.container {
  display: none;

  @media (min-width: 1024px) {
    border-radius: 10px;
    padding: 0.8rem;
    display: block;

    .container__title {
      padding-bottom: 0.8rem;
    }

    .list {
      display: flex;
      place-items: center;
      width: 100%;
      gap: 1rem;
      padding: 0.6rem 0rem;

      .list__users {
        display: flex;
        flex-direction: column;
        .displayname {
          text-transform: capitalize;
          font-size: 0.85rem;
        }
        .username {
          font-size: 0.8rem;
        }
      }

      .list__avatar {
        width: 2.5rem;
        aspect-ratio: 1/1;
        border-radius: 50%;
      }

      .button {
        padding: 0.15rem 0.4rem;
        margin-left: auto;
      }
    }
  }
}
</style>
