<template>
  <div id="dash-view">
    <Drawer />
    <div class="nuxt-view">
      <MenuBar />
      <Nuxt class="mx-10" />
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
    flex-grow: 1;
  }
}
</style>
