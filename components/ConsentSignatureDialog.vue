<template>
  <div
    id="consent-signature"
    class="w-screen h-screen fixed top-0 left-0 z-10 bg-white bg-opacity-70"
  >
    <img id="sign-img" src="/signature.png" style="display: none" />

    <div class="w-full h-full dlg relative flex flex-col">
      <div class="tlbr w-full bg-gray-100 p-3">
        <h4 class="text-center">Consent Signature</h4>
      </div>
      <div class="content max-h-full overflow-y-scroll bg-white p-4">
        <p class="text-sm">
          Date:
          {{ $dayjs(consentData.consentDate).format('DD-MM-YYYY hh:mm A') }}
        </p>
        <p class="text-sm mb-8">Place: Kolhapur</p>
        <div
          v-for="(policy, i) in consentPolicies"
          :key="`policy-${i}`"
          class="pol"
        >
          <p v-html="policy"></p>
          <br />
        </div>
        <div class="signature w-full">
          <div class="btns">
            <span class="text-sm">Signature Box-</span>
            <p
              class="text-red-400 text-sm float-right cursor-pointer"
              @click="signaturePad.clear()"
            >
              Clear
            </p>
          </div>
          <canvas id="sign-canvas" class="w-full border min-h-400"></canvas>
        </div>
      </div>
      <div class="action w-full bg-gray-100 flex items-center p-2">
        <MyButton @click.native="submitConsent">Submit</MyButton>
        <MyButton class="ml-4" :secondary="true">Cancel</MyButton>
      </div>
    </div>
  </div>
</template>

<script>
import { generateConsentText } from '@/utils'
import SignaturePad from 'signature_pad'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
pdfMake.vfs = pdfFonts.pdfMake.vfs
export default {
  name: 'ConsentSignatureDialog',
  props: ['consentData'],
  data() {
    return {
      signaturePad: false,
    }
  },
  computed: {
    consentPolicies() {
      return generateConsentText(this.consentData)
    },
  },
  mounted() {
    const c = document.getElementById('sign-canvas')
    this.signaturePad = new SignaturePad(c)
  },
  methods: {
    doctorsSignature() {
      const imgToExport = document.getElementById('sign-img')
      const canvas = document.createElement('canvas')
      canvas.width = imgToExport.width
      canvas.height = imgToExport.height
      canvas.getContext('2d').drawImage(imgToExport, 0, 0)
      return canvas.toDataURL('image/png')
    },
    submitConsent() {
      const parsedPolicies = this.consentPolicies.map((p) => ({
        text: p.replaceAll('<strong>', '').replaceAll('</strong>', ''),
        margin: 8,
      }))

      const data = this.signaturePad.toDataURL()
      const docDefinition = {
        content: [
          ...parsedPolicies,

          {
            image: this.doctorsSignature(),
            width: 150,
          },

          {
            image: data,
            width: 150,
          },
        ],
      }

      pdfMake.createPdf(docDefinition).open()
    },
  },
}
</script>

<style lang="scss" scopped>
.content {
  flex-grow: 1;
}
</style>
