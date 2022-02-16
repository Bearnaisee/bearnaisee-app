<template>
  <div>
    <h1>{{ $route.params.slug }}</h1>

    <h2>By {{ $route.params.username }}</h2>
  </div>
</template>

<script>
export default {
  name: 'Recipe',
};
</script>

<style lang="scss" scoped></style>
