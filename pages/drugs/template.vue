<template>
  <div id="drugs">
    <AddPrescription
      v-if="modal"
      :edit-prescription="prescription[prescriptionIndexToEdit]"
      @addPrescription="submitPrescriptionData"
      @updatePrescription="updatePrescription"
      @dismiss="clearModal"
    />
    <div class="title flex justify-between my-8">
      <h1 class="text-xl sm:text-2xl font-medium mb-4">Drugs Template</h1>
      <MyButton :icon="addBtnIcon" @click.native="modal = true"
        >Create new Template</MyButton
      >
    </div>
    <div v-if="prescription.length && $device.isMobile" id="prescription-info">
      <div
        v-for="(item, i) in prescription"
        :key="i"
        class="card relative p-4 mb-4 border cursor-pointer"
      >
        <img
          class="absolute right-10"
          src="/edit_btn.svg"
          alt=""
          @click="editPrescription(i)"
        />
        <img
          class="absolute right-2"
          src="/delete_btn.svg"
          alt=""
          @click="deletePrescription(i)"
        />
        <p class="text-gray-600 text-xs font-normal border-b mb-3">
          DRUG:
          <span class="text-blue-600 text-base">
            {{ item.name ? item.name : item.drug.name }}</span
          >
        </p>

        <p class="text-gray-600 text-xs font-normal">
          DOSAGE & FREQUENCY :
          {{
            item.frequency == null || item.frequency.frequency == null
              ? '---'
              : item.frequency.frequency
          }}
        </p>
        <p class="text-gray-600 text-xs font-normal">
          DURATION :
          {{
            item.frequency == null || item.frequency.drugDuration == null
              ? '---'
              : item.frequency.drugDuration +
                ' ' +
                item.frequency.drugDurationFor
          }}
        </p>
        <p class="instructions text-gray-600 text-xs font-normal">
          INSTRUCTIONS :
          {{
            item.frequency == null || item.frequency.instructions == null
              ? '---'
              : item.frequency.instructions
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      prescription: [],
      modal: false,
      prescriptionIndexToEdit: -1,
    }
  },
  methods: {
    submitPrescriptionData(val) {
      if (val) {
        this.prescription.push(val)
      }
      this.modal = false
    },
    updatePrescription(val) {
      this.prescription[this.prescriptionIndexToEdit] = val
      this.modal = false
      this.prescriptionIndexToEdit = -1
    },

    editPrescription(index) {
      this.prescriptionIndexToEdit = index
      this.modal = true
    },
    deletePrescription(index) {
      this.sanitizedPrescription.splice(index, 1)
      this.prescription.splice(index, 1)
      this.$emit('input', this.sanitizedPrescription)
    },
    clearModal() {
      this.modal = false
      this.prescriptionIndexToEdit = -1
    },
  },
}
</script>

<style lang="scss" scopped>
.add-btn {
  width: 180px;
  height: 37px;
  img {
    width: 20px;
    height: 20px;
  }
}
.drugs-list {
  border-spacing: 0 1.5em;
  width: 90%;
  table-layout: fixed;
}
</style>
