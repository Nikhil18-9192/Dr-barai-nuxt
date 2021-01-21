<template>
  <div id="appointment">
    <AppointmentTitle :appointment-info="appointmentInfo" :patient="patient" />
    <Prescription :prescription="prescription" />
    <VitalSigns v-model="vitalSigns" />
    <ClinicalNotes v-model="clinicalNotes" />
    <Files :images="files" />
    <MyButton @click.native="submit">Submit</MyButton>
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
      this.$store.commit('SET_LOADING')
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
        this.appointmentInfo.date = formatDateTime.formatDate(result.date)
        this.appointmentInfo.time = formatDateTime.formatTime(result.date)
        this.appointmentInfo.name = result.patient.name
        this.$store.commit('UNSET_LOADING')
      } catch (e) {
        this.$toast.error(e.message)
      }
    },
    submit() {
      console.log(this.vitalSigns, this.clinicalNotes, this.prescription)
    },
  },
}
</script>

<style lang="scss" scopped>
.add-btn {
  width: 185px;
  height: 37px;
}
</style>
