<template>
  <div id="total-p-a" class="flex flex-col justify-between">
    <div class="list relative border border-gray-300 rounded-xl my-14">
      <div class="container py-3">
        <p class="title text-gray-400 text-center">Total Patients</p>
        <p class="text-black text-7xl mt-7 mb-1 text-center">
          {{ patientCount }}
        </p>
        <p v-if="newPatient" class="absolute newly-added text-gray-400">
          {{ newPatient }} of them added today!
        </p>
      </div>
    </div>
    <div class="list relative border border-gray-300 rounded-xl mb-6">
      <div class="container py-3">
        <p class="title text-gray-400 text-center">Total Appointments</p>
        <p class="text-black text-7xl mt-7 mb-1 text-center">
          {{ totalAppointment }}
        </p>
        <p v-if="newAppointment" class="absolute newly-added text-gray-400">
          {{ newAppointment }} of them added today!
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      patientCount: 50,
      totalAppointment: 120,
      newPatient: 5,
      newAppointment: 5,
    }
  },
}
</script>

<style lang="scss" scoped>
#total-p-a {
  .list {
    width: 350px;
    min-height: 40%;
    @include for-phone-only {
      width: 300px;
      height: 200px;
    }
  }

  .title {
    font-weight: 600;
    padding-top: 6px;
    padding-bottom: 15px;
    border-bottom: 1px solid #c4c4c4;
  }
  .newly-added {
    bottom: 10%;
    margin-left: 25%;
  }
}
</style>
