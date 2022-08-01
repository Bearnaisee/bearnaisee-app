import { Ref, ref } from 'vue';

export function useTestFunction(): { count: Ref<number> } {
  console.log('useTestFunction');

  const count = ref(0);

  return { count };
}
