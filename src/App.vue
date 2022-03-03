<template>
  <div class="container">
    <router-view style="width: 100%" />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
:root {
  --text-primary: #101010;
  --highlight-color: #ff7d61;
  --border-radius: 20px;
}

* {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  transition: 0.4s;
  line-height: 1.6;
  color: var(--text-primary);

  &::before,
  &::after {
    margin: 0;
    padding: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 1.6;
  }
}

body,
html {
  scroll-behavior: smooth;
  font-family: 'Open Sans', sans-serif;
  height: 100%;
  padding: 0.5rem;
  width: 100%;
  color: var(--text-primary);
}

.container {
  width: 100%;
  margin: auto;

  @media (min-width: 640px) {
    max-width: 640px;
  }

  @media (min-width: 768px) {
    max-width: 768px;
  }

  @media (min-width: 1024px) {
    max-width: 1024px;
  }

  @media (min-width: 1280px) {
    max-width: 1280px;
  }

  @media (min-width: 1536px) {
    max-width: 1536px;
  }
}

a,
button {
  cursor: pointer;
}
</style>
