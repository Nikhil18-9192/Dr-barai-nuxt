<template>
  <div id="dash-view">
    <client-only>
      <AddPatientDialog v-if="patientDialog" @dismiss="patientDialog = false" />
      <Drawer v-if="$device.isDesktopOrTablet" />
      <div class="nuxt-view">
        <MenuBar class="z-5" />
        <div
          v-if="menuState"
          class="menuModal"
          @click="$store.commit('toggleMenuState')"
        ></div>
        <MenuBotton v-if="$device.isMobile" />
        <transition name="phone-menu">
          <MobileMenu v-if="menuState" class="mobile-menu" />
        </transition>

        <Nuxt class="px-10 my-app" />
        <MenuFab @click-add-patient="patientDialog = true" />
      </div>
    </client-only>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      menuState: false,
      patientDialog: false,
    }
  },
  computed: {
    storeMenuState() {
      return this.$store.getters.getMenuState
    },
  },
  watch: {
    storeMenuState(newState) {
      this.menuState = newState
    },
  },
  mounted() {
    const jwt = Cookies.get('jwt')
    if (!jwt) {
      this.$router.push('/login')
    }
  },
}
</script>

<style lang="scss" scoped>
#dash-view {
  display: flex;
  position: relative;
  .nuxt-view {
    width: 100%;
    position: relative;

    .my-app {
      height: 92vh;
      position: relative;
      overflow-y: scroll;
      scrollbar-width: none;
      &::-webkit-scrollbar {
        display: none;
      }
      @include for-phone-only {
        padding: 0 30px;
      }
    }
  }
  .mobile-menu {
    z-index: 999;
  }
  .phone-menu-enter-active,
  .phone-menu-leave-active {
    transition: 0.4s ease all;
    transform: translateX(-100%);
  }
  .menuModal {
    position: fixed;
    width: 100%;
    height: 100vh;
    z-index: 100;
    background: transparent;
    top: 0;
    left: 0;
  }
}
</style>
