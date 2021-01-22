<template>
  <div id="prescription">
    <AddPrescription
      v-if="prescriptionModal"
      :edit-prescription="prescription[prescriptionIndexToEdit]"
      @addPrescription="submitPrescriptionData"
      @updatePrescription="updatePrescription"
      @dismiss="clearModal"
    />
    <div class="title-container mb-6 flex">
      <h1 class="text-xl font-medium">Prescriptions</h1>
      <AddButton @click.native="prescriptionModal = true" />
    </div>
    <div ref="content">
      <table
        v-if="prescription.length > 0 && $device.isDesktopOrTablet"
        class="drugs-list w-full"
      >
        <tbody>
          <tr class="bg-gray-100 text-black-400 text-sm">
            <th
              class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200 font-normal"
            >
              DRUG
            </th>
            <th
              class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200 font-normal"
            >
              DOSAGE & FREQUENCY
            </th>
            <th
              class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200 font-normal"
            >
              DURATION
            </th>
            <th
              class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200 font-normal"
            >
              INSTRUCTIONS
            </th>
          </tr>
          <tr
            v-for="(item, i) in prescription"
            :key="i"
            class="row my-6 text-sm font-normal text-center"
          >
            <td class="p-3">
              {{ item.name ? item.name : item.drug.name }}
            </td>
            <td class="p-3">
              {{
                item.frequency == null || item.frequency.frequency == null
                  ? '---'
                  : item.frequency.frequency
              }}
            </td>
            <td class="p-3">
              {{
                item.frequency == null || item.frequency.drugDuration == null
                  ? '---'
                  : item.frequency.drugDuration +
                    ' ' +
                    item.frequency.drugDurationFor
              }}
            </td>
            <td class="p-3 flex justify-center">
              <p>
                {{
                  item.frequency == null || item.frequency.instructions == null
                    ? '---'
                    : item.frequency.instructions
                }}
              </p>
              <img
                class="absolute ml-36 hidden"
                src="/edit_btn.svg"
                alt=""
                @click="editPrescription(i)"
              />
              <img
                class="absolute ml-56 hidden"
                src="/delete_btn.svg"
                alt=""
                @click="deletePrescription(i)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div ref="phone">
      <div
        v-if="prescription.length && $device.isMobile"
        id="prescription-info"
      >
        <div
          v-for="(item, i) in prescription"
          :key="i"
          class="card relative p-4 mb-4 border cursor-pointer"
        >
          <p class="text-gray-600 text-xs font-normal border-b mb-3">
            DRUG:
            <span class="text-blue-600 text-base">
              {{ item.name ? item.name : item.drug.name }}</span
            >
          </p>
          <p class="text-gray-600 text-xs font-normal">
            DOSAGE & FREQUENCY :
            {{
              item.frequency == null || item.frequency.frequency == null
                ? '---'
                : item.frequency.frequency
            }}
          </p>
          <p class="text-gray-600 text-xs font-normal">
            DURATION :
            {{
              item.frequency == null || item.frequency.drugDuration == null
                ? '---'
                : item.frequency.drugDuration +
                  ' ' +
                  item.frequency.drugDurationFor
            }}
          </p>
          <p class="text-gray-600 text-xs font-normal">
            INSTRUCTIONS :
            {{
              item.frequency == null || item.frequency.instructions == null
                ? '---'
                : item.frequency.instructions
            }}
          </p>
          <img
            class="absolute right-10 bottom-2"
            src="/edit_btn.svg"
            alt=""
            @click="editPrescription(i)"
          />
          <img
            class="absolute right-2 bottom-2"
            src="/delete_btn.svg"
            alt=""
            @click="deletePrescription(i)"
          />
        </div>
      </div>
    </div>

    <MyButton
      v-if="prescription.length > 0 && $device.isDesktopOrTablet"
      class="download-btn mt-6"
      @click.native="download"
      >Download PDF</MyButton
    >
    <MyButton
      v-if="prescription.length > 0 && $device.isMobile"
      class="download-btn mt-6"
      @click.native="downloadPhone"
      >Download PDF</MyButton
    >
  </div>
</template>

<script>
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
export default {
  props: {
    prescription: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      prescriptionModal: false,
      addPrescription: false,
      prescriptionIndexToEdit: -1,
      editedDrug: {},
    }
  },
  computed: {
    prescriptions() {
      if (this.$route.name === 'appointments-new') {
        return this.addprescription
      } else if (Object.entries(this.prescription).length !== 0) {
        return this.prescription
      } else return false
    },
  },
  mounted() {
    this.submitPrescriptionData()
  },

  methods: {
    submitPrescriptionData(val) {
      if (val) {
        this.prescription.push(val)
      }
      this.prescriptionModal = false
      this.$emit('input', this.prescription)
    },
    updatePrescription(val) {
      this.prescription[this.prescriptionIndexToEdit] = val
      this.prescriptionIndexToEdit = -1
      this.prescriptionModal = false
      this.$emit('input', this.prescription)
    },
    download() {
      // eslint-disable-next-line
      const doc = new jsPDF({ orientation: 'landscape' })
      html2canvas(this.$refs.content, {
        scrollY: -window.scrollY,
      }).then(function (canvas) {
        const img = canvas.toDataURL('image/jpeg', 0.8)
        const imgProps = doc.getImageProperties(img)
        const pdfWidth = doc.internal.pageSize.getWidth()
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
        doc.addImage(img, 'JPEG', 0, 0, pdfWidth, pdfHeight)
        doc.save('prescriptions.pdf')
      })
    },
    downloadPhone() {
      // eslint-disable-next-line
      const doc = new jsPDF('p', 'mm', 'a4')
      html2canvas(this.$refs.phone, {
        scrollY: -window.scrollY,
      }).then(function (canvas) {
        const img = canvas.toDataURL('image/jpeg', 0.8)
        const pdfWidth = doc.internal.pageSize.getWidth()
        const pdfHeight = doc.internal.pageSize.getWidth()
        doc.addImage(img, 'JPEG', 0, 0, pdfWidth, pdfHeight)
        doc.save('prescriptions.pdf')
      })
    },
    editPrescription(index) {
      this.prescriptionIndexToEdit = index
      this.prescriptionModal = true
    },
    deletePrescription(index) {
      this.prescription.splice(index, 1)
      this.$emit('input', this.prescription)
    },
    clearModal() {
      this.prescriptionModal = false
      this.prescriptionIndexToEdit = -1
    },
  },
}
</script>

<style lang="scss" scoped>
#prescription {
  margin-bottom: 55px;
  .drugs-list {
    border-bottom: 1px solid #c4c4c4;
  }
}

.row {
  &:hover {
    background: #c4c4c411;
  }

  &:hover img {
    display: block;
  }
  img {
    padding: 4px;
    &:hover {
      transform: scale(1.05);
      cursor: pointer;
    }
  }
}

.card {
  &:hover img {
    display: block;
  }
}
.add-btn {
  width: 180px;
  height: 37px;
}
</style>
