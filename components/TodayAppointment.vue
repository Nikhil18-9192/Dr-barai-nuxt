<template>
  <div id="today-appointment" class="relative">
    <h1 class="title text-2xl font-bold text-gray-500 pb-6">
      Today's Appointment
    </h1>
    <div
      class="list bg-gray-50 border border-gray-300 rounded-xl overflow-hidden"
    >
      <p
        v-if="appointments.length == 0"
        class="text-gray-400 absolute top-1/2 left-1/4"
      >
        No Appointments Today..
      </p>
      <div v-else class="container">
        <div
          v-for="(appointment, i) in appointments"
          :key="i"
          class="py-3 px-6"
        >
          <nuxt-link :to="`/appointments/${appointment.id}`">
            <p class="text-gray-500 text-sm mb-1">
              {{ formatter(appointment.startDateTime) }}
            </p>
            <h2 class="name text-xl capitalize font-normal">
              {{ appointment.patient.name }}
            </h2>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { appointments } from '@/apollo/queries/appointment/todayAppointment.gql'
import formatDateTime from '@/utils/formatDateTime'
export default {
  data() {
    return {
      appointments: [],
    }
  },
  mounted() {
    this.fetchAppointments()
  },
  methods: {
    async fetchAppointments() {
      try {
        const { data } = await this.$apollo.query({
          query: appointments,
          variables: {
            startDate: this.startDateISO(),
            endDate: this.endDateISO(),
          },
        })
        if (data.appointments.length !== 0) {
          this.appointments = data.appointments
        } else {
          this.appointments = []
        }
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
    formatter(date) {
      return formatDateTime.formatTime(date)
    },
  },
}
</script>

<style lang="scss" scoped>
#today-appointment {
  .title {
    @include for-phone-only {
      text-align: center;
    }
  }
  .list {
    width: 350px;
    min-height: 65vh;

    @include for-phone-only {
      width: 300px;
      margin-inline: auto;
    }
  }
  .container {
    max-height: 65vh;
    overflow-y: scroll;
  }
  .name {
    padding-bottom: 10px;
    border-bottom: 1px solid #969696;
  }
}
</style>
