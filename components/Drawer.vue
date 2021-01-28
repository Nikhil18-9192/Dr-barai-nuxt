<template>
  <div
    id="drawer"
    class="bg-blue-500 rounded-r-lg"
    :class="[{ expanded: displayMenu }]"
    @mouseenter="displayMenu = !displayMenu"
    @mouseleave="displayMenu = false"
  >
    <nuxt-link
      v-for="item in menuItem"
      :key="item.name"
      :to="item.route"
      class="menu flex py-4 items-center px-5"
    >
      <img class="w-8" :src="item.icon" />
      <p class="text-white text-lg font-normal menu-title">
        {{ item.name }}
      </p>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      displayMenu: true,
      menuItem: [
        { icon: '/dashboard.svg', name: 'Dashboard', route: '/' },
        { icon: '/calender.svg', name: 'Appointment', route: '/appointments' },
        { icon: '/users.svg', name: 'Patients', route: '/patients' },
        { icon: '/collection.svg', name: 'Products', route: '/products' },
        { icon: '/chat.svg', name: 'Notifications', route: '/notifications' },
        { icon: '/collection.svg', name: 'Drugs', route: '/drugs' },
      ],
    }
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
#drawer {
  position: sticky;
  top: 0;
  left: 0;
  min-width: 0px;
  height: 100vh;
  transition: 0.3s ease all;
  overflow: hidden;

  .menu {
    position: relative;

    &:hover {
      cursor: pointer;
    }
  }

  .menu-title {
    position: absolute;
    top: 50%;
    left: 68px;
    text-align: left;
    transform: translateY(-50%);
    opacity: 0;
    transition: 0.5s ease all;
  }

  img {
    transition: 0.5s ease all;
    max-width: 26px;
  }
}

.expanded {
  min-width: 220px !important;

  .menu-title {
    opacity: 1 !important;
  }
}

.nuxt-link-exact-active {
  @apply bg-blue-600;
}
</style>
