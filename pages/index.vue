<template>
  <div id="home-page" class="flex justify-between py-16 px-2">
    <TodayAppointment />
    <TotalPatientsAndAppointments />
    <InventorySummary />
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  layout: 'default',
}
</script>

<style lang="scss" scoped>
#home-page {
  width: 100%;
  position: relative;
  flex-wrap: wrap;
  @include for-phone-only {
    flex-direction: column;
    flex-wrap: nowrap;
  }
}
</style>
