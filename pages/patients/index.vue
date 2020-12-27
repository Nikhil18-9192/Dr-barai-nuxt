<template>
  <div id="patient-page">
    <AddPatientDialog v-if="modal" @dismiss="modal = false" />
    <div class="title flex justify-between my-8">
      <h1 class="text-2xl font-medium">Patient List</h1>
      <button
        class="bg-blue-500 rounded-md text-white text-sm font-medium add-btn flex items-center justify-center outline-none"
        @click="modal = true"
      >
        <img class="mr-3" src="/plus-circle.svg" alt="" />
        Add New Patient
      </button>
    </div>

    <table class="patient-list border-separate">
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
            Session Count
          </th>
        </tr>
        <tr
          v-for="(item, i) in patients"
          :key="i"
          class="bg-gray-100 my-6 text-sm font-normal"
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
      <div class="flex mb-6">
        <button
          v-for="item in pages"
          :key="item"
          :class="currentPage == item ? 'text-gray-900' : ''"
          class="p-1 mr-2 outline-none text-gray-400 font-normal"
          @click.prevent="paginatData(item)"
        >
          {{ item }}
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
// TODO: pageLimit , store cleanup, create button component
import query from '@/apollo/queries/patient/patients.gql'
export default {
  name: 'PatientsPage',
  data() {
    return {
      totalItem: 0,
      modal: false,
      patients: [],
      perPage: 7,
      totalPages: 0,
      pages: [],
      start: 0,
      currentPage: 1,
    }
  },
  computed: {},
  mounted() {
    this.fetchPatients()
    this.fetchTotalPatientCount()
  },
  methods: {
    async fetchPatients() {
      this.$store.commit('SET_LOADING')
      const { data } = await this.$apollo.query({
        query,
        variables: {
          limit: this.perPage,
          start: this.start,
        },
      })
      this.patients = data.patients
      this.$store.commit('SET_PATIENTS', this.patients)
      this.$store.commit('UNSET_LOADING')
    },
    async fetchTotalPatientCount() {
      this.totalItem = await this.$axios.$get(
        'http://localhost:1337/patients/count'
      )
      this.totalPages = Math.ceil(this.totalItem / this.perPage)
      for (let i = 1; i <= this.totalPages; i++) {
        this.pages.push(i)
      }
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
#patient-page {
  .add-btn {
    width: 180px;
    height: 37px;
    img {
      width: 20px;
      height: 20px;
    }
  }
  .patient-list {
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
