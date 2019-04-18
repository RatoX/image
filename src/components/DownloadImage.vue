<template>
  <section>
    <a
      title="Download resized file"
      v-on:click="download"
      >
      {{ dimensions }}
      {{ size }}
    </a>
    <DownloadIcon />
  </section>
</template>

<script>
import Pica from 'pica';
import { saveAs } from 'file-saver';
import DownloadIcon from '../assets/downloadIcon.svg';
import { extractExtension, slugify, formatBytes } from '../utils';

export default {
  name: 'ImageDownload',

  props: ['image'],

  components: {
    DownloadIcon,
  },

  computed: {
    dimensions() {
      return `${this.image.canvas.width}x${this.image.canvas.height}`;
    },

    size() {
      const head = 'data:image/png;base64,';
      const base64Image = this.image.canvas.toDataURL();
      const size = Math.round((base64Image.length - head.length) * 3 / 4);
      return formatBytes(size);
    },
  },

  methods: {
    download() {
      const pica = Pica();
      pica
        .toBlob(this.image.canvas, this.image.type)
        .then((result) => {
          const [filename, extension] = extractExtension(this.image.name);
          const newFilename = `${slugify(filename)}.${extension}`;
          saveAs(result, newFilename);
        });
    },
  },
};
</script>

<style scoped>
section {
  display: inline-block;
}

a {
  cursor: pointer;
  text-decoration: underline;
  text-transform: initial;
}
</style>
