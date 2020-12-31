<template>
  <div id="patient-page">
    <div v-for="item in patient" :key="item.id" class="patient-info my-8">
      <div class="name border-b pb-3 w-1/2">
        <h1 class="text-2xl font-medium capitalize">{{ item.name }}</h1>
        <p class="text-gray-400 text-sm font-normal">
          <span>{{ item.gender }}</span
          ><span class="mx-1">{{ age }} Years</span
          ><span>{{ item.bloodGroup }}ve</span>
        </p>
      </div>
      <div class="contact text-gray-400 text-sm font-normal mt-3">
        <p class="mb-2">Phone : +91 {{ item.mobile }}</p>
        <p>Address : {{ item.address }}</p>
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
            v-for="(appointment, i) in appointments"
            :key="i"
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
      totalItem: 0,
      patient: false,
      age: false,
      appointments: false,
      perPage: 5,
      totalPages: 0,
      pages: [],
      start: 0,
      currentPage: 1,
      maxPage: 5,
      startPage: 0,
      endPage: 0,
    }
  },
  mounted() {
    this.fetchPatient()
  },
  methods: {
    async fetchPatient() {
      const { data } = await this.$apollo.query({
        query,
        variables: {
          id: this.$route.params.id,
        },
      })
      this.patient = data.patients
      this.appointments = this.patient[0].appointments
      const birthday = +new Date(this.patient[0].birthDate)
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
}
</style>
