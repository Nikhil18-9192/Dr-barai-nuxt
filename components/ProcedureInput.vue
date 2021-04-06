<template>
  <div id="procedure-input">
    <input
      @input="onNameInput"
      class="border rounded border-gray-300 p-2 w-5/12 mt-1 mb-2 outline-none text-sm"
      type="text"
      :value="procedure.name ? procedure.name : ''"
      placeholder="Procedure Name"
      autocomplete="on"
    />
    -
    <input
      @input="onPriceInput"
      class="border rounded border-gray-300 p-2 w-5/12 mt-1 mb-2 outline-none text-sm"
      type="number"
      :value="procedure.price ? procedure.price : ''"
      placeholder="Procedure charge"
      autocomplete="on"
    />
  </div>
</template>

<script>
export default {
  name: 'ProcedureInput',
  props: ['procedure'],
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

<style lang="scss" scoped></style>
