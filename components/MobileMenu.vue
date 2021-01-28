<template>
  <div id="phone-drawer" class="bg-blue-500 rounded-r-lg">
    <nuxt-link
      v-for="item in menuItem"
      :key="item.name"
      :to="item.route"
      class="menu flex py-4 items-center px-5"
      @click.native="$store.commit('toggleMenuState')"
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
#phone-drawer {
  position: fixed;
  width: 60%;
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
    opacity: 1;
    transition: 0.5s ease all;
  }

  img {
    transition: 0.5s ease all;
    max-width: 26px;
  }
}

.nuxt-link-exact-active {
  @apply bg-blue-600;
}
</style>
