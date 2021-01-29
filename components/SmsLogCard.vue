<template>
  <div id="table-info">
    <div
      v-for="(item, i) in cardInfo"
      :key="i"
      class="card p-4 mb-4 border cursor-pointer"
    >
      <p class="text-gray-600 text-xs font-normal border-b mb-3">
        Name: <span class="text-blue-600 text-base">{{ item.name }}</span>
      </p>
      <p class="text-gray-600 text-xs font-normal">
        Mobile : {{ item.mobile }}
      </p>
      <p class="text-gray-600 text-xs font-normal">
        Addres : {{ item.address }}
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
<style lang="scss" scoped></style>
