<template>
  <div id="files">
    <ImageViewModal
      v-if="previewModal"
      :images="value"
      @dismiss="previewModal = false"
    />
    <div class="title-container flex">
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
    <div class="flex flex-wrap">
      <div v-for="(image, i) in value" :key="i" class="preview relative">
        <img
          class="w-52 h-52 mr-8 mt-8 cursor-pointer object-contain"
          :src="image.url"
          alt=""
          @click="previewModal = true"
        />
        <img
          :class="$device.isDesktop ? 'hidden' : ''"
          class="delete-icon absolute top-8 right-8 cursor-pointer"
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
      previewModal: false,
    }
  },

  methods: {
    onImageAdded(event) {
      const images = this.$refs.fileInput.files
      const imgArray = []
      for (let i = 0; i < images.length; i++) {
        const obj = {}
        obj.images = images[i]
        obj.url = URL.createObjectURL(images[i])
        imgArray.push(obj)
      }
      this.$emit('input', [...this.value, ...imgArray])
    },
    deleteFile(file) {
      if (file.images) {
        const payload = this.value.filter((v) => v.url !== file.url)
        this.$emit('input', payload)
        return
      }
      this.$emit('deleteFile', file.id)
    },
  },
}
</script>
<style lang="scss" scoped>
#files {
  input[type='file'] {
    display: none;
  }
  .preview {
    @include for-desktop-up {
      &:hover .delete-icon {
        display: block;
      }
    }
  }
  .delete-icon {
    @include for-phone-only {
      display: block;
    }
  }
}
</style>
