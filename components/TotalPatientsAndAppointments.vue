<template>
  <div id="total-p-a" class="flex flex-col relative">
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
    <div class="list relative border border-gray-300 rounded-xl mt-0">
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
      patientCount: 0,
      totalAppointment: 0,
      newPatient: 0,
      newAppointment: 0,
    }
  },
  mounted() {
    this.fetchTotalPatientsCount()
    this.fetchTotalAppointmentsCount()
  },
  methods: {
    async fetchTotalPatientsCount() {
      try {
        this.patientCount = await this.$axios.$get(`/patients/count`)
        this.newPatient = await this.$axios.$get(
          `/patients/count?createdAt_gte=${this.startDateISO()}&createdAt_lte=${this.endDateISO()}`
        )
      } catch (error) {
        this.$toast.error(error.message)
      }
    },
    async fetchTotalAppointmentsCount() {
      try {
        this.totalAppointment = await this.$axios.$get(`/appointments/count`)
        this.newAppointment = await this.$axios.$get(
          `/appointments/count?startDateTime_gte=${this.startDateISO()}&startDateTime_lte=${this.endDateISO()}`
        )
      } catch (error) {
        this.$toast.error(error.message)
      }
    },

    startDateISO() {
      return this.$dayjs().format('YYYY-MM-DDT00:00:00.01[Z]')
    },

    endDateISO() {
      return this.$dayjs().format('YYYY-MM-DDT24:00:00.00[Z]')
    },
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
      margin-inline: auto;
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
    @include for-phone-only {
      margin-left: 21%;
    }
  }
}
</style>
