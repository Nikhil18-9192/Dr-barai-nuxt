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
          {{ editPrescription ? 'Edit Prescription' : 'Add Prescription' }}
        </h1>
      </div>

      <div class="form flex-grow">
        <label for="gender" class="text-sm font-light text-gray-400"
          >Drug</label
        >
        <model-select
          v-model="selectedDrugId"
          :options="drugs"
          placeholder="Search Drug"
          autocomplete="on"
        />

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
import { AddPrescriptionValidation } from '@/utils/validation'
import query from '@/apollo/queries/drug/drug.gql'
import { ModelSelect } from 'vue-search-select'

export default {
  components: {
    ModelSelect,
  },
  props: {
    editPrescription: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      selectedDurationUnitIndex: 0,

      dosageFrequency: false,
      intake: '',
      duration: 0,
      drugs: [
        {
          value: false,
          text: 'Loading...',
        },
      ],
      instructions: '',
      selectedDrugId: '',
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
    if (this.editPrescription) {
      this.selectedDrugId = this.editPrescription.drug.id
      this.dosageFrequency = this.editPrescription.frequency.frequency
      this.intake = this.editPrescription.frequency.intake
      this.instructions = this.editPrescription.frequency.instructions
      this.duration = this.editPrescription.frequency.drugDuration
      this.selectedDurationUnitIndex = this.durationUnits.indexOf(
        this.editPrescription.frequency.drugDurationFor
      )
    }
  },
  methods: {
    submitPrescriptionData() {
      const {
        selectedDrugId,
        dosageFrequency,
        intake,
        duration,
        instructions,
      } = this
      const validation = AddPrescriptionValidation({
        selectedDrugId,
        // dosageFrequency,
        // intake,
        // duration,
        // instructions,
      })
      if (validation.error) {
        this.$toast.error(validation.error.message)
        return
      }
      const drug = this.drugs.find((drug) => drug.value == this.selectedDrugId)

      const respData = {
        drug: {
          id: this.selectedDrugId,
          name: drug.text,
        },
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
      if (this.editPrescription) {
        this.$emit('updatePrescription', respData)
        return
      }
      this.$emit('addPrescription', respData)
    },
    async fetchDrugs() {
      this.drugs = []

      try {
        const { data } = await this.$apollo.query({
          query,
          fetchPolicy: 'network-only',
        })

        for (let i = 0; i < data.drugs.length; i++) {
          const obj = {}
          obj.value = data.drugs[i].id
          obj.text = data.drugs[i].name
          this.drugs.push(obj)
        }
      } catch (error) {
        const obj = {}
        obj.value = false
        obj.text = error.message
        this.drugs.push(obj)
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
    height: 95vh;
  }
  .btn {
    height: 37px;
  }
}
</style>
