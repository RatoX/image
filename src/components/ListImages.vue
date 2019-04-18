<template>
  <section>
    <ol>
      <li
        v-for="item in items"
        :key="item.id">
        <h1>
          {{ item.name }}
        </h1>
        <section>
          <small>
            {{ item.dimension }}
            {{ item.size }}
          </small>
          <span> ➞ </span>
          <small v-if="!item.canvas">
            No data yet
          </small>
          <small v-if="item.canvas">
            <DownloadImage :image="item"/>
          </small>
        </section>
      </li>
    </ol>
  </section>
</template>

<script>
import DownloadImage from './DownloadImage.vue';

export default {
  name: 'ListImages',

  components: {
    DownloadImage,
  },

  computed: {
    items() {
      return this.$store.state.images.list;
    },
  },

  methods: {
    dimensions(canvas) {
      return `${canvas.width}x${canvas.height}`;
    },
  },
};
</script>

<style scoped>
ol {
  list-style: none;
}

small {
}

li + li {
  margin-top: 15px;
}
</style>
