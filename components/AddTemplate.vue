<template>
  <div
    id="add-template"
    class="fixed w-full z-50 top-0 left-0 h-screen bg-black bg-opacity-50"
    @click="$emit('dismiss')"
  >
    <div
      class="add-modal flex flex-col bg-white relative rounded-md mx-auto sm:mt-12 py-4 sm:py-6 px-4 sm:px-12 md:px-8 sm:px-4 w-full sm:w-2/6 md:w-3/5 xl:w-2/5"
      @click.stop=""
    >
      <AddPrescription
        v-if="modal"
        :edit-prescription="drugTemplate.template[templateIndexToEdit]"
        @addPrescription="submitTemplateData"
        @updatePrescription="updateTemplate"
        @dismiss="clearModal"
      />
      <div class="title-container flex mb-1 items-center">
        <div class="flex">
          <h1 class="text-xl font-medium">Create Template</h1>
          <AddButton @click.native="modal = true" />
        </div>

        <MyButton
          class="save-btn absolute right-4"
          :loading="loading"
          @click.native="saveTemplateData"
          >Save</MyButton
        >
      </div>
      <input
        v-model="drugTemplate.name"
        class="border border-black border-solid my-4 outline-none"
        type="text"
        placeholder="Enter name for Template"
      />
      <div
        v-if="drugTemplate.template && drugTemplate.template.length"
        id="template-info"
      >
        <div
          v-for="(item, i) in drugTemplate.template"
          :key="i"
          class="card relative p-4 mb-4 border cursor-pointer"
        >
          <img
            class="absolute right-10"
            src="/edit_btn.svg"
            alt=""
            @click="editTemplate(i)"
          />
          <img
            class="absolute right-2"
            src="/delete_btn.svg"
            alt=""
            @click="deleteTemplate(i)"
          />
          <p class="text-gray-600 text-xs font-normal border-b mb-3">
            DRUG:
            <span class="text-blue-600 text-base">
              {{ item.name ? item.name : item.drug.name }}</span
            >
          </p>

          <p class="text-gray-600 text-xs font-normal">
            DOSAGE & FREQUENCY :
            {{
              item.frequency == null || item.frequency.frequency == null
                ? '---'
                : item.frequency.frequency
            }}
          </p>
          <p class="text-gray-600 text-xs font-normal">
            DURATION :
            {{
              item.frequency == null || item.frequency.drugDuration == null
                ? '---'
                : item.frequency.drugDuration +
                  ' ' +
                  item.frequency.drugDurationFor
            }}
          </p>
          <p class="instructions text-gray-600 text-xs font-normal">
            INSTRUCTIONS :
            {{
              item.frequency == null || item.frequency.instructions == null
                ? '---'
                : item.frequency.instructions
            }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddTemplate',
  // eslint-disable-next-line vue/require-prop-types
  props: ['value'],
  data() {
    return {
      drugTemplate: {
        name: '',
        template: [],
      },
      modal: false,
      loading: false,
      templateIndexToEdit: -1,
    }
  },
  mounted() {
    if (Object.keys(this.value).length) {
      this.drugTemplate = this.value
    }
  },
  methods: {
    submitTemplateData(val) {
      if (val) {
        this.drugTemplate.template.push(val)
      }
      this.modal = false
    },
    async saveTemplateData() {
      this.loading = true

      if (this.drugTemplate.name == null || this.drugTemplate.name === '') {
        this.$toast.error('Please enter a name for template')
      } else if (
        this.drugTemplate.template == null ||
        this.drugTemplate.template.length === 0
      ) {
        this.$toast.error('Please add an item')
      } else {
        try {
          const sanitizedTemplate = this.drugTemplate.template.map((item) => ({
            drug: item.drug.id,
            frequency: item.frequency,
          }))
          let response = ''
          if (this.drugTemplate.id) {
            response = await this.$axios.$put(
              `/drugs-templates/${this.drugTemplate.id}`,
              {
                template: sanitizedTemplate,
                name: this.drugTemplate.name,
              }
            )
          } else {
            response = await this.$axios.$post(`/drugs-templates`, {
              template: sanitizedTemplate,
              name: this.drugTemplate.name,
            })
          }
          this.$emit('dismiss')
          this.$emit('input', response)
        } catch (error) {
          this.$toast.error(error.message)
        }
      }
      this.loading = false
    },
    updateTemplate(val) {
      this.drugTemplate.template[this.templateIndexToEdit] = val
      this.modal = false
      this.templateIndexToEdit = -1
    },

    editTemplate(index) {
      this.templateIndexToEdit = index
      this.modal = true
    },
    deleteTemplate(index) {
      this.drugTemplate.template.splice(index, 1)
    },
    clearModal() {
      this.modal = false
      this.templateIndexToEdit = -1
    },
  },
}
</script>

<style lang="scss" scoped>
#add-template {
  @include for-phone-only {
    padding-inline: 15px;
  }
}
.add-btn {
  width: 180px;
  height: 37px;
  img {
    width: 20px;
    height: 20px;
  }
}
.title-container {
  @include for-phone-only {
    display: block;
    .save-btn {
      position: relative;
      margin-top: 15px;
      margin-left: 15px;
    }
  }
}
</style>
