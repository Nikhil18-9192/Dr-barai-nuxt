<template>
  <div id="prescription-info">
    <div
      v-for="(item, i) in cardInfo"
      :key="i"
      class="card p-4 mb-4 border cursor-pointer"
    >
      <p class="text-gray-600 text-xs font-normal border-b mb-3">
        DRUG:
        <span class="text-blue-600 text-base">
          {{ item.drug == null ? '---' : item.drug }}</span
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
            : item.frequency.drugDuration + ' ' + item.frequency.drugDurationFor
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
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cardInfo: {
      type: Array,
      default: () => [],
    },
  },
  methods: {},
}
</script>
<style lang="scss" scopped></style>
