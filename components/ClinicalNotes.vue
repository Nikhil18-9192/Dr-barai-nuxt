<template>
  <div id="clinical-notes">
    <div class="title-container mb-6 flex">
      <h1 class="text-xl font-medium">Clinical Notes</h1>
      <AddButton />
    </div>
    <div v-if="Object.entries(clinicalNotes).length != 0" class="container">
      <p class="my-5 text-base font-normal">
        Complaints: {{ clinicalNotes.complaints }}
      </p>
      <p class="my-5 text-base font-normal">
        Observations: {{ clinicalNotes.observations }}
      </p>
      <p class="my-5 text-base font-normal">
        Diagnosis: {{ clinicalNotes.diagnoses }}
      </p>
      <p class="my-5 text-base font-normal">Notes: {{ clinicalNotes.notes }}</p>
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
    return {}
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
