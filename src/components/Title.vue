<template>
  <h1 v-if="size === 'h1'">
    {{ text }}
  </h1>

  <h2 v-else-if="size === 'h2'">
    {{ text }}
  </h2>

  <h3 v-else-if="size === 'h3'">
    {{ text }}
  </h3>

  <h4 v-else-if="size === 'h4'">
    {{ text }}
  </h4>

  <h5 v-else-if="size === 'h5'">
    {{ text }}
  </h5>

  <h6 v-else>
    {{ text }}
  </h6>
</template>

<script>
export default {
  name: 'Title',

  props: {
    text: {
      type: String,
      required: true,
    },

    size: {
      type: String,
      default: 'h6',
    },
  },
};
</script>

<style lang="scss" scoped>
h1,
h2,
h3,
h4,
h5,
h6 {
  line-height: 1.2;
}

h1 {
  @media (min-width: 640px) {
  }

  @media (min-width: 768px) {
  }

  @media (min-width: 1024px) {
  }

  @media (min-width: 1280px) {
  }

  @media (min-width: 1536px) {
  }
}

h2 {
  @media (min-width: 640px) {
  }

  @media (min-width: 768px) {
  }

  @media (min-width: 1024px) {
  }

  @media (min-width: 1280px) {
  }

  @media (min-width: 1536px) {
  }
}

h3 {
  @media (min-width: 640px) {
  }

  @media (min-width: 768px) {
  }

  @media (min-width: 1024px) {
  }

  @media (min-width: 1280px) {
  }

  @media (min-width: 1536px) {
  }
}

h4 {
  @media (min-width: 640px) {
  }

  @media (min-width: 768px) {
  }

  @media (min-width: 1024px) {
  }

  @media (min-width: 1280px) {
  }

  @media (min-width: 1536px) {
  }
}
h5 {
  @media (min-width: 640px) {
  }

  @media (min-width: 768px) {
  }

  @media (min-width: 1024px) {
  }

  @media (min-width: 1280px) {
  }

  @media (min-width: 1536px) {
  }
}

h6 {
  @media (min-width: 640px) {
  }

  @media (min-width: 768px) {
  }

  @media (min-width: 1024px) {
  }

  @media (min-width: 1280px) {
  }

  @media (min-width: 1536px) {
  }
}
</style>
