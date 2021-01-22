<template>
  <div id="clinical-notes">
    <AddClinicalNotes
      v-if="notesModal"
      :notes-to-edit="notes"
      @dismiss="notesModal = false"
      @clinicalNotesData="submitClinicalNotes"
    />
    <div class="title-container mb-6 flex">
      <h1 class="text-xl font-medium">Clinical Notes</h1>
      <AddButton v-if="!notes" @click.native="notesModal = true" />
    </div>
    <div v-if="notes" class="container relative">
      <p class="my-5 text-base font-normal">
        Complaints: {{ notes.complaints }}
      </p>
      <p class="my-5 text-base font-normal">
        Observations: {{ notes.observations }}
      </p>
      <p class="my-5 text-base font-normal">Diagnosis: {{ notes.diagnoses }}</p>
      <p class="my-5 text-base font-normal">Notes: {{ notes.notes }}</p>
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
    clinicalNotes: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      notesModal: false,
      addNotes: false,
    }
  },
  computed: {
    notes() {
      if (this.$route.name === 'appointments-newAppointment') {
        return this.addNotes
      } else if (Object.entries(this.clinicalNotes).length !== 0) {
        return this.clinicalNotes
      } else return false
    },
  },
  methods: {
    submitClinicalNotes(val) {
      if (val) {
        this.addNotes = val
      }
      this.notesModal = false
    },
    editNotes() {
      this.notesModal = true
    },
    deleteNotes() {
      this.addNotes = false
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
