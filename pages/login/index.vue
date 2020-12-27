<template>
  <div id="login-page" class="bg-blue-500">
    <div class="center">
      <h1 class="tracking-widest font-medium text-center">
        Dr. Barai’s Clinic
      </h1>
      <div class="login-form p-10 bg-white rounded">
        <label for="email" class="text-sm mb-1 font-bold text-gray-800"
          >Email</label
        >
        <input
          v-model="username"
          class="border rounded border-gray-300 p-2"
          type="email"
          placeholder="elonmusk@teslamotors.com"
        />
        <label class="mt-2 mb-1 text-sm font-bold text-gray-800" for="password"
          >Password</label
        >
        <input
          v-model="password"
          class="border rounded border-gray-300 p-2"
          type="password"
          placeholder="Password"
        />
        <div class="grid grid-cols-2 my-6">
          <button
            class="btn bg-blue-500 rounded text-white text-base shadow-2xl"
            @click.prevent="login"
          >
            Sign In
          </button>
          <p class="text-right text-blue-500 font-bold text-sm">
            Forgot Password?
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  name: 'LoginPage',
  layout: 'login',
  data() {
    return {
      username: '',
      password: '',
    }
  },
  computed: {
    user() {
      return this.$store.getters.getUser
    },
  },
  beforeCreate() {
    if (this.$store.getters.getUser) {
      this.$router.push('/')
    }
  },

  methods: {
    async login() {
      try {
        const res = await this.$axios.$post(`/auth/local`, {
          identifier: this.username,
          password: this.password,
        })
        this.$store.commit('SET_USER', res)
        Cookies.set('jwt', res.jwt)
        this.$axios.setToken(res.jwt, 'bearer')
        this.$router.push('/')
      } catch (error) {
        this.$toast.error(error.message)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
#login-page {
  height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  .center {
    h1 {
      font-size: 18px;
      text-transform: uppercase;
      color: #fff;
      margin-bottom: 67px;
    }
    .login-form {
      width: 100%;
      display: inline-grid;
      padding: 25px;
      input {
        width: 370px;
        height: 40px;
        outline: none;
      }
      .btn {
        height: 32px;
        width: 84px;
        outline: none;
      }
    }
  }
}
</style>
