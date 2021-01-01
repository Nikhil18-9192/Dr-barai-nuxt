<template>
  <div id="vital-signs">
    <div class="title-container mb-6 flex">
      <h1 class="text-xl font-medium">Vital Signs</h1>
      <AddButton />
    </div>

    <table class="list w-full">
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
        <tr
          v-if="Object.entries(vitals).length != 0"
          class="row my-6 text-sm font-normal text-center"
        >
          <td class="p-3">{{ vitals.weight }}</td>
          <td class="p-3">
            {{ vitals.bp.bpSystolic + '/' + vitals.bp.bpDiastolic }}
          </td>
          <td class="p-3">{{ vitals.temperature.temperature }}</td>
          <td class="p-3">{{ vitals.pulse }}</td>
          <td class="p-3 flex justify-center">
            <p>{{ vitals.respRate }}</p>
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
    vitals: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {}
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
