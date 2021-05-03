<template>
  <div id="vitalsign-info">
    <div v-if="cardInfo" class="card relative p-4 mb-4 border cursor-pointer">
      <p class="text-gray-600 text-xs font-normal">
        WEIGHT (KG)
        {{ cardInfo.weight ? cardInfo.weight : '---' }}
      </p>
      <p class="text-gray-600 text-xs font-normal">
        B.P. (mmHg) :
        {{
          cardInfo.bp && cardInfo.bp.bpSystolic && cardInfo.bp.bpDiastolic
            ? cardInfo.bp.bpSystolic + '/' + cardInfo.bp.bpDiastolic
            : '---'
        }}
      </p>
      <p class="text-gray-600 text-xs font-normal">
        TEMPERATURE (°C) :
        {{
          cardInfo.temperature && cardInfo.temperature.temperature
            ? cardInfo.temperature.temperature
            : '---'
        }}
      </p>
      <p class="text-gray-600 text-xs font-normal">
        PULSE (Heart beats/min) :
        {{ cardInfo.pulse ? cardInfo.pulse : '---' }}
      </p>
      <p class="text-gray-600 text-xs font-normal">
        RESP. RATE (Breaths/min) :
        {{ cardInfo.respRate }}
      </p>
      <img
        class="btn absolute right-10 bottom-2 hidden"
        src="/edit_btn.svg"
        alt=""
        @click="$emit('edit')"
      />
      <img
        class="btn absolute right-2 bottom-2 hidden"
        src="/delete_btn.svg"
        alt=""
        @click="$emit('delete')"
      />
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line
  props: ['cardInfo'],
}
</script>
<style lang="scss" scoped></style>
