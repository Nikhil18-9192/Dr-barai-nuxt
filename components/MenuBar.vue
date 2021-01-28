<template>
  <div
    id="menu-bar"
    class="border-b-2 z-20 flex items-center justify-center text-center bg-white"
  >
    <p class="text-gray-800 font-medium text-lg uppercase">
      <span class="cursor-pointer" @click="goHome"> Dr. Barai’s Clinic</span>
    </p>
    <div v-if="$store.state.loading" class="loader">
      <img
        :class="$store.state.loading ? 'loaderspin' : ''"
        src="/loader.png"
        alt=""
      />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goHome() {
      this.$router.push('/')
    },
  },
}
</script>

<style lang="scss" scoped>
#menu-bar {
  position: sticky;
  top: 0;
  left: 0;
  background: #fff;
  height: 50px;
  .loader {
    width: 35px;
    position: absolute;
    top: 10px;
    right: 45px;
  }
  .loaderspin {
    width: 60px;
    -webkit-animation: spin 3s infinite;
    -moz-animation: spin 3s infinite;
    animation: spin 3s linear infinite;
  }
  @-moz-keyframes spin {
    100% {
      -moz-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
}
</style>
