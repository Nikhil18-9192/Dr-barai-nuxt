<template>
  <div
    id="preview"
    class="fixed w-full z-50 top-0 left-0 h-screen bg-black bg-opacity-50"
    @click.stop="$emit('dismiss')"
  >
    <div
      class="image-container flex bg-white relative rounded-md mx-auto mt-12 py-2 sm:py-6 px-2 sm:px-12 md:px-8 w-2/6 md:w-3/5 xl:w-2/5"
      @click.stop=""
    >
      <img
        class="nextprev transform rotate-180"
        src="/next.svg"
        alt=""
        @click="prev"
      />
      <div
        v-for="(image, i) in images"
        v-show="i == currentSlide"
        :key="i"
        class="w-full flex justify-center items-center object-contain"
      >
        <img
          class="w-64 sm:w-96 h-64 sm:h-96 object-contain"
          :src="image.url"
          alt=""
        />
      </div>
      <img class="nextprev" src="/next.svg" alt="" @click="next" />
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
      currentSlide: 0,
    }
  },
  methods: {
    next() {
      this.currentSlide++
      if (this.currentSlide > this.images.length - 1) {
        this.currentSlide = this.images.length - 1
      }
    },
    prev() {
      this.currentSlide--
      if (this.currentSlide < 0) {
        this.currentSlide = 0
      }
    },
  },
}
</script>

<style lang="scss" scopped>
#preview {
  z-index: 999;
  .nextprev {
    width: 35px;
  }
  .image-container {
    @include for-phone-only {
      width: 85%;
    }
  }
}
</style>
