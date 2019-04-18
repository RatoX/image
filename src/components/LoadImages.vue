<template>
  <section
    :data-dark-mode="isDarkModeEnabled"
    >
    <span>
      <button>
        <ImageIcon />
        Click to add images to resize
      </button>
      <input type="file"
             id="image"
             @change="changeImage"
             accept="image/*"
             :disabled="loading"
             multiple
             name="image"/>
    </span>
  </section>
</template>

<script>
import ImageIcon from '../assets/imageIcon.svg';
import { createImageObject } from '../utils';

export default {
  name: 'LoadImages',
  components: {
    ImageIcon,
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    isDarkModeEnabled() {
      return false;
    },
  },
  methods: {
    changeImage({ target }) {
      this.loading = true;

      const promises = Array.from(target.files).map(createImageObject);

      Promise
        .all(promises)
        .then((result) => {
          this.loading = false;
          this.$store.dispatch('images/init', result);
        });
    },
  },
};
</script>

<style scoped>
section {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

svg {
  max-width: 30px;
  margin-right: 10px;
}

section[data-dark-mode=true] {
  background-color: #323234;
  color: #cecece;

  & svg {
    color: #fff;
  }
}

h1 {
  cursor: pointer;
}

span {
  position: relative;
  overflow: hidden;
  display: inline-block;
}

input[type=file] {
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}

button {
  border: 1px solid gray;
  color: #aeaeae;
  background-color: white;
  padding: 8px 20px;
  border-radius: 4px;
  font-size: 20px;
  font-weight: bold;
  display: flex;
}
</style>
