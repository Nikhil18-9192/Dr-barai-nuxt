<template>
  <div
    id="appointment-title"
    class="sm:flex relative bg-gray-100 justify-between p-4 my-6 rounded"
  >
    <AddPatientDialog
      v-if="$store.state.patientModal"
      :patient="patient"
      @dismiss="$store.commit('togglePatientModal')"
    />
    <SendSmsModal
      v-if="$store.state.notifyModal"
      :patient="patient"
      @dismiss="$store.commit('toggleNotifyModal')"
    />
    <div
      class="date-time border-b sm:border-r sm:border-b-0 sm:absolute sm:ml-5 py-4 pr-5"
    >
      <h2 class="text-gray-600 text-lg font-medium mt-1">
        {{ appointmentInfo.date == null ? '---' : appointmentInfo.date }}
      </h2>
      <p class="text-sm font-medium text-gray-400">
        {{ appointmentInfo.time == null ? '---' : appointmentInfo.time }}
      </p>
    </div>
    <div class="patient-info sm:ml-48 mt-2 mb-2 sm:mb-0 sm:mt-4">
      <h1 class="text-black text-3xl font-medium">
        {{ appointmentInfo.name }}
      </h1>
    </div>
    <div class="actions flex sm:flex-col">
      <MyButton
        class="edit-btn mb-2"
        :icon="editBtnIcon"
        @click.native="$store.commit('togglePatientModal')"
        >Edit Profile</MyButton
      >
      <MyButton
        class="mb-4"
        :icon="notifyBtnIcon"
        @click.native="$store.commit('toggleNotifyModal')"
        >Notify</MyButton
      >
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
    patient: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      editBtnIcon: '/pencil-alt.svg',
      notifyBtnIcon: '/bell.svg',
    }
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
#appointment-title {
  .actions {
    .action-button {
      &:hover {
        transform: scale(1.05);
        cursor: pointer;
      }
    }
  }
  button {
    width: 133px;
    height: 37px;
  }
  .edit-btn {
    background: #f3f3f3;
    color: #52525b;
  }
}
</style>
