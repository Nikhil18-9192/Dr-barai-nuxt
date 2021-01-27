<template>
  <div
    id="consent-signature"
    class="w-screen fixed top-0 left-0 z-10 bg-white bg-opacity-70"
  >
    <img id="sign-img" src="/signature.png" style="display: none" />

    <div class="w-full h-full dlg relative flex flex-col">
      <div class="tlbr w-full h-15 bg-gray-100 p-3">
        <h4 class="text-center">Consent Signature</h4>
      </div>
      <div class="content flex-grow overflow-y-scroll bg-white p-6">
        <p class="text-sm">Patient Name: {{ patient.name }}</p>
        <p class="text-sm">Phone: {{ patient.mobile }}</p>
        <p class="text-sm">Address: {{ patient.address }}</p>
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
          <!-- eslint-disable-next-line -->
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
          <canvas id="sign-canvas" class="border"></canvas>
        </div>
      </div>
      <div class="action w-full h-20 bg-white pb-4 flex items-center">
        <MyButton @click.native="submitConsent">Submit</MyButton>
        <MyButton
          class="ml-4"
          :secondary="true"
          @click.native="$emit('dismiss')"
          >Cancel</MyButton
        >
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
  // eslint-disable-next-line vue/require-prop-types
  props: ['consentData', 'patientId'],
  data() {
    return {
      signaturePad: false,
      patient: false,
    }
  },
  computed: {
    consentPolicies() {
      return generateConsentText(this.consentData)
    },
  },
  mounted() {
    this.fetchPatient()
    const c = document.getElementById('sign-canvas')
    this.signaturePad = new SignaturePad(c)
  },
  methods: {
    async fetchPatient() {
      try {
        this.patient = await this.$axios.$get(`/patients/${this.patientId}`)
      } catch (error) {
        if (error.response) {
          this.$toast.error(error.response.data.message)
        }
      }
    },
    doctorsSignature() {
      const imgToExport = document.getElementById('sign-img')
      const canvas = document.createElement('canvas')
      canvas.width = imgToExport.width
      canvas.height = imgToExport.height
      canvas.getContext('2d').drawImage(imgToExport, 0, 0)
      return canvas.toDataURL('image/png')
    },
    submitConsent() {
      if (!this.patient) {
        this.$toast.warning('Patient not found, Please try again.')
        return
      }
      const patientInfo = [
        `Patient Name: ${this.patient.name}`,
        `Phone: ${this.patient.mobile}`,
        `Address: ${this.patient.address}`,
        `Date & Time: ${this.$dayjs().format('MM-DD-YYYY HH:MM A')}`,
        `Place: Kolhapur`,
      ]
      const parsedPolicies = this.consentPolicies.map((p) => ({
        text: p.replaceAll('<strong>', '').replaceAll('</strong>', ''),
        margin: 8,
      }))

      const data = this.signaturePad.toDataURL()
      const docDefinition = {
        header: [
          {
            text: 'Consent Form',
            alignment: 'center',
            margin: [0, 12, 0, 32],
            fontSize: 22,
            bold: true,
          },
        ],
        content: [
          {
            margin: 16,
            text: '',
          },
          ...patientInfo.map((info) => ({ text: info, margin: [8, 0, 0, 4] })),
          {
            margin: 16,
            text: '',
          },
          ...parsedPolicies,
          {
            margin: [0, 32, 0, 0],
            columns: [
              {
                image: this.doctorsSignature(),
                width: 150,
                height: 100,
              },

              {
                image: data,
                width: 150,
                height: 100,
              },
            ],
          },
        ],
      }

      pdfMake.createPdf(docDefinition).getBlob((blob) => {
        this.$emit('dismiss', blob)
      })
    },
  },
}
</script>

<style lang="scss" scopped>
#consent-signature {
  height: 90%;
}
.content {
  flex-grow: 1;
}
</style>
