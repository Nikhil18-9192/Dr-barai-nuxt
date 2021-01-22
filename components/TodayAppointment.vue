<template>
  <div id="today-appointment">
    <h1 class="text-2xl font-bold text-gray-500 pb-6">Today's Appointment</h1>
    <div class="list bg-gray-50 border border-gray-300 rounded-xl">
      <div class="container mt-4">
        <div
          v-for="(appointment, i) in appointments"
          :key="i"
          class="container py-3 px-6"
        >
          <p class="text-gray-500 text-sm mb-1">{{ appointment.time }}</p>
          <h2 class="name text-xl capitalize font-normal">
            {{ appointment.patient.name }}
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      appointments: [
        {
          time: '11:15 AM',
          patient: {
            name: ' Elon musk',
          },
        },
        {
          time: '11:16 AM',
          patient: {
            name: 'Mr.Smith',
          },
        },
        {
          time: '11:18 AM',
          patient: {
            name: 'John Smith',
          },
        },
        {
          time: '12:15 PM',
          patient: {
            name: 'Jane Smith',
          },
        },
        {
          time: '01:35 PM',
          patient: {
            name: 'John Jon',
          },
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
#today-appointment {
  .list {
    width: 350px;
    min-height: 65vh;
    overflow-y: scroll;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
    @include for-phone-only {
      width: 300px;
    }
  }
  .name {
    padding-bottom: 10px;
    border-bottom: 1px solid #969696;
  }
}
</style>
