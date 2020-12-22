<template>
  <div id="drawer" class="bg-blue-500 rounded-r-lg">
    <MenuButton @click.native="displayMenu = !displayMenu" />
    <div
      v-for="item in menuItem"
      :key="item.name"
      class="menu flex mb-5 items-center"
    >
      <img class="w-8" :src="item.icon" alt="" />
      <p class="text-white text-lg font-normal menu-title">
        {{ item.name }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      displayMenu: false,
      menuItem: [
        { icon: 'dashboard.svg', name: 'Dashboard' },
        { icon: 'calender.svg', name: 'Appointment' },
        { icon: 'users.svg', name: 'Patients' },
        { icon: 'collection.svg', name: 'Products' },
        { icon: 'chat.svg', name: 'Notifications' },
      ],
    }
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
#drawer {
  position: relative;
  min-width: 85px;
  height: 100vh;
}
</style>
