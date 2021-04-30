<template>
  <div id="appointment">
    <CashMemoModal
      v-if="memoModal"
      @dismiss="memoModal = false"
      :products="products"
      :patient="patient"
      :prescriptions="prescription"
    />
    <AppointmentTitle
      :appointment-info="appointmentInfo"
      :patient="patient"
      @updatedPatient="updatedData"
    />
    <div class="cash-memo flex sm:justify-end">
      <MyButton :loading="loading" class="mb-4" @click.native="memoModal = true"
        >Generate Memo</MyButton
      >
    </div>
    <!-- <div class="title-container flex mt-6">
      <h1 class="text-xl font-medium">Products</h1>
      <AddButton @click.native="showProductSelector = !showProductSelector" />
    </div>
    <ProductSelector
      v-if="showProductSelector"
      class="my-4"
      v-model="nativeProducts"
    /> -->
    <Products v-model="products" class="my-4" />
    <br />
    <VitalSigns v-model="vitalSigns" />
    <br />
    <ClinicalNotes v-model="clinicalNotes" />
    <br />
    <Files v-model="files" class="mb-6" @deleteFile="initImageDelete" />

    <div v-if="consentDoc" class="consent my-8">
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

    <Prescription v-model="prescription" />
    <br />
    <MyButton :loading="loading" class="mb-4" @click.native="submit"
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
      sanitizedProduct: [],
      vitalSigns: {},
      clinicalNotes: {},
      files: [],
      currentFiles: [],
      patient: {},
      loading: false,
      consentDoc: false,
      nativeProducts: [],
      showProductSelector: true,
      memoModal: false,
      products: [],
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
        this.products = result.nativeProducts
        this.patient = result.patient
        this.prescription = result.prescription
        this.vitalSigns = result.vitalSigns
        this.clinicalNotes = result.clinicalNotes
        for (const i in result.files) {
          // eslint-disable-next-line
          this.currentFiles.push(result.files[i])
          this.files.push(result.files[i])
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
        this.sanitizedProduct = this.products.map((item) => ({
          product: item.product.id,
          quantity: item.quantity,
          frequency: item.frequency,
        }))

        await this.$axios.$put(`/appointments/${this.$route.params.id}`, {
          prescription: this.sanitizedPrescription,
          vitalSigns: this.vitalSigns,
          clinicalNotes: this.clinicalNotes,
          // nativeProducts: this.nativeProducts.map((p) => ({
          //   product: p.product.id,
          //   quantity: p.quantity,
          // })),
          nativeProducts: this.sanitizedProduct,
        })

        this.$toast.success('Appointment updated.')
        this.$router.go(-1)
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

<style lang="scss" scoped>
.add-btn {
  width: 185px;
  height: 37px;
}
</style>
