<template>
  <div id="product-info">
    <div
      v-for="(item, i) in cardInfo"
      :key="i"
      class="card p-4 mb-4 border cursor-pointer"
      @click="productEdit(item)"
    >
      <p class="text-gray-600 text-xs font-normal border-b mb-3">
        Name: <span class="text-blue-600 text-base">{{ item.name }}</span>
      </p>
      <p class="text-gray-600 text-xs font-normal">
        Stock Qty : {{ item.stock }}{{ item.stockingUnit }}
      </p>
      <p class="text-gray-600 text-xs font-normal">
        Price(INR) : {{ item.retailPrice }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cardInfo: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      modal: false,
    }
  },
  methods: {
    productEdit(product) {
      this.$emit('productEdit', product)
    },
  },
}
</script>
<style lang="scss" scopped></style>
