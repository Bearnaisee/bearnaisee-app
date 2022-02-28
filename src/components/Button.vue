<template>
  <button class="button" :class="`button--${type}`">
    {{ label }}
  </button>
</template>

<script>
export default {
  name: 'Button',

  props: {
    label: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      default: 'primaasdasdry',
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  padding: 0.25rem 1rem;
  color: #fff;
  background-color: var(--text-primary);
  border: 2px solid var(--text-primary);
  font-weight: 700;
  font-size: 0.875rem;
  border-radius: var(--border-radius);
  cursor: pointer;

  &--primary {
    background: var(--highlight-color);
    border: 2px solid var(--highlight-color);
    color: #fff;
  }

  &--secondary {
    background: none;
    border: 2px solid var(--highlight-color);
    color: var(--highlight-color);
  }
}
</style>
