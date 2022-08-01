<template>
  <p class="tag" :style="`background-color: ${tagColor}`">
    {{ label }}
  </p>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue';
import generatePseudoRandomColor from '@/helpers/generatePseudoRandomColor';

const props = defineProps<{ label: string }>();

const tagColor = computed((): string => {
  return generatePseudoRandomColor(undefined, 100, 70, props.label);
});
</script>

<style lang="scss" scoped>
.tag {
  display: flex;
  padding: 0.5rem;
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
  transition-duration: 500ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  border-radius: 0.25rem;
  color: rgba(0, 0, 0, 0.8);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>
