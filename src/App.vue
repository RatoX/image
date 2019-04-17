<template>
  <main id="app">
    <LoadImages v-if="isImagesEmpty"/>
    <ResizeImages v-if="!isImagesEmpty"/>
  </main>
</template>

<script>
import LoadImages from './components/LoadImages.vue';

export default {
  name: 'App',
  components: {
    LoadImages,
    ResizeImages: () => import('./components/ResizeImages'),
  },
  computed: {
    isImagesEmpty() {
      return this.$store.state.images.list.length === 0;
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  font-family:
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    Helvetica,
    Arial,
    sans-serif,
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol";
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased !important;
  -moz-font-smoothing: antialiased !important;
  text-rendering: optimizelegibility !important;
  letter-spacing: .03em;
  margin: 0;
}

a {
  color: #383737;
  text-transform: uppercase;
  text-decoration: none;
  align-self: center;
}

.back {
  color: #000;
  font-size: 2em;
  margin-left: 10px;
}

#app {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

html, body {
  min-height: 100vh;
  background-color: #f8f8f8;
}
</style>
