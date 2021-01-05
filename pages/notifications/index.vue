<template>
  <div id="notification-page">
    <div class="title flex justify-between my-8">
      <h1 class="text-2xl font-medium">SMS Logs</h1>
      <MyButton :icon="addBtnIcon">Create New SMS</MyButton>
    </div>

    <table class="notification-list border-separate">
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
            Sent TO
          </th>
          <th
            class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200"
          >
            Mobile
          </th>
          <th
            class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200"
          >
            Created At
          </th>
        </tr>
        <tr
          v-for="(item, i) in patients"
          :key="i"
          class="bg-gray-100 my-6 text-sm font-normal cursor-pointer"
          @click="patientInfo(item.id)"
        >
          <td class="p-3">{{ item.id }}</td>
          <td class="p-3">{{ item.name }}</td>
          <td class="p-3">{{ item.mobile }}</td>
          <td class="p-3">{{ item.appointments.length }}</td>
        </tr>
        <tr>
          <td v-if="!patients.length">No patients Yet</td>
        </tr>
      </tbody>
    </table>
    <div class="pagination flex justify-between outline-none">
      <div class="flex mb-6 items-center">
        <button
          v-if="maxPage <= totalPages && currentPage > Math.ceil(maxPage / 2)"
          class="w-10 h-5 mr-2"
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
          v-if="
            maxPage <= totalPages &&
            currentPage <= totalPages - Math.ceil(maxPage / 2)
          "
          class="w-10 h-5 mr-2"
          @click="lastPage()"
        >
          last
        </button>
      </div>
      <div v-if="patients.length" class="nextprev flex">
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
import { patients } from '@/apollo/queries/patient/patients.gql'
export default {
  name: 'PatientsPage',
  data() {
    return {
      addBtnIcon: '/plus-circle.svg',
      totalItem: 0,
      patients: [],
      perPage: 5,
      totalPages: 0,
      pages: [],
      start: 0,
      currentPage: 1,
      maxPage: 5,
      startPage: 0,
      endPage: 0,
      patient: null,
    }
  },
  computed: {},
  mounted() {
    this.fetchPatients()
    this.fetchTotalPatientCount()
  },
  methods: {
    addPatient() {
      this.modal = true
    },
    newPatient(val) {
      if (val) {
        this.patients.unshift(val)
      }
      this.modal = false
    },
    patientInfo(id) {
      this.$router.push(`/patients/${id}`)
    },
    async fetchPatients() {
      this.$store.commit('SET_LOADING')
      const { data } = await this.$apollo.query({
        query: patients,
        variables: {
          limit: this.perPage,
          start: this.start,
        },
      })
      this.patients = data.patients
      this.$store.commit('UNSET_LOADING')
      this.pagination()
    },
    async fetchTotalPatientCount() {
      this.totalItem = await this.$axios.$get(
        'http://localhost:1337/patients/count'
      )
      this.pagination()
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
      } else if (
        this.currentPage >= Math.ceil(this.maxPage / 2) &&
        this.totalPages > this.maxPage
      ) {
        if (this.currentPage <= this.totalPages - 1) {
          this.startPage = this.currentPage - Math.floor(this.maxPage / 2)
          if (this.startPage === 0) {
            this.startPage = 1
          }
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
      } else if (this.currentPage <= Math.ceil(this.maxPage / 2)) {
        this.startPage = 1
        this.endPage = this.maxPage
        const newPages = []
        for (let i = this.startPage; i <= this.endPage; i++) {
          newPages.push(i)
          this.pages = newPages
        }
      }

      if (this.currentPage === this.totalPages) {
        this.startPage = this.totalPages - (this.maxPage - 1)
        if (this.startPage <= 0) {
          this.startPage = 1
        }
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
      this.fetchPatients()
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
#notification-page {
  .add-btn {
    width: 180px;
    height: 37px;
    img {
      width: 20px;
      height: 20px;
    }
  }
  .notification-list {
    border-spacing: 0 1.5em;
    width: 90%;
    th {
      text-align: left;
      font-weight: normal;
    }
  }
  button {
    outline: none;
  }
}
</style>