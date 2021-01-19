<template>
  <div
    id="signature"
    class="fixed w-full z-50 top-0 left-0 h-screen bg-black bg-opacity-50"
  >
    <div
      class="wrapper bg-white relative rounded-md mx-auto mt-12 py-6 px-12 md:px-8 w-2/6 md:w-3/5 xl:w-2/5"
    >
      <canvas
        id="signature-pad"
        class="signature-pad border"
        width="675"
        height="200"
      ></canvas>
      <div class="btn mt-4 flex">
        <MyButton @click.native="save">Save</MyButton>
        <MyButton class="cancel-btn ml-4" @click.native="clearSign"
          >Clear</MyButton
        >
      </div>
    </div>
  </div>
</template>

<script>
import SignaturePad from 'signature_pad'

export default {
  data() {
    return {
      signaturePad: false,
    }
  },
  mounted() {
    const canvas = document.querySelector('canvas')
    this.signaturePad = new SignaturePad(canvas)
  },
  methods: {
    save() {
      if (this.signaturePad.isEmpty()) {
        return this.$toast.error('Please provide a signature first.')
      }
      this.signaturePad.toDataURL('image/svg+xml')
    },
    clearSign() {
      this.signaturePad.clear()
    },
  },
}
</script>

<style lang="scss" scopped>
#signature {
  .add-btn {
    width: 180px;
    height: 37px;
  }
  .cancel-btn {
    background: #f3f4f6;
    color: #000;
  }
}
</style>
