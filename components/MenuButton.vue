<template>
  <div id="menubtn" class="">
    <div class="hamburger-menu"></div>
  </div>
</template>

<script>
export default {
  name: 'MenuButton',
  components: {},
  mounted() {},
  methods: {},
}
</script>

<style lang="scss" scopped>
$bar-width: 25px;
$bar-height: 2px;
$bar-spacing: 8px;

#menubtn {
  z-index: 2000;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-sizing: border-box;
  padding: 4px;
  cursor: pointer;
  transition: 0.3s ease all;

  .hamburger-menu,
  .hamburger-menu:after,
  .hamburger-menu:before {
    width: $bar-width;
    height: $bar-height;
  }

  .hamburger-menu {
    position: relative;
    background: #fff;
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
    background: #fff;
    transition: bottom 300ms 300ms cubic-bezier(0.23, 1, 0.32, 1),
      transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
  }

  .hamburger-menu:after {
    content: '';
    position: absolute;
    left: 0;
    top: $bar-spacing;
    background: #fff;
    transition: top 300ms 300ms cubic-bezier(0.23, 1, 0.32, 1),
      transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
  }

  .hamburger-menu.animate:after {
    top: -7px;
    transform: rotate(40deg);
    background: rgb(255, 255, 255);
    transition: top 300ms cubic-bezier(0.23, 1, 0.32, 1),
      transform 300ms 300ms cubic-bezier(0.23, 1, 0.32, 1);
  }

  .hamburger-menu.animate:before {
    bottom: -9px;

    background: white;
    transform: rotate(-40deg);
    transition: bottom 300ms cubic-bezier(0.23, 1, 0.32, 1),
      transform 300ms 300ms cubic-bezier(0.23, 1, 0.32, 1);
  }
}
</style>
