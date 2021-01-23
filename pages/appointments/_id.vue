<template>
  <div id="appointment">
    <AppointmentTitle
      :appointment-info="appointmentInfo"
      :patient="patient"
      @updatedPatient="updatedData"
    />
    <Prescription :prescription="prescription" />
    <VitalSigns v-model="vitalSigns" />
    <ClinicalNotes v-model="clinicalNotes" />
    <Files :images="files" @uploadImages="newImages" />
    <MyButton :loading="loading" @click.native="submit">Submit</MyButton>
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
      newFiles: [],
      currentFiles: [],
      loading: false,
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
        for (const i in result.files) {
          // eslint-disable-next-line
          this.currentFiles.push(result.files[i].id)
          this.files.push(result.files[i].url)
        }
        this.appointmentInfo.date = formatDateTime.formatDate(result.date)
        this.appointmentInfo.time = formatDateTime.formatTime(result.date)
        this.appointmentInfo.name = result.patient.name
        this.$store.commit('UNSET_LOADING')
      } catch (e) {
        this.$toast.error(e.message)
      }
    },
    updatedData(val) {
      this.patient = val
      this.appointmentInfo.name = val.name
    },
    newImages(val) {
      this.newFiles = val.images
      this.files = [...this.files, ...val.urls]
    },
    async submit() {
      try {
        this.loading = true
        if (this.newFiles.length) {
          const data = new FormData()
          for (let i = 0; i < this.newFiles.length; i++) {
            data.append(`files`, this.newFiles[i])
          }
          data.append('ref', 'appointments')
          data.append('refId', this.$route.params.id)
          const res = await this.$axios.$post(`/upload`, data, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          for (const i in res) {
            this.currentFiles.push(res[i].id)
          }
        }
        await this.$axios.$put(`/appointments/${this.$route.params.id}`, {
          prescription: this.prescription,
          vitalSigns: this.vitalSigns,
          clinicalNotes: this.clinicalNotes,
          files: this.currentFiles,
        })
        this.loading = false
        this.$toast.success('Appointment updated successfully')
      } catch (error) {
        this.$toast.error(error.message)
        this.loading = false
      }
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
