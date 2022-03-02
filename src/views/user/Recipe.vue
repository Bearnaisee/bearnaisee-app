<template>
  <div style="display: inline-block">
    <div>
      <h1>{{ $route.params.slug }}</h1>

      <h2>By {{ $route.params.username }}</h2>
    </div>

    <ul>
      <li v-for="step in steps" :key="step">
        <div>
          {{ step.title }}
        </div>

        <div>
          {{ step.desc }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Recipe',

  props: {},

  data() {
    return {
      steps: [
        { title: 'Step 1', desc: 'cook your pasta al dente' },
        { title: 'Step 2', desc: 'brown your meats' },
        { title: 'Step 3', desc: 'drizzle with cheese' },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
li {
  text-decoration: none;
}
ul {
  list-style-type: none;
}
</style>
