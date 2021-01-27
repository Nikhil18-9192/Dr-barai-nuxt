<template>
  <div id="patient-info">
    <div
      v-for="appointment in cardInfo.appointments"
      :key="appointment.id"
      class="card p-4 mb-4 border cursor-pointer"
      @click="routeToInfo(appointment.id)"
    >
      <p class="text-gray-600 text-xs font-normal border-b mb-3">
        Date:
        <span class="text-blue-600 text-base">{{
          formatter.formatDate(appointment.date)
        }}</span>
      </p>
      <p class="text-gray-600 text-xs font-normal">
        Time : {{ formatter.formatTime(appointment.date) }}
      </p>
      <p class="text-gray-600 text-xs font-normal">
        Reason :
        {{
          appointment.clinicalNotes !== null
            ? appointment.clinicalNotes.complaints
            : ''
        }}
      </p>
      <p class="text-gray-600 text-xs font-normal">
        Observation :
        {{
          appointment.clinicalNotes !== null
            ? appointment.clinicalNotes.observation
            : ''
        }}
      </p>
      <p class="text-gray-600 text-xs font-normal">
        Diagnoses :
        {{
          appointment.clinicalNotes !== null
            ? appointment.clinicalNotes.diagnoses
            : ''
        }}
      </p>
    </div>
  </div>
</template>

<script>
import formatDateTime from '@/utils/formatDateTime'
export default {
  // eslint-disable-next-line
  props: ['cardInfo'],
  computed: {
    formatter() {
      return formatDateTime
    },
  },
  methods: {
    routeToInfo(id) {
      this.$router.push(`/appointments/${id}`)
    },
  },
}
</script>
<style lang="scss" scopped></style>
