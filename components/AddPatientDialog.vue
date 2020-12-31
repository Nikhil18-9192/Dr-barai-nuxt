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
          <MyButton class="mr-4" :loading="loading" @click.native="addPatient"
            >Submit</MyButton
          >
          <MyButton class="cancel-btn" @click.native="$emit('dismiss')"
            >Cancel</MyButton
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AddPatientValidation } from '@/utils/validation'
export default {
  data() {
    return {
      loading: false,
      name: '',
      mobile: '',
      email: '',
      gender: 'Select Gender',
      birthDate: '',
      address: '',
      pincode: '',
      city: '',
    }
  },
  methods: {
    async addPatient() {
      this.loading = true
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
      const validation = AddPatientValidation({
        name,
        mobile,
        email,
        gender,
        birthDate,
        address,
        pincode,
        city,
      })
      if (validation.error) {
        this.$toast.error(validation.error.message)
        return
      }
      try {
        await this.$axios.$post(`/patients`, {
          name,
          mobile,
          email,
          gender,
          birthDate,
          address,
          pincode,
          city,
        })
        this.$emit('dismiss')
        this.$router.push('/patients')
        this.$toast.success('Add Patient Successfully')
      } catch (error) {
        this.$toast.error(error.message)
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
  }
  button {
    outline: none;
  }
  .cancel-btn {
    background: #f3f4f6;
    color: #000;
  }
}
</style>
