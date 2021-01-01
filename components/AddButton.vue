<template>
  <img id="add-button" class="add-button mx-2 mt-1" src="/add_btn.svg" alt="" />
</template>

<script>
export default {
  name: 'AddButton',
  mounted() {
    this.checkRoute()
  },
  methods: {
    checkRoute() {
      if (this.$route.name !== 'appointments-newAppointment') {
        const buttons = document.getElementsByClassName('add-button')
        for (let i = 0; i < buttons.length; i++) {
          buttons[i].style.display = 'none'
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
#add-button {
  cursor: pointer;
}
</style>
