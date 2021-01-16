<template>
  <div id="vital-signs">
    <VitalSignModal
      v-if="modal"
      @dismiss="modal = false"
      @vitalSignData="submitVitalSignData"
    />
    <div class="title-container mb-6 flex">
      <h1 class="text-xl font-medium">Vital Signs</h1>
      <AddButton @click.native="modal = true" />
    </div>

    <table v-if="vitalSigns && $device.isDesktopOrTablet" class="list w-full">
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
            {{ vitalSigns.weight == null ? '---' : vitalSigns.weight }}
          </td>
          <td class="p-3">
            {{
              vitalSigns.bp == null ||
              vitalSigns.bp.bpSystolic == null ||
              vitalSigns.bp.bpDiastolic == null
                ? '---'
                : vitalSigns.bp.bpSystolic + '/' + vitalSigns.bp.bpDiastolic
            }}
          </td>
          <td class="p-3">
            {{
              vitalSigns.temperature == null ||
              vitalSigns.temperature.temperature == null
                ? '---'
                : vitalSigns.temperature.temperature
            }}
          </td>
          <td class="p-3">
            {{ vitalSigns.pulse == null ? '---' : vitalSigns.pulse }}
          </td>
          <td class="p-3 flex justify-center">
            <p>
              {{ vitalSigns.respRate == null ? '---' : vitalSigns.respRate }}
            </p>
            <img class="absolute ml-36 hidden" src="/edit_btn.svg" alt="" />
            <img class="absolute ml-56 hidden" src="/delete_btn.svg" alt="" />
          </td>
        </tr>
      </tbody>
    </table>
    <VitalSignCard v-if="$device.isMobile" :card-info="vitalSigns" />
  </div>
</template>

<script>
export default {
  props: {
    vitals: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      modal: false,
      addVitals: false,
      displayTable: false,
    }
  },
  computed: {
    vitalSigns() {
      if (this.$route.name === 'appointments-newAppointment') {
        return this.addVitals
      } else if (Object.entries(this.vitals).length !== 0) {
        return this.vitals
      } else return false
    },
  },
  mounted() {
    this.submitVitalSignData()
  },
  methods: {
    submitVitalSignData(val) {
      if (val) {
        this.addVitals = val
      }
    },
  },
}
</script>

<style lang="scss" scoped>
#vital-signs {
  margin-bottom: 55px;
  .list {
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
