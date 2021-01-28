<template>
  <div
    id="add-drugs"
    class="fixed w-full z-50 top-0 left-0 h-screen bg-black bg-opacity-50"
    @click="$emit('dismiss')"
  >
    <div
      class="add-modal flex flex-col bg-white relative rounded-md mx-auto mt-32 sm:mt-12 py-4 sm:py-6 px-4 sm:px-12 md:px-8 sm:px-4 w-full sm:w-2/6 md:w-3/5 xl:w-2/5"
      @click.stop=""
    >
      <div class="heading h-14">
        <h1 class="text-lg font-medium text-center mb-4 sm:mb-8">Add Drugs</h1>
      </div>
      <div class="form px-4 sm:px-12 md:px-8 flex-grow">
        <label for="name" class="text-sm font-normal text-gray-400">Name</label>
        <input
          v-model="name"
          class="border rounded border-gray-300 p-2 w-full mt-1 mb-2 outline-none"
          type="text"
          placeholder="Elon musk"
          autocomplete="on"
        />
        <label for="drug type" class="text-sm font-normal text-gray-400"
          >Drug Type</label
        >
        <select
          v-model="drugType"
          class="border rounded border-gray-300 p-2 w-full mt-1 mb-2 outline-none placeholder-gray-400::placeholder text-sm"
        >
          <option disabled value="Select Drug Type">Select Drug Type</option>
          <option v-for="type in drugTypes" :key="type" :value="type">
            {{ type }}
          </option>
        </select>
        <label for="strength" class="text-sm font-normal text-gray-400"
          >Strength</label
        >
        <input
          v-model="strength"
          class="border rounded border-gray-300 p-2 mt-1 mb-2 outline-none w-1/3 text-sm"
          type="number"
          placeholder="10"
        />
        <span
          class="cursor-pointer text-blue-500 ml-2 capitalize"
          @click="
            selectedDosageUnitIndex < dosageUnits.length - 1
              ? selectedDosageUnitIndex++
              : (selectedDosageUnitIndex = 0)
          "
        >
          {{ dosageUnits[selectedDosageUnitIndex] }}
        </span>
      </div>
      <div class="mt-8 flex btn px-4 sm:px-12 md:px-8">
        <MyButton class="mr-4" :loading="loading" @click.native="addDrugs"
          >Submit</MyButton
        >
        <MyButton class="cancel-btn" @click.native="$emit('dismiss')"
          >Cancel</MyButton
        >
      </div>
    </div>
  </div>
</template>

<script>
import { drugType, dosageUnit } from '@/utils'
export default {
  name: 'AddDrugsModal',
  // eslint-disable-next-line
  props: ['drug'],
  data() {
    return {
      selectedDosageUnitIndex: 0,
      name: '',
      drugType: 'Select Drug Type',
      strength: '',
      loading: false,
    }
  },
  computed: {
    drugTypes() {
      return drugType
    },
    dosageUnits() {
      return dosageUnit
    },
  },
  mounted() {
    if (this.drug) {
      this.name = this.drug.name
      this.drugType = this.drug.drugType
      this.strength = this.drug.strength
      this.selectedDosageUnitIndex = this.dosageUnits.indexOf(
        this.drug.dosageUnit
      )
    }
  },
  methods: {
    async addDrugs() {
      this.loading = true
      const { name, drugType, strength } = this
      try {
        if (!this.drug) {
          const res = await this.$axios.$post(`/drugs`, {
            name,
            drugType,
            strength,
            dosageUnit: this.dosageUnits[this.selectedDosageUnitIndex],
          })
          this.$emit('dismiss')
          this.$emit('submitedDrug', res)
        } else {
          const res = await this.$axios.$put(`/drugs/${this.drug.id}`, {
            name,
            drugType,
            strength,
            dosageUnit: this.dosageUnits[this.selectedDosageUnitIndex],
          })
          this.$emit('dismiss')
          this.$emit('editedDrug', res)
        }
      } catch (error) {
        this.$toast.error(error.message)
      }
      this.loading = false
    },
  },
}
</script>

<style lang="scss" scopped>
.cancel-btn {
  background: #f3f4f6;
  color: #000;
}
</style>
