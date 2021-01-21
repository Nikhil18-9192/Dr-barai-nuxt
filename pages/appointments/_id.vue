<template>
  <div id="appointment">
    <AppointmentTitle :appointment-info="appointmentInfo" :patient="patient" />
    <Prescription :prescription="prescription" />
    <VitalSigns :vitals="vitalSigns" />
    <ClinicalNotes :clinical-notes="clinicalNotes" />
    <Files :images="files" />
  </div>
</template>

<script>
import query from '@/apollo/queries/appointment/appointment.gql'
import formatDateTime from '@/utils/formatDateTime'
export default {
  data() {
    return {
      appointmentInfo: {
        date: '',
        time: '',
        name: '',
      },
      prescription: [],
      vitalSigns: {},
      clinicalNotes: {},
      files: [],
      patient: {},
    }
  },
  mounted() {
    this.fetchAppointment()
  },
  methods: {
    async fetchAppointment() {
      const id = this.$route.params.id

      try {
        const { data } = await this.$apollo.query({
          query,
          variables: {
            id,
          },
        })
        const result = data.appointment
        this.patient = result.patient
        this.prescription = result.prescription
        this.vitalSigns = result.vitalSigns
        this.clinicalNotes = result.clinicalNotes
        this.files = result.files
        this.appointmentInfo.date = formatDateTime.formatDate(
          result.startDateTime
        )
        this.appointmentInfo.time = formatDateTime.formatTime(
          result.startDateTime
        )
        this.appointmentInfo.name = result.patient.name
      } catch (e) {
        this.$toast.error(e.message)
      }
    },
  },
}
</script>

<style></style>
