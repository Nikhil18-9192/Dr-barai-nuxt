<template>
  <div id="files">
    <div class="title-container mb-6 flex">
      <h1 class="text-xl font-medium">Files</h1>
      <label for="add-image" class="add-images mx-2 mt-2">
        <img src="/add_btn.svg" alt="" />
      </label>
      <input
        id="add-image"
        type="file"
        accept="image/*"
        multiple
        @change="onImageAdded"
      />
    </div>
    <div class="preview flex flex-wrap">
      <img
        class="w-52 h-52 mr-8 mt-8"
        v-for="(image, i) in images"
        :key="i"
        :src="image"
        alt=""
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [],
    }
  },
  methods: {
    onImageAdded(event) {
      const files = event.target.files
      for (let i = 0; i < files.length; i++) {
        this.images.push(URL.createObjectURL(files[i]))
      }
      console.log(files)
    },
  },
}
</script>

<style lang="scss" scoped>
#files {
  margin-bottom: 55px;
  input[type='file'] {
    display: none;
  }
  .add-images {
    cursor: pointer;
  }
}
</style>
