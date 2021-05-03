<template>
  <div
    id="add-prescription"
    class="fixed w-full z-50 top-0 left-0 h-screen bg-black bg-opacity-50"
    @click="$emit('dismiss')"
  >
    <div
      class="add-modal flex flex-col bg-white relative rounded-md mx-auto sm:mt-12 py-4 sm:py-6 px-4 sm:px-12 md:px-8 sm:px-4 w-full sm:w-2/6 md:w-3/5 xl:w-2/5"
      @click.stop=""
    >
      <div class="heading h-14">
        <h1 class="text-lg font-medium text-center mb-4 sm:mb-8">
          {{ editProduct ? 'Edit Products' : 'Add Product' }}
        </h1>
      </div>

      <div class="form flex-grow">
        <label for="gender" class="text-sm font-light text-gray-400"
          >Product</label
        >
        <model-select
          v-model="selectedProductId"
          :options="products"
          placeholder="Search Products"
          autocomplete="on"
        />
        <label for="name" class="text-sm font-light text-gray-400"
          >quantity</label
        >
        <br />
        <input
          v-model="quantity"
          class="border rounded border-gray-300 p-2 mt-1 mb-2 outline-none w-1/3 text-sm"
          type="Number"
          placeholder="10"
          autocomplete="on"
        />

        <br />
        <label for="gender" class="text-sm font-light text-gray-400"
          >Frequency</label
        >
        <select
          v-model="dosageFrequency"
          class="border rounded border-gray-300 p-2 w-full mt-1 mb-2 outline-none placeholder-gray-400::placeholder text-sm"
        >
          <option disabled value="Select Dosage">Select Dosage</option>
          <option v-for="dosage in getDosage" :key="dosage" :value="dosage">
            {{ dosage }}
          </option>
        </select>
        <label for="address" class="text-sm font-light text-gray-400"
          >Intake</label
        >
        <input
          v-model="intake"
          type="text"
          placeholder="eg. before food"
          class="border rounded border-gray-300 p-2 w-full mt-1 mb-2 outline-none placeholder-gray-400::placeholder text-sm"
          autocomplete="on"
        />
        <label for="address" class="text-sm font-light text-gray-400"
          >Instruction</label
        >
        <textarea
          v-model="instructions"
          placeholder="eg. before food"
          class="border rounded border-gray-300 p-2 w-full mt-1 mb-2 outline-none placeholder-gray-400::placeholder text-sm"
          autocomplete="on"
        ></textarea>
        <label for="name" class="text-sm font-light text-gray-400"
          >Duration</label
        >
        <br />
        <input
          v-model="duration"
          class="border rounded border-gray-300 p-2 mt-1 mb-2 outline-none w-1/3 text-sm"
          type="Number"
          placeholder="10"
          autocomplete="on"
        />
        <span
          class="cursor-pointer text-blue-500 ml-2 capitalize"
          @click="
            selectedDurationUnitIndex < durationUnits.length - 1
              ? selectedDurationUnitIndex++
              : (selectedDurationUnitIndex = 0)
          "
        >
          {{ durationUnits[selectedDurationUnitIndex] }}
        </span>
      </div>
      <div class="sm:mt-8 flex btn">
        <MyButton class="mr-4" @click.native="submitPrescriptionData"
          >Submit</MyButton
        >
        <MyButton class="cancel-btn mr-4" @click.native="$emit('dismiss')"
          >Cancel</MyButton
        >
      </div>
    </div>
  </div>
</template>

<script>
import { dosageFrequency, durationUnits } from '@/utils'
import { AddProductsValidation } from '@/utils/validation'
import query from '@/apollo/queries/products/product.gql'
import { ModelSelect } from 'vue-search-select'

export default {
  components: {
    ModelSelect,
  },
  props: {
    editProduct: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      selectedDurationUnitIndex: 0,
      quantity: 0,
      dosageFrequency: false,
      intake: '',
      duration: 0,
      products: [
        {
          value: false,
          text: 'Loading...',
        },
      ],
      instructions: '',
      selectedProductId: '',
    }
  },
  computed: {
    getDosage() {
      return dosageFrequency
    },
    durationUnits() {
      return durationUnits
    },
  },
  mounted() {
    this.fetchDrugs()
    if (this.editProduct) {
      this.selectedProductId = this.editProduct.product.id
      this.quantity = this.editProduct.quantity
      this.dosageFrequency = this.editProduct?.frequency?.frequency
      this.intake = this.editProduct?.frequency?.intake
      this.instructions = this.editProduct?.frequency?.instructions
      this.duration = this.editProduct?.frequency?.drugDuration
      this.selectedDurationUnitIndex = this.durationUnits.indexOf(
        this.editProduct?.frequency?.drugDurationFor
      )
    }
  },
  methods: {
    submitPrescriptionData() {
      const {
        selectedProductId,
        dosageFrequency,
        intake,
        duration,
        instructions,
      } = this
      const validation = AddProductsValidation({
        selectedProductId,
        // dosageFrequency,
        // intake,
        // duration,
        // instructions,
      })
      if (validation.error) {
        this.$toast.error(validation.error.message)
        return
      }
      const product = this.products.find(
        (product) => product.value == this.selectedProductId
      )
      const respData = {
        product: {
          id: this.selectedProductId,
          name: product.text,
        },
        quantity: this.quantity,
        frequency: {
          frequency: this.dosageFrequency,
          intake,
          drugDuration: this.duration,
          drugDurationFor: this.durationUnits[this.selectedDurationUnitIndex],
          instructions,
        },
      }
      if (!respData.frequency.frequency) {
        delete respData.frequency.frequency
      }
      if (this.editProduct) {
        this.$emit('updateProduct', respData)
        return
      }
      this.$emit('addProduct', respData)
    },
    async fetchDrugs() {
      this.products = []

      try {
        const { data } = await this.$apollo.query({
          query,
          fetchPolicy: 'network-only',
        })
        for (let i = 0; i < data.products.length; i++) {
          const obj = {}
          obj.value = data.products[i].id
          obj.text = data.products[i].name
          this.products.push(obj)
        }
      } catch (error) {
        const obj = {}
        obj.value = false
        obj.text = error.message
        this.products.push(obj)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
#add-prescription {
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

  select {
    option {
      color: #000;
    }
  }
  input {
    &::placeholder {
      color: #a1a1a1;
    }
  }
  .add-modal {
    height: 85vh;
  }
  .btn {
    height: 37px;
  }
}
</style>
