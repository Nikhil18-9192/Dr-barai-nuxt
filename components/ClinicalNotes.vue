<template>
  <div id="clinical-notes">
    <AddClinicalNotes
      v-if="modal"
      @dismiss="modal = false"
      @clinicalNotesData="submitClinicalNotes"
    />
    <div class="title-container mb-6 flex">
      <h1 class="text-xl font-medium">Clinical Notes</h1>
      <AddButton @click.native="modal = true" />
    </div>
    <div v-if="notes" class="container">
      <p class="my-5 text-base font-normal">
        Complaints: {{ notes.complaints }}
      </p>
      <p class="my-5 text-base font-normal">
        Observations: {{ notes.observations }}
      </p>
      <p class="my-5 text-base font-normal">Diagnosis: {{ notes.diagnoses }}</p>
      <p class="my-5 text-base font-normal">Notes: {{ notes.notes }}</p>
      <div class="line"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    clinicalNotes: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      modal: false,
      addNotes: false,
    }
  },
  computed: {
    notes() {
      if (this.$route.name === 'appointments-newAppointment') {
        return this.addNotes
      } else if (Object.entries(this.clinicalNotes).length !== 0) {
        return this.clinicalNotes
      } else return false
    },
  },
  methods: {
    submitClinicalNotes(val) {
      if (val) {
        this.addNotes = val
      }
    },
  },
}
</script>

<style lang="scss" scoped>
#clinical-notes {
  margin-bottom: 55px;
  .line {
    border-bottom: 1px solid #c4c4c4;
  }
}
</style>
