<template>
  <div id="appointment">
    <AppointmentTitle
      :appointment-info="appointmentInfo"
      :patient="patient"
      @updatedPatient="updatedData"
    />
    <Prescription v-model="prescription" />
    <VitalSigns v-model="vitalSigns" />
    <ClinicalNotes v-model="clinicalNotes" />
    <Files v-model="files" @deleteFile="initImageDelete" />
    <div v-if="consentDoc" class="consent mb-8">
      <h4 class="text-lg text-black font-500">
        Consent
        <a
          :href="consentDoc.url"
          class="ml-4 text-sm text-blue-600"
          target="_blank"
          >Download</a
        >
      </h4>
      <iframe :src="consentDoc.url" frameborder="0"></iframe>
    </div>
    <MyButton :loading="loading" class="mb-4 mt-8" @click.native="submit"
      >Submit</MyButton
    >
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
      sanitizedPrescription: [],
      vitalSigns: {},
      clinicalNotes: {},
      files: [],
      currentFiles: [],
      patient: {},
      loading: false,
      consentDoc: false,
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
          fetchPolicy: 'network-only',
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
          this.currentFiles.push(result.files[i])
          this.files.push(result.files[i])
        }
        this.consentDoc = result.consent ? result.consent : false
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
      this.$store.commit('UNSET_LOADING')
    },
    updatedData(val) {
      this.patient = val
      this.appointmentInfo.name = val.name
    },
    async submit() {
      try {
        this.loading = true
        if (this.files.length > this.currentFiles.length) {
          const data = {
            ref: 'appointments',
            field: 'files',
            refId: this.$route.params.id,
          }
          const fd = new FormData()

          for (let i = this.currentFiles.length; i < this.files.length; i++) {
            const file = this.files[i]
            fd.append(`files.files`, file.images, file.images.name)
          }

          fd.append('data', JSON.stringify(data))
          await this.$axios.$put(`/appointments/${this.$route.params.id}`, fd, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
        }
        this.sanitizedPrescription = this.prescription.map((item) => ({
          drug: item.drug.id,
          frequency: item.frequency,
        }))

        await this.$axios.$put(`/appointments/${this.$route.params.id}`, {
          prescription: this.sanitizedPrescription,
          vitalSigns: this.vitalSigns,
          clinicalNotes: this.clinicalNotes,
        })
        this.$toast.success('Appointment updated successfully')
        this.$router.push('/appointments')
      } catch (error) {
        this.$toast.error(error.message)
        this.loading = false
      }
      this.loading = false
    },
    async initImageDelete(imageId) {
      try {
        this.$store.commit('SET_LOADING')
        if (confirm('Are you sure? you want to delete this file.')) {
          await this.$axios.$delete(`/upload/files/${imageId}`)
          this.files = this.files.filter((obj) => obj.id !== imageId)
          this.currentFiles = this.currentFiles.filter(
            (obj) => obj.id !== imageId
          )
        } else {
          return this.$store.commit('UNSET_LOADING')
        }
        this.$store.commit('UNSET_LOADING')
      } catch (error) {
        this.$toast.error(error.message)
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
