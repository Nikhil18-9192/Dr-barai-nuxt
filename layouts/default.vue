<template>
  <div id="dash-view">
    <Drawer />
    <div class="nuxt-view">
      <MenuBar />
      <Nuxt class="mx-10" />
    </div>
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
