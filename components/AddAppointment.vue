<template>
  <div id="new-appointment">
    <h1 class="my-10 text-lg font-medium">Create New Appointment</h1>
    <div class="form flex flex-col">
      <label for="name" class="w-50 text-sm font-normal text-gray-400 mt-3"
        >Name</label
      >
      <select
        v-model="patientName"
        class="border rounded border-gray-300 p-2 w-6/12 mt-1 mb-2 outline-none text-gray-400"
      >
        <option disabled value="Search Patient">Search Patient</option>
        <option v-for="patient in patients" :key="patient" :value="patient">
          {{ patient }}
        </option>
      </select>
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
export default {
  name: 'NewAppointmentPage',

  data() {
    return {
      patientName: 'Search Patient',
    }
  },

  methods: {
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
      const min = date.getMinutes()
      const now = hour + ':' + min
      return now
    },
  },
}
</script>

<style lang="scss" scoped>
#new-appointment {
  margin-bottom: 55px;
}
</style>
