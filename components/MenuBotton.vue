<template>
  <div id="menubtn" class="z-7" @click="$store.commit('toggleMenuState')">
    <div class="hamburger-menu" :class="[{ animate: menuState }]"></div>
  </div>
</template>

<script>
export default {
  name: 'MenuButton',
  components: {},
  data() {
    return {
      menuState: false,
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
  mounted() {},
  methods: {},
}
</script>

<style lang="scss" scopped>
$bar-width: 25px;
$bar-height: 2px;
$bar-spacing: 8px;

#menubtn {
  width: 52px;
  height: 52px;
  position: fixed;
  left: 5px;
  top: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-sizing: border-box;
  padding: 4px;
  background: transparent;
  cursor: pointer;
  transition: 0.3s ease all;
  border: 0.5px solid transparent;

  .hamburger-menu,
  .hamburger-menu:after,
  .hamburger-menu:before {
    width: $bar-width;
    height: $bar-height;
  }

  .hamburger-menu {
    position: relative;
    background: rgb(0, 0, 0);
    transition: all 300ms 300ms;
    &.animate {
      background: rgba(255, 255, 255, 0);
    }
  }

  .hamburger-menu:before {
    content: '';
    position: absolute;
    left: 0;
    bottom: $bar-spacing;
    background: rgb(0, 0, 0);
    transition: bottom 300ms 300ms cubic-bezier(0.23, 1, 0.32, 1),
      transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
  }

  .hamburger-menu:after {
    content: '';
    position: absolute;
    left: 0;
    top: $bar-spacing;
    background: rgb(0, 0, 0);
    transition: top 300ms 300ms cubic-bezier(0.23, 1, 0.32, 1),
      transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
  }

  .hamburger-menu.animate:after {
    top: -7px;
    transform: rotate(-40deg);
    background: rgb(0, 0, 0);
    transition: top 300ms cubic-bezier(0.23, 1, 0.32, 1),
      transform 300ms 300ms cubic-bezier(0.23, 1, 0.32, 1);
  }

  .hamburger-menu.animate:before {
    bottom: -9px;

    background: rgb(0, 0, 0);
    transform: rotate(40deg);
    transition: bottom 300ms cubic-bezier(0.23, 1, 0.32, 1),
      transform 300ms 300ms cubic-bezier(0.23, 1, 0.32, 1);
  }
}
</style>
