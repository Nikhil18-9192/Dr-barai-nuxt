<template>
  <div
    id="add-product"
    class="fixed w-full z-50 top-0 left-0 h-screen bg-black bg-opacity-50"
    @click.stop="$emit('dismiss')"
  >
    <div
      class="add-modal flex flex-col bg-white relative rounded-md mx-auto sm:mt-12 py-4 sm:py-6 w-full sm:w-2/6 md:w-3/5 xl:w-2/5"
      @click.stop=""
    >
      <div class="heading">
        <h1 class="text-lg font-medium text-center mb-2 sm:mb-8">
          {{ product ? 'Edit' : 'Add New' }} Product
        </h1>
      </div>

      <div class="form flex-grow overflow-y-scroll px-4 sm:px-12 md:px-8">
        <label for="name" class="text-sm font-normal text-gray-400"
          >item name</label
        >
        <input
          v-model="name"
          class="border rounded border-gray-300 p-2 w-full mt-1 mb-2 outline-none"
          type="text"
          placeholder="eg. Paracetomol"
          autocomplete="on"
        />
        <label for="item code" class="text-sm font-normal text-gray-400"
          >item code</label
        >
        <input
          v-model="itemcode"
          class="border rounded border-gray-300 p-2 w-full mt-1 mb-2 outline-none"
          type="number"
          placeholder="Enter Item Code"
          autocomplete="on"
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
          <option value="supplies">suppliment</option>
        </select>
        <label for="manufacturer" class="text-sm font-normal text-gray-400"
          >Manufacturer</label
        >
        <input
          v-model="manufacturer"
          type="text"
          class="border rounded border-gray-300 p-2 w-full mt-1 mb-2 outline-none"
          placeholder="Enter manufacturer name"
          autocomplete="on"
        />
        <label for="stock" class="text-sm font-normal text-gray-400"
          >Stock</label
        ><br />
        <input
          v-model="stock"
          class="border rounded border-gray-300 p-2 w-1/3 mt-1 mb-2 outline-none"
          type="number"
          placeholder="10"
          autocomplete="on"
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
          v-model="retailPrice"
          class="border rounded border-gray-300 p-2 w-1/2 mt-1 mb-2 outline-none"
          type="number"
          placeholder="type product price"
          autocomplete="on"
        />
        <br />
        <label for="level" class="text-sm font-normal text-gray-400"
          >Re-order Level (notify if less than)</label
        ><br />
        <input
          v-model="reorderLevel"
          class="border rounded border-gray-300 p-2 w-1/2 mt-1 mb-2 outline-none"
          type="number"
          placeholder="10"
          autocomplete="on"
        />
        <br />
        <input
          id="serviceTax"
          v-model="serviceTax"
          type="checkbox"
          value="serviceTax"
        />
        <label for="serviceTax" class="text-sm font-normal text-gray-400"
          >Service Tax</label
        >
        <input id="sbcTax" v-model="sbcTax" type="checkbox" value="sbcTax" />
        <label for="sbcTax" class="text-sm font-normal text-gray-400"
          >Swachh Bharat Cess</label
        >
        <input id="kkcTax" v-model="kkcTax" type="checkbox" value="kkcTax" />
        <label for="kkcTax" class="text-sm font-normal text-gray-400"
          >Krishi kalyan Cess</label
        >
      </div>
      <div class="mt-8 flex btn px-4 sm:px-12 md:px-8">
        <MyButton class="mr-4" @click.native="submitProduct">Submit</MyButton>
        <MyButton class="cancel-btn" @click.native="$emit('dismiss')"
          >Cancel</MyButton
        >
      </div>
    </div>
  </div>
</template>

<script>
import { StockUnits } from '@/utils'
import { AddProductValidation } from '@/utils/validation'
export default {
  props: {
    product: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      name: '',
      itemcode: null,
      itemType: 'Select Item type',
      stockUnitsIndex: 0,
      manufacturer: '',
      stock: null,
      reorderLevel: null,
      retailPrice: null,
      serviceTax: false,
      sbcTax: false,
      kkcTax: false,
    }
  },
  computed: {
    stockUnits() {
      return StockUnits
    },
  },
  mounted() {
    if (this.product) {
      this.name = this.product.name
      this.itemcode = this.product.itemcode
      this.itemType = this.product.itemType
      this.manufacturer = this.product.manufacturer
      this.stock = this.product.stock
      this.reorderLevel = this.product.reorderLevel
      this.retailPrice = this.product.retailPrice
      this.serviceTax = this.product.serviceTax
      this.sbcTax = this.product.sbcTax
      this.kkcTax = this.product.kkcTax
      if (!this.product.stockingUnit) {
        this.stockUnitsIndex = 0
      } else {
        this.stockUnitsIndex = this.stockUnits.indexOf(
          this.product.stockingUnit
        )
      }
    }
  },
  methods: {
    async submitProduct() {
      const {
        name,
        itemcode,
        itemType,
        manufacturer,
        stock,
        reorderLevel,
        serviceTax,
        retailPrice,
        sbcTax,
        kkcTax,
      } = this
      try {
        if (!this.product) {
          const data = {
            name,
            itemcode,
            itemType,
            manufacturer,
            stock,
            reorderLevel,
            serviceTax,
            stockingUnit: this.stockUnits[this.stockUnitsIndex],
            sbcTax,
            kkcTax,
            retailPrice,
          }
          const validation = AddProductValidation({
            name,
            stock,
            retailPrice,
          })
          if (validation.error) {
            this.$toast.error(validation.error.message)
            return
          }

          if (this.itemType == 'Select Item type') {
            delete data.itemType
          }

          if (!stock) {
            delete data.stockingUnit
          }
          if (!retailPrice) {
            data.retailPrice = 0
          }
          const result = await this.$axios.$post('/products', data)

          this.$emit('dismiss', result)
          this.$toast.success('Product Added')
          this.$router.push('/products')
        } else {
          const data = {
            name,
            itemcode,
            itemType,
            manufacturer,
            stock,
            reorderLevel,
            serviceTax,
            stockingUnit: this.stockUnits[this.stockUnitsIndex],
            sbcTax,
            kkcTax,
            retailPrice,
          }
          if (!stock) {
            data.stock = 0
            delete data.stockingUnit
          }
          if (!reorderLevel) {
            data.reorderLevel = 0
          }
          if (!retailPrice) {
            data.retailPrice = 0
          }
          if (this.itemType == 'Select Item type') {
            delete data.itemType
          }
          const res = await this.$axios.$put(
            `/products/${this.product.id}`,
            data
          )
          this.$emit('dismiss')
          this.$toast.success('Product Updated')
          this.$emit('updatedProduct', res)
          this.$router.push('/products')
        }
      } catch (error) {
        this.$toast.error(error.message)
      }
    },
  },
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
  .add-modal {
    height: 90vh;
  }
  .heading {
    min-height: 30px;
  }
  .btn {
    min-height: 30px;
  }
  .form {
    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-track {
      background: #f9f9f9;
    }
    &::-webkit-scrollbar-thumb {
      background: #888;
    }
  }
}
</style>
