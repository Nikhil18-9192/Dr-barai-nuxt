<template>
  <div
    id="consent-dialog"
    class="fiexd top-0 left-0 z-6 w-full h-screen bg-white fixed bg-opacity-70 z-10"
  >
    <div class="dialog flex flex-col">
      <div class="tlbr flex bg-gray-100 w-full">
        <h4>Consent Details</h4>
      </div>
      <form class="w-full p-4 flex flex-col" @submit.prevent="submitForm">
        <label>Dr. Name</label>
        <input
          v-model="drName"
          class="outline-none"
          type="text"
          placeholder="enter doctor's name"
        />
        <label>Disease</label>
        <textarea
          v-model="disease"
          cols="30"
          autocomplete="on"
          rows="6"
          type="text"
          placeholder="enter name of disease"
          class="outline-none"
        ></textarea>
        <label>Date & Time</label>
        <input
          v-model="consentDate"
          type="datetime-local"
          placeholder="select date"
        />
        <div class="py-4 action-v w-full flex">
          <MyButton class="mr-8" @click.native="submitForm">Submit</MyButton>
          <MyButton :secondary="true" @click.native="$emit('dismiss')"
            >Cancel</MyButton
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { consentFormValidation } from '~/utils/validation'
export default {
  name: 'ConsentDialog',
  data() {
    return {
      drName: 'Amit Barai',
      disease: '',
      consentDate: this.$dayjs().format('YYYY-MM-DDTHH:mm'),
    }
  },
  methods: {
    submitForm() {
      const { drName, disease, consentDate } = this
      const validation = consentFormValidation({ drName, disease, consentDate })
      if (validation.error) {
        this.$toast.error(validation.error.message)
        return 0
      }

      this.$emit('dismiss', { drName, disease, consentDate })
    },
  },
}
</script>

<style lang="scss" scoped>
#consent-dialog {
  .add-btn {
    width: 137px;
    height: 37px;
  }
  .dialog {
    position: relative;
    width: 100%;
    min-height: 100%;
    background: #fff;
    align-items: center;
    margin: 0 auto;

    .tlbr {
      position: relative;
      height: 50px;
      align-items: center;
      justify-content: center;
    }
    form {
      flex-grow: 1;
      position: relative;
      max-height: 100%;
      overflow-y: scroll;

      label {
        margin-bottom: 4px;
        font-size: 12px;
      }

      input,
      textarea {
        padding: 6px 12px;
        border-radius: 4px;
        margin-bottom: 16px;
        border: 0.5px solid rgba(0, 0, 0, 0.151);
      }
    }

    .action-v {
      height: 50px;
      align-items: center;
    }
  }
}
</style>
