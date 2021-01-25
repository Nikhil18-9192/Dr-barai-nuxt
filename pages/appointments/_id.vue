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

    <Files class="mt-6" v-model="files" />
    <ProductSelector v-model="nativeProducts" />
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
    <ConsentView
      v-else
      :patient-id="patient.id"
      class="my-4"
      @onConsentSigned="onConsentSigned"
    />
    <MyButton :loading="loading" @click.native="submit" class="mb-4 mt-8"
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
      nativeProducts: [],
      consentBlob: false,
    }
  },
  mounted() {
    this.fetchAppointment()
  },
  methods: {
    onConsentSigned(blob) {
      this.consentBlob = blob
    },
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
          this.currentFiles.push(result.files[i].id)
          this.files.push(result.files[i].url)
        }
        this.nativeProducts = result.nativeProducts ? result.nativeProducts : []
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
        if (this.files.length) {
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
          nativeProducts: this.nativeProducts.map((p) => ({
            product: p.product.id,
            quantity: p.quantity,
          })),
        })

        if (this.consentBlob) {
          await this.uploadConsentFileAsync()
        }
        this.$toast.success('Appointment updated successfully')
        this.$router.push('/appointments')
      } catch (error) {
        this.$toast.error(error.message)
      }
      this.loading = false
    },

    uploadConsentFileAsync() {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve, reject) => {
        const data = {
          ref: 'appointments',
          field: 'consent',
          refId: this.$route.params.id,
        }
        const fd = new FormData()
        fd.append(
          'files.consent',
          this.consentBlob,
          `${this.$route.params.id}.pdf`
        )

        fd.append('data', JSON.stringify(data))
        try {
          const res = await this.$axios.$put(
            `/appointments/${this.$route.params.id}`,
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
.add-btn {
  width: 185px;
  height: 37px;
}
</style>
