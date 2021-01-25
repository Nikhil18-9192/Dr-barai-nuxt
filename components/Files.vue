<template>
  <div id="files">
    <ImageViewModal
      v-if="previewModal"
      :images="images"
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
    <div class="flex flex-wrap object-contain">
      <div v-for="(image, i) in images" :key="i" class="preview relative">
        <img
          class="w-52 h-52 mr-8 mt-8 cursor-pointer"
          :src="image.url ? image.url : image"
          alt=""
          @click="previewModal = true"
        />
        <img
          class="delete-icon absolute top-8 right-8 hidden cursor-pointer"
          src="/delete_btn.svg"
          alt=""
          @click="deleteFile(image)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['value'],
  data() {
    return {
      images: [],
      previewModal: false,
    }
  },
  watch: {
    value: {
      handler(val) {
        if (val.length > 0) {
          this.images = val
        }
      },
    },
  },
  methods: {
    onImageAdded(event) {
      const images = this.$refs.fileInput.files
      for (let i = 0; i < images.length; i++) {
        const obj = {}
        obj.images = images[i]
        obj.url = URL.createObjectURL(images[i])
        this.images.push(obj)
      }
      this.$emit('input', this.images)
    },
    deleteFile(file) {
      if (file.images) {
        const index = this.images.findIndex((image) => image.url === file.url)
        this.images.splice(index, 1)
        return
      }

      this.$emit('deleteFile', file)
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
  .preview {
    &:hover .delete-icon {
      display: block;
    }
  }
}
</style>
