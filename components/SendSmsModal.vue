<template>
  <div
    id="sms"
    class="fixed w-full z-50 top-0 left-0 h-screen bg-black bg-opacity-50"
    @click.stop="$emit('dismiss')"
  >
    <div
      class="modal bg-white relative rounded-md mx-auto mt-12 py-6 px-12 md:px-8 sm:px-4 w-2/6 md:w-3/5 xl:w-2/5"
      @click.stop=""
    >
      <h1 class="text-lg font-medium text-center mb-8">Send Message</h1>
      <form autocomplete="on">
        <multi-select
          :options="patients"
          :selected-options="items"
          placeholder="select Patients"
          @select="onSelect"
        >
        </multi-select>
        <p class="text-base font-normal text-gray-400 my-4">
          <span class="text-lg text-black">{{ count }}</span> Pateints Selected
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
export default {
  components: {
    MultiSelect,
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
      patients: [
        {
          value: false,
          text: 'Loading...',
        },
      ],
    }
  },
  mounted() {
    this.fetchPatients()
  },
  methods: {
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
      for (const i in this.items) {
        patients.push(this.items[i].value)
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
