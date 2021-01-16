<template>
  <div
    id="add-prescription"
    class="fixed w-full z-50 top-0 left-0 h-screen bg-black bg-opacity-50"
    @click="$emit('dismiss')"
  >
    <div
      class="add-modal bg-white relative rounded-md mx-auto mt-12 py-4 sm:py-6 px-4 sm:px-12 md:px-8 sm:px-4 w-2/6 md:w-3/5 xl:w-2/5"
      @click.stop=""
    >
      <h1 class="text-lg font-medium text-center mb-4 sm:mb-8">
        Add Clinical Notes
      </h1>
      <div class="form">
        <label for="complaints" class="text-sm font-light text-gray-400"
          >Complaints</label
        >
        <textarea
          v-model="complaints"
          placeholder="Add compaints"
          class="border rounded border-gray-300 p-2 w-full mt-1 mb-2 outline-none placeholder-gray-400::placeholder text-sm"
          autocomplete="on"
        ></textarea>
        <label for="observations" class="text-sm font-light text-gray-400"
          >Observations</label
        >
        <textarea
          v-model="observations"
          placeholder="Add observations"
          class="border rounded border-gray-300 p-2 w-full mt-1 mb-2 outline-none placeholder-gray-400::placeholder text-sm"
          autocomplete="on"
        ></textarea>
        <label for="diagnoses" class="text-sm font-light text-gray-400"
          >Diagnoses</label
        >
        <textarea
          v-model="diagnoses"
          placeholder="Add diagnoses"
          class="border rounded border-gray-300 p-2 w-full mt-1 mb-2 outline-none placeholder-gray-400::placeholder text-sm"
          autocomplete="on"
        ></textarea>
        <label for="notes" class="text-sm font-light text-gray-400"
          >Notes</label
        >
        <textarea
          v-model="notes"
          placeholder="Add notes"
          class="border rounded border-gray-300 p-2 w-full mt-1 mb-2 outline-none placeholder-gray-400::placeholder text-sm"
          autocomplete="on"
        ></textarea>
        <div class="mt-8 flex">
          <MyButton
            class="mr-4"
            :loading="loading"
            @click.native="submitClinicalNotes"
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
import { ClinicalNotesValidation } from '@/utils/validation'
export default {
  data() {
    return {
      complaints: '',
      observations: '',
      diagnoses: '',
      notes: '',
      loading: false,
    }
  },

  methods: {
    submitClinicalNotes() {
      const { complaints, observations, diagnoses, notes } = this
      const validation = ClinicalNotesValidation({
        complaints,
        observations,
        diagnoses,
        notes,
      })
      if (validation.error) {
        this.$toast.error(validation.error.message)
        return
      }
      const clinicalNotesData = {
        complaints,
        observations,
        diagnoses,
        notes,
      }
      this.$emit('clinicalNotesData', clinicalNotesData)
      this.$emit('dismiss')
    },
  },
}
</script>

<style lang="scss" scopped>
#add-prescription {
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
  select {
    option {
      color: #000;
    }
  }
  input {
    &::placeholder {
      color: #a1a1a1;
    }
  }
}
</style>
