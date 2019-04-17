<template>
  <section
    :data-dark-mode="isDarkModeEnabled"
    >
    <span>
      <button>
        <Logo />
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
import Logo from '../assets/image.svg';

function formatBytes(bytes, decimals) {
  // https://stackoverflow.com/a/18650828
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals <= 0 ? 0 : decimals || 2;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / (k ** i)).toFixed(dm))} ${sizes[i]}`;
}

function createImageObject(file) {
  const obj = {};

  obj.name = file.name;
  obj.type = file.type;
  obj.size = formatBytes(file.size);

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const dimension = `${img.width}x${img.height}`;
        obj.dimension = dimension;
        obj.image = img;

        resolve(obj);
      };
      img.src = event.target.result;
    };

    reader.readAsDataURL(file);
  });
}

export default {
  name: 'LoadImages',
  components: {
    Logo,
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
