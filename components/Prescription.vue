<template>
  <div id="prescription py-6">
    <AddPrescription
      v-if="prescriptionModal"
      :edit-prescription="prescription[prescriptionIndexToEdit]"
      @addPrescription="submitPrescriptionData"
      @updatePrescription="updatePrescription"
      @dismiss="clearModal"
    />
    <div class="title-container flex mb-1 items-center">
      <h1 class="text-xl font-medium">Prescriptions</h1>
      <AddButton @click.native="prescriptionModal = true" />
      <img
        src="/doc-download.svg"
        class="w-5 absolute right-12"
        @click="generatePDF"
      />
    </div>
    <div ref="content">
      <table
        v-if="prescription.length > 0 && $device.isDesktopOrTablet"
        class="drugs-list w-full table-fixed relative"
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
              class="py-3 pr-8 border border-t-0 border-l-0 border-r-0 border-gray-200 font-normal"
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
            <td class="p-3 flex mr-20">
              <p>
                {{
                  item.frequency == null || item.frequency.instructions == null
                    ? '---'
                    : item.frequency.instructions
                }}
              </p>
              <img
                class="absolute right-20 hidden"
                src="/edit_btn.svg"
                alt=""
                @click="editPrescription(i)"
              />
              <img
                class="absolute right-12 hidden"
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
          <img
            class="absolute right-10"
            src="/edit_btn.svg"
            alt=""
            @click="editPrescription(i)"
          />
          <img
            class="absolute right-2"
            src="/delete_btn.svg"
            alt=""
            @click="deletePrescription(i)"
          />
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
          <p class="instructions text-gray-600 text-xs font-normal">
            INSTRUCTIONS :
            {{
              item.frequency == null || item.frequency.instructions == null
                ? '---'
                : item.frequency.instructions
            }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
pdfMake.vfs = pdfFonts.pdfMake.vfs
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['value'],
  data() {
    return {
      prescriptionModal: false,
      prescriptionIndexToEdit: -1,
      sanitizedPrescription: [],
      prescription: [],
    }
  },
  watch: {
    value: {
      handler(val) {
        if (val.length > 0) {
          this.prescription = val
        }
      },
    },
  },

  mounted() {
    // this.submitPrescriptionData()
    if (this.value.length > 0) {
      this.prescription.push(this.value)
    }
  },

  methods: {
    generatePDF() {
      if (!this.value.length) return
      const docDefinition = {
        content: [
          {
            layout: 'lightHorizontalLines',
            table: {
              headerRows: 1,
              widths: ['*', 'auto', '*', 'auto'],

              body: [
                ['Drug', 'Frequency', 'Duration', 'Instructions'],
                ...this.value.map((v) => this.parsePrescriptionIntoRow(v)),
              ],
            },
          },
        ],
      }
      pdfMake.createPdf(docDefinition).open()
    },
    submitPrescriptionData(val) {
      if (val) {
        this.prescription.push(val)
      }
      this.prescriptionModal = false
      this.$emit('input', this.prescription)
    },
    updatePrescription(val) {
      this.prescription[this.prescriptionIndexToEdit] = val
      this.prescriptionModal = false
      this.prescriptionIndexToEdit = -1
      this.$emit('input', this.prescription)
    },

    editPrescription(index) {
      this.prescriptionIndexToEdit = index
      this.prescriptionModal = true
    },
    deletePrescription(index) {
      this.sanitizedPrescription.splice(index, 1)
      this.prescription.splice(index, 1)
      this.$emit('input', this.sanitizedPrescription)
    },
    clearModal() {
      this.prescriptionModal = false
      this.prescriptionIndexToEdit = -1
    },
    parsePrescriptionIntoRow(item) {
      return [
        item.drug.name,
        `${item.frequency.frequency.replaceAll('_', ' ')}`,
        `${item.frequency.drugDuration} ${item.frequency.drugDurationFor}`,
        item.frequency.instructions,
      ]
    },
  },
}
</script>

<style lang="scss" scoped>
#prescription {
  .drugs-list {
    border-bottom: 1px solid #c4c4c4;
  }
}

td {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
.instructions {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
