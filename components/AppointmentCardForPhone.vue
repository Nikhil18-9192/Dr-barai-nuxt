<template>
  <div id="appointment-info">
    <div
      v-for="(item, i) in cardInfo"
      :key="i"
      class="card p-4 mb-4 border cursor-pointer"
      @click="onAppointmentClick(item.id)"
    >
      <p class="text-gray-600 text-xs font-normal border-b mb-3">
        Name:
        <span class="text-blue-600 text-base">{{ item.patient.name }}</span>
      </p>
      <p class="text-gray-600 text-xs font-normal">
        Mobile : {{ item.patient.mobile }}
      </p>
      <p class="text-gray-600 text-xs font-normal">
        Date and Time :
        {{
          formatter.formatDate(item.date) +
          ' at ' +
          formatter.formatTime(item.date)
        }}
      </p>
    </div>
  </div>
</template>

<script>
import formatDateTime from '@/utils/formatDateTime'
export default {
  props: {
    cardInfo: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    formatter() {
      return formatDateTime
    },
  },
  methods: {
    onAppointmentClick(id) {
      this.$router.push(`/appointments/${id}`)
    },
  },
}
</script>
<style lang="scss" scoped></style>
