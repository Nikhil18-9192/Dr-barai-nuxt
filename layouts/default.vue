<template>
  <div id="dash-view">
    <Drawer />

    <div class="nuxt-view">
      <MenuBar />
      <Nuxt class="mx-10 my-app" />
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
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
      height: 91vh;
      position: relative;
      overflow-y: scroll;
      scrollbar-width: none;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
}
</style>
