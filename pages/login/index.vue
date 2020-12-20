<template>
  <div id="login-page" class="bg-blue-500">
    <div class="center">
      <h1 class="tracking-widest font-medium text-center">
        Dr. Barai’s Clinic
      </h1>
      <div class="login-form p-10 bg-white rounded">
        <label for="email" class="text-sm font-bold text-gray-800">Email</label>
        <input
          class="border rounded border-gray-200 p-2"
          type="email"
          placeholder="elonmusk@teslamotors.com"
        />
        <label class="mt-2 text-sm font-bold text-gray-800" for="password"
          >Password</label
        >
        <input
          class="border rounded border-gray-200 p-2"
          type="password"
          placeholder="Password"
        />
        <button
          class="btn bg-blue-500 my-6 rounded text-white text-base shadow-2xl"
        >
          Sign In
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  layout: 'login',
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
      }
      .btn {
        height: 32px;
        width: 84px;
      }
    }
  }
}
</style>
