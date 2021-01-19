<template>
  <div id="new-appointment">
    <ImageViewModal v-if="$store.state.imageModal" />
    <AddAppointment class="new" />
    <Prescription class="new" />
    <VitalSigns class="new" />
    <ClinicalNotes class="new" />
    <Files class="new" />
  </div>
</template>

<script>
export default {}
</script>

<style></style>
