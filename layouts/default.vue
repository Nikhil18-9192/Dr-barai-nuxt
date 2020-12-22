<template>
  <div id="dash-view">
    <Drawer />
    <Nuxt class="nuxt-view" />
  </div>
</template>

<style lang="scss" scoped>
#dash-view {
  display: flex;
  position: relative;
  .nuxt-view {
    position: relative;
    flex-grow: 1;
  }
}
</style>
