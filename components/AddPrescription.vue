<template>
  <div
    id="add-prescription"
    class="fixed w-full z-50 top-0 left-0 h-screen bg-black bg-opacity-50"
  >
    <div
      class="add-modal bg-white relative rounded-md mx-auto mt-12 py-6 px-12 md:px-8 sm:px-4 w-2/6 md:w-3/5 xl:w-2/5"
      @click.stop=""
    >
      <h1 class="text-lg font-medium text-center mb-8">Add Prescription</h1>
      <div class="form">
        <label for="gender" class="text-sm font-light text-gray-400"
          >Drug</label
        >
        <select
          v-model="selectedDrug"
          class="border rounded border-gray-300 p-2 w-full mt-1 mb-2 outline-none text-gray-400 text-sm"
        >
          <option disabled value="Select Drugs">Select Drugs</option>
          <option v-for="item in drugs" :key="item.id" :value="item.name">
            {{ item.name }}
          </option>
        </select>
        <label for="gender" class="text-sm font-light text-gray-400"
          >Dosage & Frequency</label
        >
        <select
          v-model="dosageFrequency"
          class="border rounded border-gray-300 p-2 w-full mt-1 mb-2 outline-none text-gray-400 text-sm"
        >
          <option disabled value="Select Dosage">Select Dosage</option>
          <option v-for="dosage in getDosage" :key="dosage" :value="dosage">
            {{ dosage }}
          </option>
        </select>
        <label for="address" class="text-sm font-light text-gray-400"
          >Intake Instruction</label
        >
        <textarea
          v-model="intake"
          placeholder="eg. before food"
          class="border rounded border-gray-300 p-2 w-full mt-1 mb-2 outline-none text-gray-400 text-sm"
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
        />
        <span
          class="cursor-pointer text-blue-500 ml-2"
          @click="
            selectedDurationUnitIndex < durationUnits.length - 1
              ? selectedDurationUnitIndex++
              : (selectedDurationUnitIndex = 0)
          "
        >
          {{ durationUnits[selectedDurationUnitIndex] }}
        </span>
        <div class="mt-8 flex">
          <MyButton class="mr-4" @click.native="submitPrescriptionData"
            >Submit</MyButton
          >
          <MyButton class="cancel-btn" @click.native="$emit('dismiss')"
            >Cancel</MyButton
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { dosageFrequency, durationUnits } from '@/utils'
import query from '@/apollo/queries/drug/drug.gql'
export default {
  data() {
    return {
      selectedDurationUnitIndex: 0,
      selectedDrug: 'Select Drugs',
      dosageFrequency: 'Select Dosage',
      intake: '',
      duration: '',
      drugs: [],
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
    this.drug()
  },
  methods: {
    submitPrescriptionData() {
      const prescriptionData = {
        drug: this.selectedDrug,
        dosage: this.dosageFrequency,
        intake: this.intake,
        duration: this.duration,
        durationUnit: this.durationUnits[this.selectedDurationUnitIndex],
      }
      this.$emit('prescriptionData', prescriptionData)
      this.$emit('dismiss')
    },
    async drug() {
      const { data } = await this.$apollo.query({
        query,
      })
      this.drugs = data.drugs
    },
  },
}
</script>

<style lang="scss" scopped>
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
}
</style>
