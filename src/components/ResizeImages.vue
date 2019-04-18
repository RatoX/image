<template>
  <section class="resize-images">
    <span class="resize-images__span">
      <h1 class="resize-images__title">
        Reduce {{ listSize }} image(s) in
        <output>{{ reducePercent }}</output>% of original dimensions
      </h1>
      <input
        type="range"
        id="reducePercent"
        name="reducePercent"
        min="5" max="90"
        v-model="reducePercent"
        :disabled="isResizing"
      />
    </span>

    <button
      :disabled="isResizing"
      v-on:click="resize">
      {{ reduceActionLabel }}
    </button>

    <ListImages />
  </section>
</template>

<script>
import Pica from 'pica';
import ListImages from './ListImages.vue';

const pica = Pica();

function createCanvas(reducePercent, obj) {
  const percent = reducePercent;
  const { width, height } = obj.image;
  const newWidth = Math.ceil(width - (width * (percent / 100)));
  const newHeight = Math.ceil(height - (height * (percent / 100)));

  const canvas = document.createElement('canvas');
  canvas.setAttribute('width', newWidth);
  canvas.setAttribute('height', newHeight);
  canvas.setAttribute('style', 'display: none');
  canvas.id = obj.name;

  return canvas;
}

function resizeWithPica(reducePercent, obj) {
  const canvas = createCanvas(reducePercent, obj);
  document.body.appendChild(canvas);

  return pica
    .resize(obj.image, canvas, {
      unsharpAmount: 80,
      unsharpRadius: 0.6,
      unsharpThreshold: 2,
    })
    .then((result) => {
      document.body.removeChild(canvas);
      return result;
    });
}

export default {
  name: 'ResizeImages',

  data() {
    return {
      reducePercent: 90,
      isResizing: false,
    };
  },

  components: {
    ListImages,
  },

  computed: {
    listSize() {
      return this.$store.state.images.list.length;
    },

    reduceActionLabel() {
      if (this.isResizing) {
        return 'resizing...';
      }

      return 'Reduce it!';
    },
  },

  methods: {
    resize() {
      this.isResizing = true;

      const promises = this.$store
        .state.images.list
        .map((image, index) => {
          const resizePromise = resizeWithPica(this.reducePercent, image);
          return resizePromise.then(canvas => this.$store.dispatch('images/updateImageResized', { canvas, index }));
        });

      Promise
        .all(promises)
        .then(() => {
          this.isResizing = false;
        });
    },
  },
};
</script>

<style scoped>

.resize-images {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
}

.resize-images__title {
  font-size: 1em;
  text-align: center;
}

.resize-images__span {
  display: flex;
  flex-direction: column;
  padding: 0 20px;
}

</style>
