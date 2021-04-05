<template>
  <div id="procedure-input">
    <input
      @input="onNameInput"
      class="border rounded border-gray-300 p-2 mt-1 mb-2 outline-none"
      type="text"
      placeholder="Procedure Name"
      autocomplete="on"
    />
    -
    <input
      @input="onPriceInput"
      class="border rounded border-gray-300 p-2 mt-1 mb-2 outline-none"
      type="number"
      placeholder="Procedure charge"
      autocomplete="on"
    />
  </div>
</template>

<script>
export default {
  name: 'ProcedureInput',
  data() {
    return {
      currentProcedure: {
        name: '',
        price: 0,
      },
    }
  },
  methods: {
    onNameInput(e) {
      this.currentProcedure.name = e.target.value
      this.$emit('input', this.currentProcedure)
    },
    onPriceInput(e) {
      this.currentProcedure.price = e.target.value
      this.$emit('input', this.currentProcedure)
    },
  },
}
</script>

<style></style>
