export function formatBytes(bytes, decimals) {
  // https://stackoverflow.com/a/18650828
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals <= 0 ? 0 : decimals || 2;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / (k ** i)).toFixed(dm))} ${sizes[i]}`;
}

export function createImageObject(file) {
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

export function extractExtension(text) {
  const arr = text.split('.');
  const extension = arr.pop();
  const filename = arr.join();

  return [filename, extension];
}

export function slugify(text) {
  // https://gist.github.com/mathewbyrne/1280286
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}
