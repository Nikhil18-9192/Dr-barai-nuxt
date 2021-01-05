<template>
  <div id="patient-page">
    <AddPatientDialog
      v-if="modal"
      :patient="patient"
      @dismiss="patientUpdated"
    />
    <div v-if="patient" class="patient-profile flex my-8">
      <div class="patient-info w-2/4">
        <div class="name border-b pb-3 w-full">
          <h1 class="text-2xl font-medium capitalize">{{ patient.name }}</h1>
          <p class="text-gray-400 text-sm font-normal">
            <span>{{ patient.gender }}</span
            ><span class="mx-1">{{ age }} Years</span
            ><span>{{ patient.bloodGroup }}ve</span>
          </p>
        </div>
        <div class="contact text-gray-400 text-sm font-normal mt-3">
          <p class="mb-2">Phone : +91 {{ patient.mobile }}</p>
          <p>Address : {{ patient.address }}</p>
        </div>
      </div>
      <div class="btn-section flex flex-col items-end w-2/4">
        <MyButton class="mb-4" :icon="notifyBtnIcon">Notify</MyButton>
        <MyButton
          class="edit-btn"
          :icon="editBtnIcon"
          @click.native="modal = true"
          >Edit Profile</MyButton
        >
      </div>
    </div>

    <div class="appintment">
      <h4>Appointment History</h4>
      <table class="patient-list">
        <tbody>
          <tr class="text-gray-400 text-sm font-normal">
            <th
              class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200"
            >
              Date
            </th>
            <th
              class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200"
            >
              Time
            </th>
            <th
              class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200"
            >
              Reason
            </th>
            <th
              class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200"
            >
              Observation
            </th>
            <th
              class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200"
            >
              Diagnoses
            </th>
          </tr>
          <tr
            v-for="appointment in patient.appointments"
            :key="appointment.id"
            class="text-sm font-normal"
          >
            <td
              class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200"
            >
              {{ appointment.date }}
            </td>
            <td
              class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200"
            >
              {{ appointment.time }}
            </td>
            <td
              class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200"
            >
              {{ appointment.clinicalNotes.complaints }}
            </td>
            <td
              class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200"
            >
              {{ appointment.clinicalNotes.observations }}
            </td>
            <td
              class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200"
            >
              {{ appointment.clinicalNotes.diagnoses }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import query from '@/apollo/queries/patient/patient.gql'
export default {
  data() {
    return {
      modal: false,
      editBtnIcon: '/pencil-alt.svg',
      notifyBtnIcon: '/bell.svg',
      totalItem: 0,
      age: false,
      perPage: 5,
      totalPages: 0,
      pages: [],
      start: 0,
      currentPage: 1,
      maxPage: 5,
      startPage: 0,
      endPage: 0,
      patient: false,
    }
  },

  mounted() {
    this.fetchPatient()
  },
  methods: {
    patientUpdated(val) {
      if (val) {
        this.patient = val
      }
      this.modal = false
    },
    async fetchPatient() {
      const { data } = await this.$apollo.query({
        query,
        variables: {
          id: this.$route.params.id,
        },
      })
      this.patient = data.patient
      const birthday = +new Date(this.patient.birthDate)
      this.age = ~~((Date.now() - birthday) / 31557600000)
    },
  },
}
</script>

<style lang="scss" scopped>
#patient-page {
  .contact {
    max-width: 530px;
  }
  .patient-list {
    border-spacing: 0 1.5em;
    width: 90%;
    th {
      text-align: left;
      font-weight: normal;
    }
  }
  .btn-section {
    button {
      width: 133px;
      height: 37px;
    }
    .edit-btn {
      background: #f3f3f3;
      color: #52525b;
    }
  }
}
</style>