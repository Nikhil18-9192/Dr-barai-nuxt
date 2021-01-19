<template>
  <div id="files">
    <div class="title-container mb-6 flex">
      <h1 class="text-xl font-medium">Files</h1>
      <label for="add-image" class="add-images mt-1 hidden">
        <AddButton />
      </label>
      <input
        id="add-image"
        ref="fileInput"
        type="file"
        accept="image/*"
        multiple
        @change="onImageAdded"
      />
    </div>
    <div
      v-if="images.length != 0"
      class="preview flex flex-wrap object-contain"
    >
      <img
        v-for="(image, i) in images"
        :key="i"
        class="w-52 h-52 mr-8 mt-8"
        :src="image.formats.thumbnail.url"
        alt=""
      />
    </div>
    <div
      v-if="selectedImages.length != 0"
      class="preview flex flex-wrap object-contain"
    >
      <img
        v-for="(image, i) in selectedImages"
        :key="i"
        class="w-52 h-52 mr-8 mt-8 cursor-pointer"
        :src="image"
        alt=""
        @click="previewModal"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectedImages: [],
    }
  },
  methods: {
    onImageAdded(event) {
      const files = this.$refs.fileInput.files
      for (let i = 0; i < files.length; i++) {
        this.selectedImages.push(URL.createObjectURL(files[i]))
      }
      this.$emit('input', files)
    },
    previewModal() {
      this.$store.commit('SET_PREVIEW', this.selectedImages)
      this.$store.commit('PREVIEW_MODAL')
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
}
.new {
  .add-images {
    display: block;
    cursor: pointer;
  }
}
</style>
