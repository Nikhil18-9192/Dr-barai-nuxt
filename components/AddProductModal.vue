<template>
  <div
    id="add-product"
    class="fixed w-full z-50 top-0 left-0 h-screen bg-black bg-opacity-50"
    @click.stop="$emit('dismiss')"
  >
    <div
      class="add-modal bg-white relative rounded-md mx-auto mt-12 py-6 px-12 md:px-8 sm:px-4 w-2/6 md:w-3/5 xl:w-2/5"
      @click.stop=""
    >
      <h1 class="text-lg font-medium text-center mb-8">Add New Product</h1>
      <div class="form">
        <label for="name" class="text-sm font-normal text-gray-400"
          >item name</label
        >
        <input
          v-model="name"
          class="border rounded border-gray-300 p-2 w-full mt-1 mb-2 outline-none"
          type="text"
          placeholder="eg. Paracetomol"
        />
        <label for="item code" class="text-sm font-normal text-gray-400"
          >item code</label
        >
        <input
          v-model="code"
          class="border rounded border-gray-300 p-2 w-full mt-1 mb-2 outline-none"
          type="number"
          placeholder=""
        />
        <label for="item type" class="text-sm font-normal text-gray-400"
          >item type</label
        >
        <select
          v-model="itemType"
          class="border rounded border-gray-300 p-2 w-full mt-1 mb-2 outline-none"
        >
          <option disabled value="Select Item type">Select Item type</option>
          <option value="drug">drug</option>
          <option value="equipment">equipment</option>
          <option value="supplies">supplies</option>
        </select>
        <label for="manufacturer" class="text-sm font-normal text-gray-400"
          >manufacturer</label
        >
        <input
          type="text"
          class="border rounded border-gray-300 p-2 w-full mt-1 mb-2 outline-none"
          placeholder="Eon musk"
        />
        <label for="stock" class="text-sm font-normal text-gray-400"
          >Stock</label
        ><br />
        <input
          class="border rounded border-gray-300 p-2 w-1/3 mt-1 mb-2 outline-none"
          type="number"
          placeholder="10"
        />
        <span
          class="cursor-pointer text-blue-500 ml-2 capitalize"
          @click="
            stockUnitsIndex < stockUnits.length - 1
              ? stockUnitsIndex++
              : (stockUnitsIndex = 0)
          "
        >
          {{ stockUnits[stockUnitsIndex] }}
        </span>
        <br />
        <label for="price" class="text-sm font-normal text-gray-400"
          >MRP (incl. taxes)</label
        ><br />
        <input
          class="border rounded border-gray-300 p-2 w-1/2 mt-1 mb-2 outline-none"
          type="number"
          placeholder="type product price"
        />
        <br />
        <label for="level" class="text-sm font-normal text-gray-400"
          >Re-order Level (notify if less than)</label
        ><br />
        <input
          class="border rounded border-gray-300 p-2 w-1/2 mt-1 mb-2 outline-none"
          type="number"
          placeholder="10"
        />

        <div class="mt-8 flex">
          <MyButton class="mr-4">Submit</MyButton>
          <MyButton class="cancel-btn" @click.native="$emit('dismiss')"
            >Cancel</MyButton
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { StockUnits } from '@/utils'
export default {
  data() {
    return {
      name: '',
      code: null,
      itemType: 'Select Item type',
      stockUnitsIndex: 0,
    }
  },
  computed: {
    stockUnits() {
      return StockUnits
    },
  },
  mounted() {},
  methods: {},
}
</script>

<style lang="scss" scoped>
#add-product {
  .add-btn {
    width: 180px;
    height: 37px;
  }
  button {
    outline: none;
  }
  .cancel-btn {
    background: #f3f4f6;
    color: #000;
  }
}
</style>
