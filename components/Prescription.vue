<template>
  <div id="prescription">
    <AddPrescription
      v-if="addModal"
      @prescriptionData="submitPrescriptionData"
      @dismiss="addModal = false"
    />
    <div class="title-container mb-6 flex">
      <h1 class="text-xl font-medium">Prescription</h1>
      <AddButton @clicked="addModal = true" />
    </div>

    <table class="drugs-list w-full">
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
          <td class="p-3">{{ item.drug.name }}</td>
          <td class="p-3">{{ item.frequency.frequency }}</td>
          <td class="p-3">
            {{
              item.frequency.drugDuration + ' ' + item.frequency.drugDurationFor
            }}
          </td>
          <td class="p-3 flex justify-center">
            <p>{{ item.frequency.instructions }}</p>
            <img class="absolute ml-36 hidden" src="/edit_btn.svg" alt="" />
            <img class="absolute ml-56 hidden" src="/delete_btn.svg" alt="" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    prescription: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      addModal: false,
      prescription: [],
    }
  },
  mounted() {
    this.submitPrescriptionData()
  },
  methods: {
    submitPrescriptionData(val) {
      if (val) {
        this.prescription.push(val)
      }
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
.new {
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
}
</style>
