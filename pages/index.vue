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
  beforeCreate() {
    if (!this.$store.state.user) {
      this.$router.push('/login')
    }
  },
}
</script>

<style lang="scss" scopped>
#home-page {
  width: 100%;
  position: relative;
}
</style>
