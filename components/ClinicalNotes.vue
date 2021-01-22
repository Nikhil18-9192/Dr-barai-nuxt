<template>
  <div id="clinical-notes">
    <AddClinicalNotes
      v-if="notesModal"
      :notes-to-edit="currentNotes"
      @dismiss="notesModal = false"
      @clinicalNotesData="submitClinicalNotes"
    />
    <div class="title-container mb-6 flex">
      <h1 class="text-xl font-medium">Clinical Notes</h1>
      <AddButton
        v-if="!currentNotes.observations"
        @click.native="notesModal = true"
      />
    </div>
    <div v-if="currentNotes.observations" class="container relative">
      <p class="my-5 text-base font-normal">
        Complaints: {{ currentNotes.complaints }}
      </p>
      <p class="my-5 text-base font-normal">
        Observations: {{ currentNotes.observations }}
      </p>
      <p class="my-5 text-base font-normal">
        Diagnosis: {{ currentNotes.diagnoses }}
      </p>
      <p class="my-5 text-base font-normal">Notes: {{ currentNotes.notes }}</p>
      <div class="line"></div>
      <div class="edit-btns absolute flex bottom-4 right-0 hidden">
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
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
  },
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
  margin-bottom: 55px;
  .line {
    border-bottom: 1px solid #c4c4c4;
  }
  .container {
    &:hover .edit-btns {
      display: block;
      display: flex;
    }
  }
}
</style>
