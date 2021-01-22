<template>
  <div id="appointments-page">
    <div class="title sm:flex justify-between my-4 sm:my-8">
      <h1 class="text-xl sm:text-2xl font-medium mb-4 sm:mb-0">Appointments</h1>

      <MyButton
        class="appointment-btn"
        :icon="addIcon"
        @click.native="newAppointment()"
        >Start New Appointment</MyButton
      >
    </div>
    <client-only>
      <div class="date-picker flex-none sm:flex">
        <p class="p-2">From-</p>
        <datepicker
          v-model="startDate"
          class="mt-0 sm:mt-2 text-blue-500"
          placeholder="Select Date"
        ></datepicker>
        <p class="p-2">To-</p>
        <datepicker
          v-model="endDate"
          class="mt-0 sm:mt-2 text-blue-500"
          :disabled-dates="getDisabledDates"
          placeholder="Select Date"
        ></datepicker>
        <button
          class="p-2 my-4 sm:my-0 bg-blue-500 text-white rounded cursor-pointer"
          @click="refresh"
        >
          Refresh
        </button>
      </div>
    </client-only>
    <table
      v-if="$device.isDesktopOrTablet"
      class="appointments-list border-separate"
    >
      <tbody>
        <tr class="text-gray-600 text-sm font-normal">
          <th
            class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200"
          >
            ID
          </th>
          <th
            class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200"
          >
            Patient’s Name
          </th>
          <th
            class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200"
          >
            Mobile
          </th>
          <th
            class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200"
          >
            Date and Time
          </th>
        </tr>
        <tr
          v-for="(appointment, i) in appointments"
          :key="i"
          class="bg-gray-100 my-5 text-sm font-normal cursor-pointer"
          @click="onAppointmentClick(appointment.id)"
        >
          <td class="py-3 pl-2">{{ appointment.id }}</td>
          <td class="py-3 px-0">{{ appointment.patient.name }}</td>
          <td class="py-3 px-0">{{ appointment.patient.mobile }}</td>
          <td class="py-3 px-0">
            {{
              formatter.formatDate(appointment.startDateTime) +
              ' at ' +
              formatter.formatTime(appointment.startDateTime)
            }}
          </td>
        </tr>
        <tr>
          <td v-if="!appointments">No appointments Yet</td>
        </tr>
      </tbody>
    </table>
    <AppointmentCardForPhone
      v-if="$device.isMobile"
      :card-info="appointments"
    />
    <div v-if="appointments.length" class="pagination flex justify-between">
      <client-only>
        <paginate
          v-model="currentPage"
          :page-count="totalPages"
          :page-range="3"
          :margin-pages="2"
          :click-handler="clickCallback"
          :prev-text="'<<'"
          :next-text="'>>'"
          prev-class="flex items-center mr-2 outline-none"
          next-class="flex items-center ml-2 outline-none"
          :container-class="'flex'"
          :page-class="'text-gray-400 p-1 mr-2'"
          :active-class="'text-gray-900'"
          :page-link-class="'outline-none'"
        >
        </paginate>
      </client-only>

      <div
        v-if="$device.isDesktopOrTablet"
        class="pagination flex justify-between outline-none"
      >
        <div class="nextprev flex">
          <button
            class="bg-gray-200 p1 h-8 w-14 text-base font-medium rounded-l"
            @click="prev(currentPage)"
          >
            Prev
          </button>
          <button
            class="bg-gray-300 p-1 h-8 w-14 text-base font-medium rounded-r"
            @click="next(currentPage)"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { appointments } from '@/apollo/queries/appointment/appointments.gql'
import formatDateTime from '@/utils/formatDateTime'
export default {
  name: 'AppointmentsPage',
  data() {
    return {
      addIcon: '/plus-circle.svg',
      totalItem: 0,
      appointments: [],
      perPage: 10,
      totalPages: 0,
      startDate: new Date(),
      endDate: new Date(),
      currentPage: 1,
      maxPage: 5,
    }
  },
  computed: {
    formatter() {
      return formatDateTime
    },
    getDisabledDates() {
      const disabledDates = {
        to: this.startDate,
      }
      return disabledDates
    },

    startDateISO() {
      return this.$dayjs(this.startDate).format('YYYY-MM-DDT00:00:00.01[Z]')
    },

    endDateISO() {
      return this.$dayjs(this.endDate).format('YYYY-MM-DDT24:00:00.00[Z]')
    },
  },
  mounted() {
    this.fetchappointments()
    this.fetchTotalappointmentsCount()
  },
  methods: {
    async clickCallback(selectedPage) {
      this.$store.commit('SET_LOADING')
      const { data } = await this.$apollo.query({
        query: appointments,
        variables: {
          limit: this.perPage,
          start: selectedPage * this.perPage - this.perPage,
          startDate: this.startDate,
          endDate: this.modifyEndDate(this.endDate),
        },
      })
      if (data.appointments.length !== 0) {
        this.appointments = data.appointments
      } else {
        this.appointments = []
      }
      this.$store.commit('UNSET_LOADING')
    },
    next() {
      this.currentPage++
      if (this.currentPage > this.totalPages) {
        this.$toast.error('no pages')
        this.currentPage = this.totalPages
      }
      this.fetchappointments()
    },
    prev() {
      this.currentPage--
      if (this.currentPage === 0) {
        this.$toast.error('no pages')
        this.currentPage = 1
      }
      this.fetchappointments()
    },
    async fetchappointments() {
      this.$store.commit('SET_LOADING')
      const { data } = await this.$apollo.query({
        query: appointments,
        variables: {
          limit: this.perPage,
          start: this.currentPage * this.perPage - this.perPage,
          startDate: this.startDateISO,
          endDate: this.endDateISO,
        },
      })
      if (data.appointments.length !== 0) {
        this.appointments = data.appointments
      } else {
        this.appointments = []
      }
      this.$store.commit('UNSET_LOADING')
    },
    async fetchTotalappointmentsCount() {
      this.totalItem = await this.$axios.$get(
        `/appointments/count?startDateTime_gte=${this.startDateISO}&startDateTime_lte=${this.endDateISO}`
      )
      this.totalPages = Math.ceil(this.totalItem / this.perPage)
    },
    refresh() {
      this.fetchappointments()
      this.fetchTotalappointmentsCount()
    },
    onAppointmentClick(id) {
      this.$router.push(`/appointments/${id}`)
    },

    newAppointment() {
      this.$router.push('/appointments/new')
    },

    modifyEndDate(date) {
      return this.$dayjs(date).startOf('day').add(1, 'day')
    },
  },
}
</script>

<style lang="scss" scoped>
#appointments-page {
  .add-btn {
    width: 200px;
    height: 37px;
    img {
      width: 20px;
      height: 20px;
    }
  }
  .appointments-list {
    border-spacing: 0 1.5em;
    table-layout: fixed;
    width: 90%;
    th {
      text-align: left;
      font-weight: 600;
    }
    td {
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  button {
    outline: none;
    &:hover {
      transform: scale(1.05);
    }
  }
  .appointment-btn {
    width: 230px;
  }
}
</style>
