<template>
  <div id="consent-view">
    <ConsentFormDialog v-if="consentDialog" @dismiss="formDismiss" />
    <ConsentSignatureDialog v-if="signDialog" :consentData="consentData" />
    <div class="flex items-center">
      <h4 class="mr-3 text-black-600 text-lg font-medium">Patient Consent</h4>
      <img src="/pencil-alt.svg" @click="consentDialog = true" />
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
        class="consent-action text-sm text-blue-600 absolute top-1 right-2 cursor-pointer"
        @click="signDialog = true"
      >
        Take Signature
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConsentView',
  data() {
    return {
      consentDialog: false,
      consentData: false,
      signDialog: false,
    }
  },
  methods: {
    formDismiss(consentData) {
      this.consentDialog = false
      if (consentData) {
        this.consentData = consentData
      }
    },
  },
}
</script>

<style lang="scss" scopped>
#consent-view {
  width: 100%;
  position: relative;

  .collapse-view {
    background: rgb(235, 235, 235);

    span {
      display: flex;
      align-items: center;
      padding: 8px;
      font-size: 12px;

      p {
        margin-right: 12px;
      }
    }
  }
}
</style>
