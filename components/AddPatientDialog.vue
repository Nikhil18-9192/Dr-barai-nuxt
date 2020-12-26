<template>
  <div
    id="add-patient"
    class="fixed w-full z-50 top-0 left-0 h-screen bg-black bg-opacity-50"
    @click.stop="$emit('dismiss')"
  >
    <div
      class="add-modal bg-white relative rounded-md mx-auto mt-12 py-6 px-12 md:px-8 sm:px-4 w-2/6 md:w-3/5 xl:w-2/5"
      @click.stop=""
    >
      <h1 class="text-lg font-medium text-center mb-8">Add New Patient</h1>
      <div class="form">
        <label for="name" class="text-sm font-normal text-gray-400">Name</label>
        <input
          v-model="name"
          class="border rounded border-gray-300 p-2 w-full mt-1 mb-2 outline-none"
          type="text"
          placeholder="Elon musk"
        />
        <label for="mobile" class="text-sm font-normal text-gray-400"
          >Mobile</label
        >
        <input
          v-model="mobile"
          class="border rounded border-gray-300 p-2 w-full mt-1 mb-2 outline-none"
          type="number"
          placeholder="0123456789"
        />
        <label for="email" class="text-sm font-normal text-gray-400"
          >Email</label
        >
        <input
          v-model="email"
          class="border rounded border-gray-300 p-2 w-full mt-1 mb-2 outline-none"
          type="email"
          placeholder="elonmusk@teslamotors.com"
        />
        <label for="gender" class="text-sm font-normal text-gray-400"
          >Gender</label
        >
        <select
          v-model="gender"
          class="border rounded border-gray-300 p-2 w-full mt-1 mb-2 outline-none"
        >
          <option disabled value="Select Gender">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>
        <label for="bday" class="text-sm font-normal text-gray-400"
          >Birth Date</label
        >
        <input
          v-model="birthDate"
          type="date"
          class="border rounded border-gray-300 p-2 w-full mt-1 mb-2 outline-none"
          placeholder="dd-yy-mm"
        />
        <label for="address" class="text-sm font-normal text-gray-400"
          >Address</label
        >
        <textarea
          v-model="address"
          placeholder="street address"
          class="border rounded border-gray-300 p-2 w-full mt-1 mb-2 outline-none"
        ></textarea>
        <label for="pincode" class="text-sm font-normal text-gray-400"
          >Pincode</label
        >
        <input
          v-model="pincode"
          class="border rounded border-gray-300 p-2 w-full mt-1 mb-2 outline-none"
          type="number"
          placeholder="Elon musk"
        />
        <label for="city" class="text-sm font-normal text-gray-400">City</label>
        <input
          v-model="city"
          class="border rounded border-gray-300 p-2 w-full mt-1 mb-2 outline-none"
          type="text"
          placeholder="Elon musk"
        />
        <div class="mt-8 flex">
          <button
            class="bg-blue-500 mr-4 rounded-md text-white text-sm font-medium add-btn flex items-center justify-center outline-none"
            @click="addPatient"
          >
            <img class="mr-3" src="/bell.svg" alt="" />
            Send Now
          </button>
          <button
            type="cancel"
            class="bg-gray-100 rounded-md text-gray-700 text-sm font-medium add-btn flex items-center justify-center outline-none"
            @click="$emit('dismiss')"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      mobile: '',
      email: '',
      gender: '',
      birthDate: '',
      address: '',
      pincode: '',
      city: '',
    }
  },
  methods: {
    async addPatient() {
      console.log(this.date)
      const {
        name,
        mobile,
        email,
        gender,
        birthDate,
        address,
        pincode,
        city,
      } = this
      try {
        const response = await this.$axios.$post(`/patients`, {
          name,
          mobile,
          email,
          gender,
          birthDate,
          address,
          pincode,
          city,
        })
        console.log(response)
      } catch (error) {
        console.log(error.message)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
#add-patient {
  .add-btn {
    width: 180px;
    height: 37px;
    img {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
