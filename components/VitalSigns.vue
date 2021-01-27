<template>
  <div id="vital-signs">
    <VitalSignModal
      v-if="vitalsModal"
      :vitals-to-edit="currentVitals"
      @dismiss="vitalsModal = false"
      @addVitals="submitVitalSignData"
    />
    <div class="title-container flex mb-1">
      <h1 class="text-xl font-medium">Vital Signs</h1>
      <AddButton
        v-if="!currentVitals.weight"
        @click.native="vitalsModal = true"
      />
    </div>

    <table
      v-if="currentVitals.weight && $device.isDesktopOrTablet"
      class="list w-full"
    >
      <tbody>
        <tr class="bg-gray-100 text-black-400 text-sm">
          <th
            class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200 font-normal"
          >
            WEIGHT (KG)
          </th>
          <th
            class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200 font-normal"
          >
            B.P. (mmHg)
          </th>
          <th
            class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200 font-normal"
          >
            TEMPERATURE (°C)
          </th>
          <th
            class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200 font-normal"
          >
            PULSE (Heart beats/min)
          </th>
          <th
            class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200 font-normal"
          >
            RESP. RATE (Breaths/min)
          </th>
        </tr>
        <tr class="row my-6 text-sm font-normal text-center">
          <td class="p-3">
            {{ currentVitals.weight == null ? '---' : currentVitals.weight }}
          </td>
          <td class="p-3">
            {{
              currentVitals.bp == null ||
              currentVitals.bp.bpSystolic == null ||
              currentVitals.bp.bpDiastolic == null
                ? '---'
                : currentVitals.bp.bpSystolic +
                  '/' +
                  currentVitals.bp.bpDiastolic
            }}
          </td>
          <td class="p-3">
            {{
              currentVitals.temperature == null ||
              currentVitals.temperature.temperature == null
                ? '---'
                : currentVitals.temperature.temperature
            }}
          </td>
          <td class="p-3">
            {{ currentVitals.pulse == null ? '---' : currentVitals.pulse }}
          </td>
          <td class="p-3 flex justify-center">
            <p>
              {{
                currentVitals.respRate == null ? '---' : currentVitals.respRate
              }}
            </p>
            <img
              class="absolute ml-36 hidden"
              src="/edit_btn.svg"
              alt=""
              @click="vitalsModal = true"
            />
            <img
              class="absolute ml-56 hidden"
              src="/delete_btn.svg"
              alt=""
              @click="deleteVitals"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <VitalSignCard
      v-if="currentVitals.weight && $device.isMobile"
      :card-info="currentVitals"
      @edit="vitalsModal = true"
      @delete="deleteVitals"
    />
  </div>
</template>

<script>
export default {
  name: 'VitalSignComponent',
  // eslint-disable-next-line
  props: ['value'],
  data() {
    return {
      vitalsModal: false,
      displayTable: false,
      editedVitals: {},
      currentVitals: {},
    }
  },
  watch: {
    value: {
      handler(val) {
        this.currentVitals = val
      },
      deep: true,
    },
  },
  mounted() {
    if (this.value && this.value.weight) {
      this.currentVitals = this.value
    }
  },
  methods: {
    submitVitalSignData(val) {
      this.currentVitals = val
      this.$emit('input', val)
      this.vitalsModal = false
    },
    deleteVitals() {
      this.currentVitals = {}
      this.$emit('input', this.currentVitals)
    },
  },
}
</script>

<style lang="scss" scoped>
#vital-signs {
  .list {
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
</style>
