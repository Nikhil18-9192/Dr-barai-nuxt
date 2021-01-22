<template>
  <div id="files">
    <ImageViewModal
      v-if="previewModal"
      :images="previewImages"
      @dismiss="previewModal = false"
    />
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
        for (const i in this.images) {
          // eslint-disable-next-line
          this.imagesToView.push(this.images[i].formats.thumbnail.url)
        }
        return this.imagesToView
      }
      return this.selectedImages
    },
  },
  methods: {
    onImageAdded(event) {
      const files = this.$refs.fileInput.files
      for (let i = 0; i < files.length; i++) {
        this.selectedImages.push(URL.createObjectURL(files[i]))
      }
      this.$emit('input', files)
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
