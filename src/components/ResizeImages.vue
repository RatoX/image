<template>
  <section>
    <span>
      <h1>
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

  </section>
</template>

<script>
import Pica from 'pica';
import { saveAs } from 'file-saver';

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

function extractExtension(text) {
  const arr = text.split('.');
  const extension = arr.pop();
  const filename = arr.join();

  return [filename, extension];
}

function slugify(text) {
  // https://gist.github.com/mathewbyrne/1280286
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
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
    .then(result => pica.toBlob(result, obj.type))
    .then((result) => {
      const [filename, extension] = extractExtension(obj.name);
      const newFilename = `${slugify(filename)}.${extension}`;

      saveAs(result, newFilename);

      document.body.removeChild(canvas);
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
        .map(resizeWithPica.bind(null, this.reducePercent));

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

section {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
}

h1 {
  font-size: 1em;
  text-align: center;
}

button {
}

span {
  display: flex;
  flex-direction: column;
  padding: 0 20px;
}

</style>
