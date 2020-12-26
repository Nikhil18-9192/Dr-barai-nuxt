<template>
  <div id="home-page"></div>
</template>

<script>
export default {
  name: 'HomePage',
  layout: 'default',
  beforeCreate() {
    if (!this.$store.state.user) {
      this.$router.push('/login')
    }
  },
}
</script>

<style></style>
