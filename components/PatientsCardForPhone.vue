<template>
  <div id="info">
    <div
      v-for="(item, i) in cardInfo"
      :key="i"
      class="card p-4 mb-4 border cursor-pointer"
      @click="routeToInfo(item.id)"
    >
      <p class="text-gray-600 text-xs font-normal border-b mb-3">
        Name: <span class="text-blue-600 text-base">{{ item.name }}</span>
      </p>
      <p class="text-gray-600 text-xs font-normal">
        Mobile : {{ item.mobile }}
      </p>
      <p class="text-gray-600 text-xs font-normal">
        Session Count : {{ item.appointments.length }}
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
  methods: {
    routeToInfo(id) {
      this.$router.push(`/patients/${id}`)
    },
  },
}
</script>
<style lang="scss" scopped></style>
