<template>
  <div id="appointments-page">
    <div class="title flex justify-between my-8">
      <h1 class="text-2xl font-medium">Appointments</h1>
      <button
        class="bg-blue-500 rounded-md text-white text-sm font-medium add-btn flex items-center justify-center outline-none"
        @click="newAppointment()"
      >
        <img class="mr-1" src="/plus-circle.svg" alt="" />
        Start New Appointment
      </button>
    </div>

    <table class="appointments-list border-separate">
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
          class="bg-gray-100 my-5 text-sm font-normal"
          @click="onAppointmentClick(appointment.id)"
        >
          <td class="py-3 px-2">{{ appointment.id }}</td>
          <td class="py-3 px-0">{{ appointment.patient.name }}</td>
          <td class="py-3 px-0">{{ appointment.patient.mobile }}</td>
          <td class="py-3 px-0">
            {{
              formatter.formatDate(appointment.date) +
              ' at ' +
              formatter.formatTime(appointment.date)
            }}
          </td>
        </tr>
        <tr>
          <td v-if="!appointments">No appointments Yet</td>
        </tr>
      </tbody>
    </table>
    <div class="pagination flex justify-between outline-none">
      <div class="flex mb-6 items-center">
        <button
          v-if="maxPage <= totalPages && currentPage > 3"
          class="w-10 h-9 mr-2"
          @click="firstPage()"
        >
          first
        </button>

        <button
          v-for="item in pages"
          :key="item"
          :class="currentPage == item ? 'text-gray-900' : ''"
          class="p-1 mr-2 outline-none text-gray-400 font-normal"
          @click.prevent="paginatData(item)"
        >
          {{ item }}
        </button>

        <button
          v-if="maxPage <= totalPages && currentPage <= totalPages - 3"
          class="w-10 h-9 mr-2"
          @click="lastPage()"
        >
          last
        </button>
      </div>
      <div v-if="appointments.length" class="nextprev flex">
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
</template>

<script>
// TODO: pageLimit , store cleanup, create button component
import { appointments } from '@/apollo/queries/appointment/appointments.gql'
import formatDateTime from '@/utils/formatDateTime'
export default {
  name: 'AppointmentsPage',
  data() {
    return {
      totalItem: 0,
      appointments: [],
      perPage: 2,
      totalPages: 0,
      pages: [],
      start: 0,
      startDate: '2020-12-15T06:32:16.336Z',
      endDate: '2022-12-05T06:32:16.336Z',
      currentPage: 1,
      maxPage: 3,
      startPage: 0,
      endPage: 0,
    }
  },
  computed: {
    formatter() {
      return formatDateTime
    },
  },
  mounted() {
    this.fetchappointments()
    this.fetchTotalappointmentsCount()
  },
  methods: {
    onAppointmentClick(id) {
      this.$router.push(`/appointments/${id}`)
    },
    async fetchappointments() {
      const { data } = await this.$apollo.query({
        query: appointments,
        variables: {
          limit: this.perPage,
          start: this.start,
          startDate: this.startDate,
          endDate: this.endDate,
        },
      })
      this.appointments = data.appointments
      this.pagination()
    },
    async fetchTotalappointmentsCount() {
      this.totalItem = await this.$axios.$get(
        'http://localhost:1337/appointments/count'
      )
      this.totalPages = Math.ceil(this.totalItem / this.perPage)
      for (let i = 1; i <= this.totalPages; i++) {
        this.pages.push(i)
      }
    },

    newAppointment() {
      this.$router.push('/appointments/newAppointment')
    },

    pagination() {
      this.totalPages = Math.ceil(this.totalItem / this.perPage)
      if (this.totalPages <= this.maxPage) {
        this.startPage = 1
        this.endPage = this.totalPages
        const newPages = []
        for (let i = this.startPage; i <= this.endPage; i++) {
          newPages.push(i)
          this.pages = newPages
        }
        return
      } else if (this.currentPage > 3 && this.totalPages > this.maxPage) {
        if (this.currentPage <= this.totalPages - 1) {
          this.startPage = this.currentPage - Math.floor(this.maxPage / 2)
          this.endPage = this.currentPage + Math.floor(this.maxPage / 2)
          if (this.currentPage === this.totalPages - 1) {
            this.endPage = this.currentPage + 1
          }
          const newPages = []
          for (let i = this.startPage; i <= this.endPage; i++) {
            newPages.push(i)
            this.pages = newPages
          }
        }
      } else if (this.currentPage <= 3) {
        this.startPage = 1
        this.endPage = this.maxPage
        const newPages = []
        for (let i = this.startPage; i <= this.endPage; i++) {
          newPages.push(i)
          this.pages = newPages
        }
      }

      if (this.currentPage === this.totalPages) {
        this.startPage = this.totalPages - 4
        this.endPage = this.totalPages
        const newPages = []
        for (let i = this.startPage; i <= this.endPage; i++) {
          newPages.push(i)
          this.pages = newPages
        }
      }
    },
    firstPage() {
      this.paginatData(1)
    },
    lastPage() {
      this.paginatData(this.totalPages)
    },
    paginatData(pageNum) {
      this.currentPage = pageNum
      this.start = this.currentPage * this.perPage - this.perPage
      this.fetchappointments()
    },
    next(pageNum) {
      this.$store.commit('SET_LOADING')
      if (pageNum > this.totalPages - 1) {
        this.$toast.error('There is no next page')
        this.$store.commit('UNSET_LOADING')
        return
      }
      const nextPage = pageNum + 1
      this.paginatData(nextPage)
    },
    prev(pageNum) {
      this.$store.commit('SET_LOADING')
      if (pageNum < 2) {
        this.$toast.error('There is no prev page')
        this.$store.commit('UNSET_LOADING')
        return
      }
      const prevPage = pageNum - 1
      this.paginatData(prevPage)
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
    }
  }

  button {
    outline: none;
  }
}
</style>
