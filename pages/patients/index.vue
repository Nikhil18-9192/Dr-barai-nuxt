<template>
  <div id="patient-page">
    <AddPatientDialog
      v-if="$store.state.patientModal"
      @dismiss="$store.commit('togglePatientModal')"
      @patientData="newPatient"
    />
    <DeleteConfirmation
      v-if="confirm == true"
      @dismiss="confirm = false"
      @confirm="deleteEntry"
    />
    <div class="title flex justify-between my-8">
      <h1 class="text-xl sm:text-2xl font-medium mb-4">Patient List</h1>
      <MyButton
        :icon="addBtnIcon"
        @click.native="$store.commit('togglePatientModal')"
        >Add New Patient</MyButton
      >
    </div>

    <table
      v-if="$device.isDesktopOrTablet"
      class="patient-list border-separate"
    >
      <tbody>
        <tr class="text-gray-600 text-sm font-normal">
          <th
            class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200"
          >
            Profile
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
          class="bg-gray-100 my-6 text-sm font-normal cursor-pointer"
          @click="patientInfo(item.id)"
        >
          <td class="py-3 pl-3">
            <img
              v-if="item.profile"
              class="profile-img"
              :src="item.profile ? item.profile.url : ''"
              alt=""
            />
            <img
              v-else
              class="profile-img"
              src="/profile-placeholder.jpg"
              alt=""
            />
          </td>
          <td class="py-3">{{ item.name }}</td>
          <td class="py-3">{{ item.mobile }}</td>
          <td class="py-3">{{ item.appointments.length }}</td>
          <td class="relative">
            <img
              class="delete-btn absolute right-4 top-8 hidden"
              src="/delete_btn.svg"
              alt=""
              @click.stop="confirmation(item)"
            />
          </td>
        </tr>
        <tr>
          <td v-if="!patients.length">No patients Yet</td>
        </tr>
      </tbody>
    </table>
    <div v-if="$device.isMobile" id="info">
      <div
        v-for="(item, i) in patients"
        :key="i"
        class="relative card p-4 mb-4 border cursor-pointer rounded-lg shadow-lg"
        @click="patientInfo(item.id)"
      >
        <div class="profile">
          <img
            v-if="item.profile"
            class="profile-phone"
            :src="item.profile ? item.profile.url : ''"
            alt=""
          />
          <img
            v-else
            class="profile-phone"
            src="/profile-placeholder.jpg"
            alt=""
          />
        </div>
        <p class="text-gray-600 text-xs font-normal border-b mb-3">
          Name: <span class="text-blue-600 text-base">{{ item.name }}</span>
        </p>
        <p class="text-gray-600 text-xs font-normal">
          Mobile : {{ item.mobile }}
        </p>
        <p class="text-gray-600 text-xs font-normal">
          Session Count : {{ item.appointments.length }}
        </p>
        <img
          class="delete-btn absolute right-4 top-4"
          src="/delete_btn.svg"
          alt=""
          @click.stop="confirmation(item)"
        />
      </div>
    </div>
    <div v-if="patients.length" class="pagination flex justify-between">
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
import { patients } from '@/apollo/queries/patient/patients.gql'
export default {
  name: 'PatientsPage',
  data() {
    return {
      confirm: false,
      patientToDelete: false,
      addBtnIcon: '/plus-circle.svg',
      totalItem: 0,
      modal: false,
      patients: [],
      perPage: 10,
      totalPages: 0,
      currentPage: 1,
      maxPage: 5,
      patient: null,
    }
  },
  computed: {},
  mounted() {
    this.fetchPatients()
    this.fetchTotalPatientCount()
  },
  methods: {
    confirmation(patient) {
      this.patientToDelete = patient
      this.confirm = true
    },
    async deleteEntry() {
      try {
        const res = await this.$axios.delete(
          `/patients/${this.patientToDelete.id}`
        )
        const index = this.patients.findIndex(
          (a) => a.id === this.patientToDelete.id
        )
        this.patients.splice(index, 1)
        this.$toast.success('Delete Patient successfully')
        this.confirm = false
      } catch (error) {
        this.$toast.error(error.message)
      }
    },
    async clickCallback(selectedPage) {
      this.currentPage = selectedPage
      const { data } = await this.$apollo.query({
        query: patients,
        variables: {
          limit: this.perPage,
          start: selectedPage * this.perPage - this.perPage,
        },
      })
      this.patients = data.patients
    },
    next() {
      this.currentPage++
      if (this.currentPage > this.totalPages) {
        this.$toast.error('no pages')
        this.currentPage = this.totalPages
      }
      this.fetchPatients()
    },
    prev() {
      this.currentPage--
      if (this.currentPage === 0) {
        this.$toast.error('no pages')
        this.currentPage = 1
      }
      this.fetchPatients()
    },
    async fetchPatients() {
      this.$store.commit('SET_LOADING')
      const { data } = await this.$apollo.query({
        query: patients,
        variables: {
          limit: this.perPage,
          start: this.currentPage * this.perPage - this.perPage,
        },
      })
      this.patients = data.patients
      this.$store.commit('UNSET_LOADING')
    },
    async fetchTotalPatientCount() {
      this.totalItem = await this.$axios.$get('/patients/count')
      this.totalPages = Math.ceil(this.totalItem / this.perPage)
    },
    newPatient(val) {
      console.log(val)
      if (val) {
        this.patients.unshift(val)
      }
      this.modal = false
    },
    patientInfo(id) {
      this.$router.push(`/patients/${id}`)
    },
  },
}
</script>

<style lang="scss" scoped>
#patient-page {
  .title {
    @include for-phone-only {
      flex-direction: column;
    }
  }
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
    table-layout: fixed;
    th {
      text-align: left;
      font-weight: normal;
    }
    tr {
      &:hover {
        .delete-btn {
          display: block;
        }
      }
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
  }
  .profile-img {
    height: 60px;
    width: 60px;
    border-radius: 50%;
    object-fit: cover;
  }
  .profile-phone {
    height: 60px;
    width: 60px;
    border-radius: 50%;
    object-fit: cover;
    margin: 0 auto;
  }
}
</style>
