<template>
  <div>
    <img :src="url" alt="" />
  </div>
</template>

<script>
export default {
  name: 'Image',

  props: {
    url: { type: String, default: 'https://picsum.photos/1000/1000' },
  },
};
</script>

<style lang="scss" scoped>
img {
  border-radius: var(--border-radius);
  height: auto;
  width: 100%;
  aspect-ratio: 2/1;
  object-fit: cover;
}
</style>
