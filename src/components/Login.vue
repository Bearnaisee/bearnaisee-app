<template>
  <div>
    <form @submit="login">
      <p>Email</p>
      <input v-model="email" type="email" />

      <p>Password</p>
      <input v-model="password" type="password" />

      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Login',

  data() {
    return {
      email: '',
      password: '',
    };
  },

  methods: {
    async login() {
      if (this.email?.length && this.password?.length) {
        const HOST = 'http://localhost:5000';
        const URL = `${HOST}/user/login`;

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
