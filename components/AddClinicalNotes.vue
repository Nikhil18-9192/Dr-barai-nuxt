<template>
  <div
    id="add-prescription"
    class="fixed w-full z-50 top-0 left-0 h-screen bg-black bg-opacity-50"
    @click="$emit('dismiss')"
  >
    <div
      class="add-modal flex flex-col bg-white relative rounded-md mx-auto sm:mt-12 py-4 sm:py-6 px-4 sm:px-12 md:px-8 sm:px-4 w-full sm:w-2/6 md:w-3/5 xl:w-2/5"
      @click.stop=""
    >
      <div class="heading h-14">
        <h1 class="text-lg font-medium text-center mb-4 sm:mb-8">
          Add Clinical Notes
        </h1>
      </div>

      <div class="form flex-grow">
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
      </div>
      <div class="mt-8 btn flex items-end">
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
</template>

<script>
import { ClinicalNotesValidation } from '@/utils/validation'
export default {
  // eslint-disable-next-line
  props: ['notesToEdit'],
  data() {
    return {
      complaints: '',
      observations: '',
      diagnoses: '',
      notes: '',
      loading: false,
    }
  },
  mounted() {
    if (this.notesToEdit) {
      this.complaints = this.notesToEdit.complaints
      this.observations = this.notesToEdit.observations
      this.diagnoses = this.notesToEdit.diagnoses
      this.notes = this.notesToEdit.notes
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
  .add-modal {
    height: 90vh;
  }
  .btn {
    height: 37px;
  }
}
</style>
