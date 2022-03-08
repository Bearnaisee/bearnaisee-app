<template>
  <div>
    <form @submit="createUser">
      <p>Username</p>
      <input v-model="username" type="text" />

      <p>Email</p>
      <input v-model="email" type="email" />

      <p>Password</p>
      <input v-model="password" type="password" />

      <button type="submit">Signup</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Signup',

  data() {
    return {
      username: '',
      email: '',
      password: '',
    };
  },

  methods: {
    async createUser() {
      if (this.username?.length && this.email?.length && this.password?.length) {
        const HOST = 'http://localhost:5000';
        const URL = `${HOST}/user/signup`;

        const result = await axios.post(URL, {
          username: this.username,
          email: this.email,
          password: this.password,
        });

        console.log('createUser RESULT', result);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
