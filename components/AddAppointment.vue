<template>
  <div id="new-appointment">
    <h1 class="my-10 text-lg font-medium">Create New Appointment</h1>

    <div class="form flex flex-col">
      <label for="name" class="w-50 text-sm font-normal text-gray-400 my-1"
        >Name</label
      >
      <model-select
        v-model="patientId"
        :options="patients"
        placeholder="Search Patient"
      />
      <label for="date" class="text-sm font-normal text-gray-400 mt-3"
        >Date</label
      >
      <input
        type="date"
        :value="getDate()"
        class="border rounded border-gray-300 p-2 w-6/12 mt-1 mb-2 outline-none"
      />
      <label for="time" class="text-sm font-normal text-gray-400 mt-3"
        >Time</label
      >
      <input
        type="time"
        :value="getTime()"
        class="border rounded border-gray-300 p-2 w-6/12 mt-1 mb-2 outline-none"
      />
    </div>
  </div>
</template>

<script>
import { getPatientNames } from '@/apollo/queries/patient/patients.gql'
import { ModelSelect } from 'vue-search-select'
export default {
  name: 'NewAppointmentPage',
  components: {
    ModelSelect,
  },
  data() {
    return {
      patientId: false,
      patients: [
        {
          value: false,
          text: 'Loading...',
        },
      ],
    }
  },
  created() {
    this.fetchPaitents()
  },

  methods: {
    async fetchPaitents() {
      this.patients = []
      try {
        const { data } = await this.$apollo.query({
          query: getPatientNames,
        })

        for (let i = 0; i < data.patients.length; i++) {
          const obj = {}
          obj.value = data.patients[i].id
          obj.text = data.patients[i].name
          this.patients.push(obj)
        }
      } catch (error) {
        const obj = {}
        obj.value = false
        obj.text = error.message
        this.patients.push(obj)
      }
    },
    getDate() {
      const date = new Date()
      const day = date.getDate()
      const month = date.getMonth() + 1
      const year = date.getFullYear()

      const today = year + '-' + month + '-' + day

      return today
    },
    getTime() {
      const date = new Date()

      const hour = date.getHours()
      const min = String(date.getMinutes()).padStart(2, 0)
      const now = hour + ':' + min
      return now
    },
  },
}
</script>

<style lang="scss" scoped>
#new-appointment {
  margin-bottom: 55px;
  .ui.fluid.dropdown {
    width: 50%;
  }
}
</style>
