<template>
  <div id="new-appointment">
    <AddAppointment v-model="patientInfo" class="new" />
    <Prescription v-model="prescriptionInfo" />
    <VitalSigns v-model="vitalSignInfo" />
    <ClinicalNotes v-model="clinicalNoteInfo" class="new" />
    <Files v-model="files" class="new mb-4" />
    <ConsentView
      :patient-id="patientInfo.selectedPatientId || 0"
      class="mb-4"
      @onConsentSigned="onConsentSigned"
    />
    <MyButton :loading="loading" @click.native="submitAppointment"
      >Submit</MyButton
    >
  </div>
</template>

<script>
export default {
  name: 'CreateAppointmentPage',
  data() {
    return {
      prescriptionInfo: [],
      vitalSignInfo: {},
      clinicalNoteInfo: {},
      patientInfo: {},
      files: [],
      loading: false,
      appointmentId: false,
      sanitizedPrescription: [],
      consentBlob: false,
    }
  },
  methods: {
    onConsentSigned(blob) {
      this.consentBlob = blob
    },
    async submitAppointment() {
      if (!this.patientInfo.selectedPatientId) {
        this.$toast.error('Select Patient')
        return
      }
      try {
        this.loading = true
        this.sanitizedPrescription = this.prescriptionInfo.map((item) => ({
          drug: item.drug.id,
          frequency: item.frequency,
        }))
        const response = await this.$axios.$post(`/appointments`, {
          patient: this.patientInfo.selectedPatientId,
          startDateTime: this.$dayjs(
            this.patientInfo.sessionDate + this.patientInfo.sessionTime
          ),
          prescription: this.sanitizedPrescription,
          vitalSigns: this.vitalSignInfo,
          clinicalNotes: this.clinicalNoteInfo,
        })
        this.appointmentId = response.id
        if (this.files.length) {
          const data = {
            ref: 'appointments',
            field: 'files',
            refId: this.appointmentId,
          }
          const fd = new FormData()
          for (let i = 0; i < this.files.length; i++) {
            const file = this.files[i]
            fd.append(`files.files`, file.images, file.images.name)
          }

          fd.append('data', JSON.stringify(data))
          await this.$axios.$put(`/appointments/${this.appointmentId}`, fd, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
        }
        if (this.consentBlob) {
          await this.uploadConsentFileAsync()
        }
        this.$toast.success('Appointment add successfully')
        this.$router.push('/appointments')
      } catch (error) {
        this.$toast.error(error.message)
        this.loading = false
      }
      this.loading = false
    },

    uploadConsentFileAsync() {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve, reject) => {
        const data = {
          ref: 'appointments',
          field: 'consent',
          refId: this.appointmentId,
        }
        const fd = new FormData()
        fd.append(
          'files.consent',
          this.consentBlob,
          `${this.appointmentId}.pdf`
        )

        fd.append('data', JSON.stringify(data))
        try {
          const res = await this.$axios.$put(
            `/appointments/${this.appointmentId}`,
            fd,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          )
          resolve(res)
        } catch (error) {
          if (error.response) {
            this.$toast.error(error.response.data.message)
          }
          reject(error)
        }
      })
    },
  },
}
</script>

<style lang="scss" scopped>
#new-appointment {
  .add-btn {
    width: 187px;
    height: 37px;
  }
}
</style>
