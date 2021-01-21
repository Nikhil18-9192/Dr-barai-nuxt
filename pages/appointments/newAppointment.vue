<template>
  <div id="new-appointment">
    <AddAppointment v-model="appointmentId" class="new" />
    <Prescription v-model="prescriptionInfo" class="new" />
    <VitalSigns v-model="vitalSignInfo" class="new" />
    <ClinicalNotes v-model="clinicalNoteInfo" class="new" />
    <Files v-model="files" class="new" />
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
      appointmentId: false,
      files: [],
      loading: false,
    }
  },
  methods: {
    async submitAppointment() {
      this.loading = true
      await this.$axios.$put(`/appointments/${this.appointmentId}`, {
        prescription: this.prescriptionInfo,
        vitalSigns: this.vitalSignInfo,
        clinicalNotes: this.clinicalNoteInfo,
        endDateTIme: new Date(),
      })
      if (this.files.length) {
        const data = {
          ref: 'appointments',
          field: 'files',
          refId: this.appointmentId,
        }
        const fd = new FormData()
        for (let i = 0; i < this.files.length; i++) {
          const file = this.files[i]

          fd.append(`files.files`, file, file.name)
        }

        fd.append('data', JSON.stringify(data))
        await this.$axios.$put(`/appointments/${this.appointmentId}`, fd, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      }
      this.loading = false
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
