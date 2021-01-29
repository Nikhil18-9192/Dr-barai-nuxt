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
          Vital Signs
        </h1>
      </div>

      <div class="form flex-grow">
        <form autocomplete="on">
          <label for="gender" class="text-sm font-light text-gray-400"
            >Weight (kg)</label
          >
          <input
            v-model="weight"
            class="border rounded border-gray-300 p-2 mt-1 mb-3 outline-none w-full text-sm"
            type="Number"
            placeholder="75"
            autocomplete="on"
          />
          <label for="gender" class="text-sm font-light text-gray-400"
            >Blood Pressure (mmHG)</label
          >
          <br />
          <input
            v-model="systolic"
            class="border rounded border-gray-300 p-2 mt-1 mb-3 mr-2 outline-none w-1/4 text-sm"
            type="Number"
            placeholder="systolic"
            autocomplete="on"
          />
          <input
            v-model="diastolic"
            class="border rounded border-gray-300 p-2 mt-1 mb-3 outline-none w-1/4 text-sm"
            type="Number"
            placeholder="diastolic"
            autocomplete="on"
          />
          <span
            class="cursor-pointer text-blue-500 ml-2 capitalize"
            @click="
              bpMeasurementPositionIndex < bpMeasurementPositions.length - 1
                ? bpMeasurementPositionIndex++
                : (bpMeasurementPositionIndex = 0)
            "
          >
            {{ bpMeasurementPositions[bpMeasurementPositionIndex] }} </span
          ><br />
          <label for="address" class="text-sm font-light text-gray-400"
            >Pulse (heart beats / min)</label
          >
          <input
            v-model="pulse"
            class="border rounded border-gray-300 p-2 mt-1 mb-3 outline-none w-full text-sm"
            type="number"
            placeholder="Enter reading"
            autocomplete="on"
          />
          <label for="name" class="text-sm font-light text-gray-400"
            >Temperature (celcius)</label
          >
          <br />
          <input
            v-model="temperature"
            class="border rounded border-gray-300 p-2 mt-1 mb-3 outline-none w-1/3 text-sm"
            type="Number"
            placeholder="10"
            autocomplete="on"
          />
          <span
            class="cursor-pointer text-blue-500 ml-2 capitalize"
            @click="
              tempMeasurementPositionIndex < tempMeasurementPositions.length - 1
                ? tempMeasurementPositionIndex++
                : (tempMeasurementPositionIndex = 0)
            "
          >
            {{ tempMeasurementPositions[tempMeasurementPositionIndex] }}
          </span>
          <br />
          <label for="name" class="text-sm font-light text-gray-400"
            >Resp. Rate (breaths/min)</label
          >
          <br />
          <input
            v-model="respiration"
            class="border rounded border-gray-300 p-2 mt-1 outline-none w-3/5 text-sm"
            type="Number"
            placeholder="10"
            autocomplete="on"
          />
        </form>
      </div>
      <div class="mt-8 flex btn">
        <MyButton class="mr-4" @click.native="submitVitalSignData"
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
import { bpMeasurementPositions, tempMeasurementPositions } from '@/utils'
import { AddVitalSignValidation } from '@/utils/validation'
export default {
  // eslint-disable-next-line
  props: ['vitalsToEdit'],
  data() {
    return {
      bpMeasurementPositionIndex: 0,
      tempMeasurementPositionIndex: 0,
      systolic: null,
      diastolic: null,
      weight: null,
      pulse: null,
      temperature: null,
      respiration: null,
    }
  },
  computed: {
    bpMeasurementPositions() {
      return bpMeasurementPositions
    },
    tempMeasurementPositions() {
      return tempMeasurementPositions
    },
  },
  mounted() {
    if (this.vitalsToEdit.weight) {
      this.weight = this.vitalsToEdit.weight
      this.systolic = this.vitalsToEdit.bp.bpSystolic
      this.diastolic = this.vitalsToEdit.bp.bpDiastolic
      this.respiration = this.vitalsToEdit.respRate
      this.pulse = this.vitalsToEdit.pulse
      this.bpMeasurementPositionIndex = this.bpMeasurementPositions.indexOf(
        this.vitalsToEdit.bp.bpMeasurementPosition
      )
      this.tempMeasurementPositionIndex = this.tempMeasurementPositions.indexOf(
        this.vitalsToEdit.temperature.tempMeasurementPosition
      )
      this.temperature = this.vitalsToEdit.temperature.temperature
    }
  },
  methods: {
    submitVitalSignData() {
      const {
        weight,
        systolic,
        diastolic,
        temperature,
        respiration,
        pulse,
      } = this
      const validation = AddVitalSignValidation({
        weight,
        systolic,
        diastolic,
        temperature,
        respiration,
        pulse,
      })
      if (validation.error) {
        this.$toast.error(validation.error.message)
        return
      }
      const vitalSignData = {
        weight,
        respRate: this.respiration,
        pulse,
        bp: {
          bpSystolic: this.systolic,
          bpDiastolic: this.diastolic,
          bpMeasurementPosition: this.bpMeasurementPositions[
            this.bpMeasurementPositionIndex
          ],
        },
        temperature: {
          temperature,
          tempMeasurementPosition: this.tempMeasurementPositions[
            this.tempMeasurementPositionIndex
          ],
        },
      }
      this.$emit('addVitals', vitalSignData)
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
  .add-modal {
    height: 90vh;
  }
  input {
    &::placeholder {
      color: #a1a1a1;
    }
  }
}
</style>
