<template>
  <div id="new-appointment">
    <h1 class="my-4 sm:my-10 text-lg font-medium">Create New Appointment</h1>
    <div class="container relative flex-none sm:flex">
      <div class="form flex flex-col w-full sm:w-6/12">
        <label for="name" class="w-50 text-sm font-normal text-gray-400 my-1"
          >Name</label
        >
        <model-select
          v-model="form.selectedPatientId"
          :options="patients"
          placeholder="Search Patient"
          autocomplete="on"
        />
        <label for="date" class="text-sm font-normal text-gray-400 mt-3"
          >Date</label
        >
        <input
          v-model="form.sessionDate"
          type="date"
          class="border rounded border-gray-300 p-2 mt-1 mb-2 outline-none"
        />
        <label for="time" class="text-sm font-normal text-gray-400 mt-3"
          >Time</label
        >
        <input
          v-model="form.sessionTime"
          type="time"
          class="border rounded border-gray-300 p-2 mt-1 mb-2 outline-none"
        />
      </div>
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
      form: {
        selectedPatientId: '',
        sessionDate: this.getDate(),
        sessionTime: this.getTime(),
      },
      patients: [
        {
          value: false,
          text: 'Loading...',
        },
      ],
    }
  },
  watch: {
    form: {
      handler(val) {
        this.$emit('input', val)
      },
      deep: true,
    },
  },
  beforeMount() {
    window.addEventListener('beforeunload', (event) => {
      event.preventDefault()
      // Chrome requires returnValue to be set.
      event.returnValue = ''
    })
  },
  created() {
    this.fetchPatients()
  },

  methods: {
    async fetchPatients() {
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
      return this.$dayjs().format('YYYY-MM-DD')
    },
    getTime() {
      return this.$dayjs().format('HH:mm')
    },
  },
}
</script>

<style lang="scss" scoped>
#new-appointment {
  position: relative;
  margin-bottom: 55px;
  .timer {
    right: 0;
    top: 0;
  }
  .session-btn {
    left: 50%;
    bottom: 0;
  }
}
</style>
