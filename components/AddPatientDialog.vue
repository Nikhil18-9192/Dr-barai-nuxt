<template>
  <div
    id="add-patient"
    class="fixed w-full z-50 top-0 left-0 h-screen bg-black bg-opacity-50 overflow-y-scroll"
    @click.stop="$emit('dismiss')"
  >
    <div
      class="add-modal flex flex-col bg-white relative rounded-md mx-auto sm:mt-12 py-6 w-full sm:w-2/6 md:w-3/5 xl:w-2/5"
      @click.stop=""
    >
      <div class="heading">
        <h1 class="text-lg font-medium text-center mb-2 sm:mb-4">
          {{ patient ? 'Edit' : 'Add New' }} Patient
        </h1>
      </div>
      <div class="form px-4 sm:px-12 md:px-8 flex-grow overflow-y-scroll">
        <label for="name" class="text-sm font-normal text-gray-400">Name</label>
        <input
          v-model="name"
          class="border rounded border-gray-300 p-2 w-full mt-1 mb-2 outline-none"
          type="text"
          placeholder="Elon musk"
          autocomplete="on"
        />
        <label for="mobile" class="text-sm font-normal text-gray-400"
          >Mobile</label
        >
        <input
          v-model="mobile"
          class="border rounded border-gray-300 p-2 w-full mt-1 mb-2 outline-none"
          type="number"
          placeholder="0123456789"
          autocomplete="on"
        />
        <label for="email" class="text-sm font-normal text-gray-400"
          >Email</label
        >
        <input
          v-model="email"
          class="border rounded border-gray-300 p-2 w-full mt-1 mb-2 outline-none"
          type="email"
          placeholder="elonmusk@teslamotors.com"
          autocomplete="on"
        />
        <label for="gender" class="text-sm font-normal text-gray-400"
          >Gender</label
        >
        <select
          v-model="gender"
          class="border rounded border-gray-300 p-2 w-full mt-1 mb-2 outline-none"
        >
          <option disabled value="Select Gender">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <label for="bday" class="text-sm font-normal text-gray-400"
          >Birth Date</label
        >
        <input
          v-model="birthDate"
          type="date"
          class="border rounded border-gray-300 p-2 w-full mt-1 mb-2 outline-none"
          placeholder="dd-yy-mm"
          autocomplete="on"
        />
        <label for="address" class="text-sm font-normal text-gray-400"
          >Address</label
        >
        <textarea
          v-model="address"
          placeholder="street address"
          class="border rounded border-gray-300 p-2 w-full mt-1 mb-2 outline-none"
          autocomplete="on"
        ></textarea>
        <label for="pincode" class="text-sm font-normal text-gray-400"
          >Pincode</label
        >
        <input
          v-model="pincode"
          class="border rounded border-gray-300 p-2 w-full mt-1 mb-2 outline-none"
          type="number"
          placeholder="416010"
          autocomplete="on"
        />
        <label for="city" class="text-sm font-normal text-gray-400">City</label>
        <input
          v-model="city"
          class="border rounded border-gray-300 p-2 w-full mt-1 mb-2 outline-none"
          type="text"
          placeholder="Kolhapur"
          autocomplete="on"
        />
      </div>
      <div class="mt-8 flex btn px-4 sm:px-12 md:px-8">
        <MyButton class="mr-4" :loading="loading" @click.native="addPatient"
          >Submit</MyButton
        >
        <MyButton class="cancel-btn" @click.native="$emit('dismiss')"
          >Cancel</MyButton
        >
      </div>
    </div>
  </div>
</template>

<script>
import { AddPatientValidation } from '@/utils/validation'
export default {
  // eslint-disable-next-line
  props: ['patient'],
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
  mounted() {
    if (this.patient) {
      this.name = this.patient.name
      this.mobile = this.patient.mobile
      this.email = this.patient.email
      this.gender = this.patient.gender
      this.birthDate = this.patient.birthDate
      this.address = this.patient.address
      this.pincode = this.patient.pincode
      this.city = this.patient.city
    }
  },
  methods: {
    async addPatient() {
      this.loading = true
      try {
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
          this.loading = false
          this.$toast.error(validation.error.message)
          return
        }

        if (!this.patient) {
          const result = await this.$axios.$post(`/patients`, {
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
          this.$emit('PatientData', result)
          this.$router.push('/patients')
          this.$toast.success('Add Patient Successfully')
        } else {
          const res = await this.$axios.$put(`/patients/${this.patient.id}`, {
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
          this.$emit('patientData', res)
          const path = this.$route.path
          this.$router.push(`${path}`)
          this.$toast.success('Add Updated Successfully')
        }
      } catch (error) {
        this.$toast.error(error.message)
      }
      this.loading = false
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
  .add-modal {
    height: 90vh;
  }
  .btn {
    min-height: 30px;
  }
  .heading {
    min-height: 30px;
  }
  .form {
    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-track {
      background: #f9f9f9;
    }
    &::-webkit-scrollbar-thumb {
      background: #888;
    }
  }
}
</style>
