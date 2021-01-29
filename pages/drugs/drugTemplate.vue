<template>
  <div id="drugs-template">
    <div class="title flex justify-between my-8">
      <h1 class="text-xl sm:text-2xl font-medium mb-2">Drugs Template</h1>
    </div>
    <AddTemplate v-if="modal" v-model="template" @dismiss="clearModal" />
    <MyButton @click.native="modal = !modal">Create new Template</MyButton>
    <div class="flex flex-wrap">
      <div
        v-for="(item, i) in drugTemplates"
        :key="i"
        class="card relative p-4 my-6 border cursor-pointer rounded-lg shadow-lg"
        @click="editTemplate(item)"
      >
        <div class="flex border-b">
          <h1 class="text-blue-600 text-base mb-3">{{ item.name }}</h1>

          <img
            class="absolute right-2"
            src="/delete_btn.svg"
            alt=""
            @click.stop="deleteTemplate(item)"
          />
        </div>
        <p v-for="(temp, j) in item.template" :key="j">{{ temp.drug.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      template: {},
      drugTemplates: [],
      modal: false,
      templateIndexToEdit: -1,
    }
  },

  watch: {
    template: {
      handler(val) {
        this.fetchTemplates()
      },
    },
  },

  mounted() {
    this.fetchTemplates()
  },
  methods: {
    async fetchTemplates() {
      try {
        const { data } = await this.$axios.get(`/drugs-templates`)
        this.drugTemplates = data
      } catch (error) {
        this.$toast.error(error.message)
      }
    },
    async deleteTemplate(item) {
      try {
        const response = await this.$axios.$delete(
          `/drugs-templates/${item.id}`
        )
        if (response) {
          this.$toast.success('Template deleted.')
          this.fetchTemplates()
        }
      } catch (error) {
        this.$toast.error(error.message)
      }
    },
    editTemplate(item) {
      this.template = item
      this.modal = true
    },
    clearModal() {
      this.template = {}
      this.modal = false
    },
  },
}
</script>

<style lang="scss" scoped>
.add-btn {
  width: 180px;
  height: 37px;
  img {
    width: 20px;
    height: 20px;
  }
}
.card {
  width: 45%;
  margin-right: 25px;
  @include for-phone-only {
    width: 100%;
  }
}
</style>
