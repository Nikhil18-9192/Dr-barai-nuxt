<template>
  <div id="consent-view">
    <ConsentFormDialog v-if="consentDialog" @dismiss="formDismiss" />
    <ConsentSignatureDialog
      v-if="signDialog"
      :patient-id="patientId"
      :consent-data="consentData"
      @dismiss="onDismissSignDialog"
    />
    <div class="flex items-center">
      <h4 class="mr-3 text-black-600 text-lg font-medium">Patient Consent</h4>
      <img src="/pencil-alt.svg" @click="showConsentForm" />
    </div>
    <div v-if="consentData" class="collapse-view relative">
      <span>
        <p>Date :</p>
        <p class="text-blue-600">{{ consentData.consentDate }}</p>
      </span>
      <span>
        <p>Dr. Name :</p>
        <p class="text-blue-600">{{ consentData.drName }}</p>
      </span>
      <span>
        <p>Disease :</p>
        <p class="text-blue-600">{{ consentData.disease }}</p>
      </span>
      <div
        class="consent-action absolute top-1 right-2 cursor-pointer"
        @click="signDialog = true"
      >
        <p v-if="blob.size > 15150" class="text-sm text-green-500 m-w-10">
          Consent Signed
        </p>
        <p v-else class="text-sm text-blue-600">Take Signature</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConsentView',
  // eslint-disable-next-line vue/require-prop-types
  props: ['patientId'],
  data() {
    return {
      consentDialog: false,
      consentData: false,
      signDialog: false,
      blob: false,
    }
  },
  methods: {
    onDismissSignDialog(val) {
      this.signDialog = false
      this.blob = val
      if (val) {
        this.$emit('onConsentSigned', val)
      }
    },
    showConsentForm() {
      if (this.patientId) {
        this.consentDialog = true
      } else {
        this.$toast.warning('Patient not selected')
      }
    },
    formDismiss(consentData) {
      this.consentDialog = false
      if (consentData) {
        this.consentData = consentData
        this.signDialog = true
      }
    },
  },
}
</script>

<style lang="scss" scoped>
#consent-view {
  width: 100%;
  position: relative;

  .collapse-view {
    background: rgb(235, 235, 235);
    width: 50%;
    @include for-phone-only {
      width: 100%;
    }
    span {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      padding: 8px;
      font-size: 14px;

      p {
        margin-right: 12px;
      }
    }
  }
}
</style>
