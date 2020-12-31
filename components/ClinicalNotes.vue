<template>
  <div id="clinical-notes">
    <div class="title-container mb-6 flex">
      <h1 class="text-xl font-medium">Clinical Notes</h1>
      <AddButton />
    </div>
    <div v-if="!empty" class="container">
      <p class="my-5 text-base font-normal">
        Complaints: {{ clinicalNotes.complaint }}
      </p>
      <p class="my-5 text-base font-normal">
        Observations: {{ clinicalNotes.observation }}
      </p>
      <p class="my-5 text-base font-normal">
        Diagnosis: {{ clinicalNotes.diagnosis }}
      </p>
      <p class="my-5 text-base font-normal">Notes: {{ clinicalNotes.notes }}</p>
      <div class="line"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clinicalNotes: {
        complaint: 'Headache',
        observation: 'Not lying',
        diagnosis: 'Headache',
        notes: 'another day at work',
      },
      empty: true,
    }
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
