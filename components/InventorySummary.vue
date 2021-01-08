<template>
  <div id="inventory-summary">
    <div class="list relative border border-gray-300 rounded-xl mt-14">
      <div class="container py-3">
        <p class="title text-gray-400 text-center">Total Patients</p>
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
          time: '11.15',
          patient: {
            name: 'musk',
          },
        },
        {
          time: '11.16',
          patient: {
            name: 'musk',
          },
        },
        {
          time: '11.18',
          patient: {
            name: 'musk',
          },
        },
        {
          time: '12.15',
          patient: {
            name: 'musk',
          },
        },
        {
          time: '11.85',
          patient: {
            name: 'musk',
          },
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
#inventory-summary {
  .list {
    width: 350px;
    min-height: 65vh;
    overflow-y: scroll;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .title {
    padding-bottom: 10px;
    border-bottom: 1px solid #c4c4c4;
  }
}
</style>
