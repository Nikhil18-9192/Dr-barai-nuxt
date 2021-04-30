<template>
  <div id="new-appointment my-4">
    <AddAppointment v-model="patientInfo" class="new" />
    <hr />

    <!-- <div class="title-container flex my-4 sm:mt-6">
      <h1 class="text-xl font-medium">Products</h1>
      <AddButton @click.native="showProductSelector = !showProductSelector" />
    </div>
    <ProductSelector
      v-if="showProductSelector"
      v-model="nativeProducts"
      class="my-4"
    />
    <hr /> -->
    <Products v-model="productInfo" class="my-4" />
    <hr />
    <VitalSigns v-model="vitalSignInfo" class="my-4" />
    <hr />
    <ClinicalNotes v-model="clinicalNoteInfo" class="new my-4" />
    <hr />
    <Files v-model="files" class="new my-4" />
    <hr />

    <hr />
    <Prescription v-model="prescriptionInfo" class="my-4" />
    <hr />
    <MyButton class="my-4" :loading="loading" @click.native="submitAppointment"
      >Submit</MyButton
    >
  </div>
</template>

<script>
export default {
  name: 'CreateAppointmentPage',
  data() {
    return {
      nativeProducts: [],
      prescriptionInfo: [],
      productInfo: [],
      vitalSignInfo: {},
      clinicalNoteInfo: {},
      patientInfo: {},
      files: [],
      loading: false,
      appointmentId: false,
      sanitizedPrescription: [],
      consentBlob: false,
      showProductSelector: false,
    }
  },
  methods: {
    async submitAppointment() {
      if (!this.patientInfo.selectedPatientId) {
        this.$toast.error('Select Patient')
        return
      }
      this.$store.commit('SET_LOADING')
      try {
        this.loading = true
        this.sanitizedPrescription = this.prescriptionInfo.map((item) => ({
          drug: item.drug.id,
          frequency: item.frequency,
        }))
        console.log('product info', this.productInfo)
        this.sanitizedProduct = this.productInfo.map((item) => ({
          product: item.product.id,
          quantity: item.quantity,
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
          // nativeProducts: this.nativeProducts.map((p) => ({
          //   product: p.product.id,
          //   quantity: p.quantity,
          // })),
          nativeProducts: this.sanitizedProduct,
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

        this.$toast.success('Done.')
        this.$router.go(-1)
      } catch (error) {
        this.$toast.error(error.message)
        this.loading = false
      }
      this.loading = false
      this.$store.commit('UNSET_LOADING')
    },
  },
}
</script>

<style lang="scss" scoped>
#new-appointment {
  hr {
    height: 0.5px;
    background: rgb(223, 223, 223);
    margin: 16px 0;
  }
}
.add-btn {
  width: 187px;
  height: 37px;
}
</style>
