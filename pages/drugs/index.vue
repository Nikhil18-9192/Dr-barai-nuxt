<template>
  <div id="drugs">
    <AddDrugsModal
      v-if="modal"
      :drug="drugToEdit"
      @dismiss="modal = false"
      @submitedDrug="getData"
      @editedDrug="getEditedDrug"
    />
    <div class="title flex justify-between my-8">
      <h1 class="text-xl sm:text-2xl font-medium mb-4">Drugs List</h1>
      <MyButton :icon="addBtnIcon" @click.native="addDrug"
        >Add New Drug</MyButton
      >
    </div>
    <div class="list flex-grow">
      <table
        v-if="$device.isDesktopOrTablet"
        class="drugs-list border-separate table-fixed"
      >
        <tbody>
          <tr class="text-gray-600 text-sm font-normal ml-2">
            <th
              class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200"
            >
              ID
            </th>
            <th
              class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200"
            >
              Name
            </th>
            <th
              class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200"
            >
              Type
            </th>
            <th
              class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200"
            >
              Strength
            </th>
          </tr>

          <tr
            v-for="(drug, i) in currentDrugs"
            :key="i"
            class="bg-gray-100 my-6 text-sm font-normal cursor-pointer"
            @click="editDrug(drug)"
          >
            <td class="p-3">{{ drug.id }}</td>
            <td class="p-3">
              {{ drug.name }}
            </td>
            <td class="p-3">{{ drug.drugType }}</td>
            <td class="p-3">{{ drug.strength }} {{ drug.dosageUnit }}</td>
          </tr>

          <tr>
            <td v-if="!currentDrugs.length">No Drugs Yet</td>
          </tr>
        </tbody>
      </table>
      <div v-if="$device.isMobile" id="drugs-info">
        <div
          v-for="(item, i) in currentDrugs"
          :key="i"
          class="card p-4 mb-4 border cursor-pointer rounded-lg shadow-lg"
          @click="editDrug(item)"
        >
          <p class="text-gray-600 text-xs font-normal border-b mb-3">
            Name: <span class="text-blue-600 text-base">{{ item.name }}</span>
          </p>
          <p class="text-gray-600 text-xs font-normal">
            type : {{ item.drugType }}
          </p>
          <p class="text-gray-600 text-xs font-normal">
            Strength : {{ item.strength }} {{ item.dosageUnit }}
          </p>
        </div>
      </div>
    </div>
    <div v-if="currentDrugs.length" class="pagination flex justify-between">
      <client-only>
        <paginate
          v-model="currentPage"
          :page-count="totalPages"
          :page-range="3"
          :margin-pages="2"
          :click-handler="clickCallback"
          :prev-text="'<<'"
          :next-text="'>>'"
          prev-class="flex items-center mr-2 outline-none"
          next-class="flex items-center ml-2 outline-none"
          :container-class="'flex'"
          :page-class="'text-gray-400 p-1 mr-2'"
          :active-class="'text-gray-900'"
          :page-link-class="'outline-none'"
        >
        </paginate>
      </client-only>
      <div
        v-if="$device.isDesktopOrTablet"
        class="pagination flex justify-between outline-none"
      >
        <div class="nextprev flex">
          <button
            class="bg-gray-200 p1 h-8 w-14 text-base font-medium rounded-l"
            @click="prev(currentPage)"
          >
            Prev
          </button>
          <button
            class="bg-gray-300 p-1 h-8 w-14 text-base font-medium rounded-r"
            @click="next(currentPage)"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import query from '@/apollo/queries/drug/drugs.gql'
export default {
  name: 'DrugPage',
  data() {
    return {
      addBtnIcon: '/plus-circle.svg',
      currentDrugs: [],
      totalItem: 0,
      perPage: 10,
      totalPages: 0,
      currentPage: 1,
      maxPage: 5,
      modal: false,
      drugToEdit: {},
    }
  },
  mounted() {
    this.fetchDrugs()
    this.fetchTotalProductsCount()
  },
  methods: {
    async clickCallback(selectedPage) {
      this.currentPage = selectedPage
      const { data } = await this.$apollo.query({
        query,
        variables: {
          limit: this.perPage,
          start: selectedPage * this.perPage - this.perPage,
        },
      })
      this.currentDrugs = data.drugs
    },
    next() {
      this.currentPage++
      if (this.currentPage > this.totalPages) {
        this.$toast.error('no pages')
        this.currentPage = this.totalPages
      }
      this.fetchDrugs()
    },
    prev() {
      this.currentPage--
      if (this.currentPage === 0) {
        this.$toast.error('no pages')
        this.currentPage = 1
      }
      this.fetchDrugs()
    },
    async fetchDrugs() {
      this.$store.commit('SET_LOADING')
      const { data } = await this.$apollo.query({
        query,
        variables: {
          limit: this.perPage,
          start: this.currentPage * this.perPage - this.perPage,
        },
      })
      this.currentDrugs = data.drugs
      this.$store.commit('UNSET_LOADING')
    },
    async fetchTotalProductsCount() {
      this.totalItem = await this.$axios.$get('/drugs/count')
      this.totalPages = Math.ceil(this.totalItem / this.perPage)
    },
    getData(drug) {
      this.currentDrugs.unshift(drug)
    },
    getEditedDrug(drug) {
      const index = this.currentDrugs.findIndex((d) => d.id === drug.id)
      this.currentDrugs[index] = drug
    },
    editDrug(drug) {
      this.drugToEdit = drug
      this.modal = true
    },
    addDrug() {
      this.drugToEdit = false
      this.modal = true
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
.drugs-list {
  border-spacing: 0 1.5em;
  width: 90%;
  table-layout: fixed;
  th {
    text-align: left;
    font-weight: normal;
  }
  td {
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
