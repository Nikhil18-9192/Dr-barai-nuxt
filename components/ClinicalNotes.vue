<template>
  <div id="clinical-notes py-6">
    <AddClinicalNotes
      v-if="notesModal"
      :notes-to-edit="currentNotes"
      @dismiss="notesModal = false"
      @clinicalNotesData="submitClinicalNotes"
    />
    <div class="title-container flex mb-1">
      <h1 class="text-xl font-medium">Clinical Notes</h1>
      <AddButton
        v-if="!currentNotes.complaints"
        @click.native="notesModal = true"
      />
    </div>
    <div v-if="currentNotes.complaints" class="container relative text-sm">
      <p class="my-3 font-normal">
        <span class="text-blue-600">Complaints</span>:
        {{ currentNotes.complaints ? currentNotes.complaints : '' }}
      </p>
      <p class="my-3 font-normal">
        <span class="text-blue-600">Observations</span>:
        {{ currentNotes.observations ? currentNotes.observations : '' }}
      </p>
      <p class="my-3 font-normal">
        <span class="text-blue-600">Diagnosis</span>:
        {{ currentNotes.diagnoses ? currentNotes.diagnoses : '' }}
      </p>
      <p class="my-3 font-normal">
        <span class="text-blue-600">Notes</span>:
        {{ currentNotes.notes ? currentNotes.notes : '' }}
      </p>
      <div class="line"></div>
      <div class="edit-btns absolute flex bottom-0 right-0">
        <img
          class="mr-6 cursor-pointer"
          src="/edit_btn.svg"
          alt=""
          @click="editNotes"
        />
        <img
          class="cursor-pointer"
          src="/delete_btn.svg"
          alt=""
          @click="deleteNotes"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['value'],
  data() {
    return {
      notesModal: false,
      currentNotes: {},
      path: '',
    }
  },

  watch: {
    value: {
      handler(val) {
        this.currentNotes = val
      },
      deep: true,
    },
  },
  mounted() {},
  methods: {
    submitClinicalNotes(val) {
      if (val) {
        this.currentNotes = val
      }
      this.notesModal = false
      this.$emit('input', val)
    },
    editNotes() {
      this.notesModal = true
    },
    deleteNotes() {
      this.currentNotes = {}
      this.$emit('input', this.currentNotes)
    },
  },
}
</script>

<style lang="scss" scoped>
#clinical-notes {
  .line {
    border-bottom: 1px solid #c4c4c4;
  }
}
.container {
  &:hover .edit-btns {
    display: block;
    display: flex;
  }
}
.edit-btns {
  @include for-phone-only {
    display: flex;
  }
}
</style>
