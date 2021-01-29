<template>
  <div id="drugs-template">
    <div class="title flex justify-between my-8">
      <h1 class="text-xl sm:text-2xl font-medium mb-4">Drugs Template</h1>
    </div>
    <AddTemplate v-if="modal" v-model="template" @dismiss="clearModal" />
    <MyButton @click.native="modal = !modal">Create new Template</MyButton>
    <div class="flex flex-wrap">
      <div
        v-for="(item, i) in drugTemplates"
        :key="i"
        class="card relative p-4 my-6 border cursor-pointer"
        @click="editTemplate(item)"
      >
        <h1 class="text-blue-600 text-base border-b mb-3">{{ item.name }}</h1>
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
