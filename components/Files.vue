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
    <div class="preview flex flex-wrap object-contain">
      <img
        v-for="(image, i) in images"
        :key="i"
        class="w-52 h-52 mr-8 mt-8 cursor-pointer"
        :src="image.url ? image.url : image"
        alt=""
        @click="previewModal = true"
      />
    </div>
  </div>
</template>

<script>
export default {
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
