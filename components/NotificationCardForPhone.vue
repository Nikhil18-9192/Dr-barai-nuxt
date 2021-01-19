<template>
  <div id="notification-info">
    <div
      v-for="(item, i) in cardInfo"
      :key="i"
      class="card p-4 mb-4 border cursor-pointer"
      @click="viewNotification(item.id)"
    >
      <p class="text-gray-600 text-xs font-normal border-b mb-3">
        Sent To:
        <span class="text-blue-600 text-base">
          {{ getName(item.patients) }}</span
        >
      </p>
      <p class="text-gray-600 text-xs font-normal">
        Message : {{ text_truncate(item.message) }}
      </p>
      <p class="text-gray-600 text-xs font-normal">
        Sent At :
        {{
          formatter.formatDate(item.createdAt) +
          ' at ' +
          formatter.formatTime(item.createdAt)
        }}
      </p>
    </div>
  </div>
</template>

<script>
import formatDateTime from '@/utils/formatDateTime'
export default {
  props: {
    cardInfo: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    formatter() {
      return formatDateTime
    },
  },
  methods: {
    getName(patients) {
      if (patients.length === 1) {
        return patients[0].name
      } else {
        return `${patients[0].name.substring(0, 10)} & ${
          patients.length - 1
        } Other`
      }
    },
    text_truncate(str, length, ending) {
      if (length == null) {
        length = 30
      }
      if (ending == null) {
        ending = '...'
      }
      if (str.length > length) {
        return str.substring(0, length - ending.length) + ending
      } else {
        return str
      }
    },
    viewNotification(id) {
      this.$router.push(`/notifications/${id}`)
    },
  },
}
</script>
<style lang="scss" scopped></style>
