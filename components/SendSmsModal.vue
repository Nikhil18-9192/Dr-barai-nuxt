<template>
  <div
    id="sms"
    class="fixed w-full z-50 top-0 left-0 h-screen bg-black bg-opacity-50"
    @click.stop="$emit('dismiss')"
  >
    <div
      class="modal bg-white relative rounded-md mx-auto mt-12 py-6 px-4 sm:px-12 md:px-8 sm:px-4 w-full sm:w-2/6 md:w-3/5 xl:w-2/5"
      @click.stop=""
    >
      <h1 class="text-lg font-medium text-center mb-8">Send Message</h1>
      <form autocomplete="on">
        <multi-select
          :is-disabled="propsToPass()"
          :options="patients"
          :selected-options="items"
          placeholder="select Patients"
          @select="onSelect"
        >
        </multi-select>
        <p class="text-base font-normal text-gray-400 my-4">
          <span class="text-lg text-black">{{ count }}</span> Patients Selected
        </p>
        <label for="message" class="text-sm font-light text-gray-400"
          >Message</label
        >
        <textarea
          v-model="message"
          placeholder="Type your message here"
          class="border rounded border-gray-300 p-2 w-full mt-1 mb-2 outline-none placeholder-gray-400::placeholder text-sm h-40"
          autocomplete="on"
        ></textarea>
        <input
          id="sendAll"
          v-model="sendToAll"
          type="checkbox"
          value="sendToAll"
          @click="sendAll(sendToAll)"
        />
        <label for="sendAll" class="text-sm font-normal text-gray-400"
          >Send To All</label
        >
        <div class="mt-8 flex">
          <MyButton class="mr-4" :icon="icon" @click.native="submitNotification"
            >Send Now</MyButton
          >
          <MyButton class="cancel-btn" @click.native="$emit('dismiss')"
            >Cancel</MyButton
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { patients } from '@/apollo/queries/patient/patients.gql'
import { MultiSelect } from 'vue-search-select'
import { SendSmsModal } from '@/utils/validation'
export default {
  components: {
    MultiSelect,
  },
  props: {
    patient: {
      type: Object,
      default: () => null,
    },
  },
  data() {
    return {
      count: 0,
      searchText: '', // If value is falsy, reset searchText & searchItem
      items: [],
      lastSelectItem: {},
      icon: '/bell.svg',
      message: '',
      sendToAll: false,
      disabled: false,
      patients: [
        {
          value: false,
          text: 'Loading...',
        },
      ],
    }
  },
  mounted() {
    if (this.patient) {
      const selectedPatient = [
        {
          text: this.patient.name,
          value: this.patient.id,
        },
      ]
      this.items = selectedPatient
      this.count = 1
    } else {
      this.items = []
    }
    this.fetchPatients()
  },
  methods: {
    propsToPass() {
      let isDisable = false
      if (this.sendToAll || this.patient) {
        // eslint-disable-next-line
        return (isDisable = true)
      }
    },
    sendAll(status) {
      if (!status) {
        this.count = this.patients.length
      } else {
        this.count = 0
      }
    },
    onSelect(items, lastSelectItem) {
      this.items = items
      this.count = this.items.length
      this.lastSelectItem = lastSelectItem
    },
    // deselect option
    reset() {
      this.items = [] // reset
    },
    selectFromParentComponent() {
      this.items = _.unionWith(this.items, [this.options[0]], _.isEqual)
    },
    async fetchPatients() {
      this.patients = []
      try {
        const { data } = await this.$apollo.query({
          query: patients,
        })

        for (let i = 0; i < data.patients.length; i++) {
          const obj = {}
          obj.value = data.patients[i].id
          obj.text = data.patients[i].name
          this.patients.push(obj)
        }
      } catch (error) {
        const obj = {}
        obj.value = false
        obj.text = error.message
        this.patients.push(obj)
      }
    },
    async submitNotification() {
      const patients = []
      if (this.sendToAll) {
        for (const i in this.patients) {
          patients.push(this.patients[i].value)
        }
      } else {
        for (const i in this.items) {
          patients.push(this.items[i].value)
        }
      }
      if (patients.length < 1) {
        this.$toast.error('select patient')
        return
      }
      const validation = SendSmsModal({
        message: this.message,
      })
      if (validation.error) {
        this.$toast.error(validation.error.message)
        return
      }

      const res = await this.$axios.$post(`/notifications`, {
        patients,
        message: this.message,
        sendToAll: this.sendToAll,
      })
      this.$emit('dismiss')

      this.$emit('addNotify', res)
    },
  },
}
</script>

<style lang="scss" scopped>
#sms {
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
