<template>
  <div
    id="appointment-title"
    class="flex relative bg-gray-100 justify-between p-4 my-6 rounded"
  >
    <div class="date-time absolute ml-5 py-4 pr-5">
      <h2 class="text-gray-600 text-lg font-medium mt-1">
        {{ appointmentInfo.date }}
      </h2>
      <p class="text-sm font-medium text-gray-400">
        {{ appointmentInfo.time }}
      </p>
    </div>
    <div class="patient-info ml-48 mt-4">
      <h1 class="text-black text-3xl font-medium">
        {{ appointmentInfo.name }}
      </h1>
    </div>
    <div class="actions">
      <div
        class="edit-profile action-button relative bg-white flex rounded m-2 p-1 px-2"
      >
        <img class="left-0 mx-2" src="/edit_profile.svg" alt="" />
        <p class="text-gray-400">Edit Profile</p>
      </div>
      <div
        class="notify action-button relative flex bg-blue-500 rounded m-2 p-1 px-2"
      >
        <img class="left-0 mx-2" src="/bell_icon.svg" alt="" />
        <p class="text-white">Notify</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    appointmentInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {}
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
#appointment-title {
  .date-time {
    border-right: 1px solid #d4d4d8;
  }
  .actions {
    .action-button {
      &:hover {
        transform: scale(1.05);
        cursor: pointer;
      }
    }
  }
}
</style>
