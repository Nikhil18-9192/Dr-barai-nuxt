<template>
  <div id="new-appointment">
    <h1 class="my-4 sm:my-10 text-lg font-medium">Create New Appointment</h1>
    <h2 class="timer sm:absolute text-6xl">{{ time }}</h2>
    <div class="container relative flex-none sm:flex">
      <div class="form flex flex-col w-full sm:w-6/12">
        <label for="name" class="w-50 text-sm font-normal text-gray-400 my-1"
          >Name</label
        >
        <model-select
          v-model="selectedPatientId"
          :options="patients"
          placeholder="Search Patient"
          autocomplete="on"
        />
        <label for="date" class="text-sm font-normal text-gray-400 mt-3"
          >Date</label
        >
        <input
          v-model="sessionDate"
          type="date"
          class="border rounded border-gray-300 p-2 mt-1 mb-2 outline-none"
        />
        <label for="time" class="text-sm font-normal text-gray-400 mt-3"
          >Time</label
        >
        <input
          v-model="sessionTime"
          type="time"
          class="border rounded border-gray-300 p-2 mt-1 mb-2 outline-none"
        />
      </div>

      <button
        v-if="!sessionStarted"
        class="session-btn relative sm:absolute bg-black rounded-md text-white text-sm font-medium ml-8 mb-2 p-3"
        @click="startSession()"
      >
        Start Session
      </button>
      <!-- <button
        v-if="sessionStarted"
        class="session-btn relative sm:absolute bg-red-500 rounded-md text-white text-sm font-medium ml-8 mb-2 p-3"
        @click="finishSession()"
      >
        Finish Session
      </button> -->
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
      appointmentId: false,
      sessionStarted: false,
      time: '00:00:00',
      interval: false,
      startTime: false,
      sessionDate: this.getDate(),
      sessionTime: this.getTime(),
      selectedPatientId: false,
      patients: [
        {
          value: false,
          text: 'Loading...',
        },
      ],
    }
  },
  beforeMount() {
    window.addEventListener('beforeunload', (event) => {
      event.preventDefault()
      // Chrome requires returnValue to be set.
      event.returnValue = ''
    })
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
      return this.$dayjs().format('YYYY-MM-DD')
    },
    getTime() {
      return this.$dayjs().format('HH:mm')
    },
    async startSession() {
      if (!this.selectedPatientId) {
        this.$toast.error('Please select a patient')
        return
      }

      const res = await this.$axios.$post('/appointments', {
        patient: this.selectedPatientId,
        startDateTime: this.$dayjs(
          this.sessionDate + this.sessionTime
        ).format(),
      })
      this.appointmentId = res.id
      this.$emit('input', this.appointmentId)
      this.startTime = Date.now()
      this.startTimer()
      this.sessionStarted = true
    },
    finishSession() {
      clearInterval(this.interval)
      this.time = '00:00:00'
      this.sessionStarted = false
    },
    startTimer() {
      const parent = this
      this.interval = setInterval(function () {
        const elaspsedTime = Date.now() - parent.startTime
        parent.formatTime(elaspsedTime)
      }, 1000)
    },

    formatTime(time) {
      const hour = time / 3600000
      const hh = Math.floor(hour)

      const min = (hour - hh) * 60
      const mm = Math.floor(min)

      const sec = (min - mm) * 60
      const ss = Math.floor(sec)

      const HH = hh.toString().padStart(2, '0')
      const MM = mm.toString().padStart(2, '0')
      const SS = ss.toString().padStart(2, '0')

      this.time = `${HH}:${MM}:${SS}`
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
