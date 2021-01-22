<template>
  <div id="files">
    <ImageViewModal
      v-if="previewModal"
      :images="previewImages"
      @dismiss="previewModal = false"
    />
    <div class="title-container mb-6 flex">
      <h1 class="text-xl font-medium">Files</h1>
      <label for="add-image" class="add-images cursor-pointer">
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
    <div class="preview flex flex-wrap object-contain">
      <img
        v-for="(image, i) in previewImages"
        :key="i"
        class="w-52 h-52 mr-8 mt-8 cursor-pointer"
        :src="image"
        alt=""
        @click="previewModal = true"
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
      previewModal: false,
      imagesToView: [],
    }
  },
  computed: {
    previewImages() {
      if (this.images.length !== 0) {
        return this.images
      }
      return this.selectedImages
    },
  },
  methods: {
    onImageAdded(event) {
      const images = this.$refs.fileInput.files
      for (let i = 0; i < images.length; i++) {
        this.selectedImages.push(URL.createObjectURL(images[i]))
      }
      this.$emit('input', images)
      this.$emit('uploadImages', { images, urls: this.selectedImages })
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
</style>
