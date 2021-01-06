<template>
  <div id="product-page">
    <AddProductModal
      v-if="modal"
      :product="productToEdit"
      @dismiss="newProduct"
      @updatedProduct="updatedProduct"
    />
    <div class="title flex justify-between my-8">
      <h1 class="text-2xl font-medium">Product List</h1>
      <MyButton :icon="addBtnIcon" @click.native="addNew"
        >Add New Product</MyButton
      >
    </div>

    <table class="product-list border-separate">
      <tbody>
        <tr class="text-gray-600 text-sm font-normal">
          <th
            class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200"
          >
            ID
          </th>
          <th
            class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200"
          >
            Product Name
          </th>
          <th
            class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200"
          >
            Stock Qty
          </th>
          <th
            class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200"
          >
            Price (INR)
          </th>
        </tr>
        <tr
          v-for="item in products"
          :key="item.id"
          class="bg-gray-100 my-6 text-sm font-normal cursor-pointer"
          @click="editProduct(item)"
        >
          <td class="p-3">{{ item.id }}</td>
          <td class="p-3">{{ item.name }}</td>
          <td class="p-3">{{ item.stock }}{{ item.stockingUnit }}</td>
          <td class="p-3">{{ item.retailPrice }}</td>
        </tr>
        <tr>
          <td v-if="!products.length">No products Yet</td>
        </tr>
      </tbody>
    </table>
    <div class="pagination flex justify-between">
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
      <div class="pagination flex justify-between outline-none">
        <div v-if="products.length" class="nextprev flex">
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
import { products } from '@/apollo/queries/products/products.gql'
export default {
  name: 'ProductsPage',
  data() {
    return {
      addBtnIcon: '/plus-circle.svg',
      totalItem: 0,
      modal: false,
      products: [],
      perPage: 5,
      totalPages: 0,
      currentPage: 1,
      maxPage: 5,
      productToEdit: {},
    }
  },
  computed: {},
  mounted() {
    this.fetchProducts()
    this.fetchTotalProductsCount()
  },
  methods: {
    async clickCallback(selectedPage) {
      this.currentPage = selectedPage
      const { data } = await this.$apollo.query({
        query: products,
        variables: {
          limit: this.perPage,
          start: selectedPage * this.perPage - this.perPage,
        },
      })
      this.patients = data.patients
    },
    next() {
      this.currentPage++
      if (this.currentPage > this.totalPages) {
        this.$toast.error('no pages')
        this.currentPage = this.totalPages
      }
      this.fetchProducts()
    },
    prev() {
      this.currentPage--
      if (this.currentPage === 0) {
        this.$toast.error('no pages')
        this.currentPage = 1
      }
      this.fetchProducts()
    },
    async fetchProducts() {
      this.$store.commit('SET_LOADING')
      const { data } = await this.$apollo.query({
        query: products,
        variables: {
          limit: this.perPage,
          start: this.currentPage * this.perPage - this.perPage,
        },
      })
      this.products = data.products
      this.$store.commit('UNSET_LOADING')
    },
    async fetchTotalProductsCount() {
      this.totalItem = await this.$axios.$get(
        'http://localhost:1337/products/count'
      )
      this.totalPages = Math.ceil(this.totalItem / this.perPage)
    },
    addNew() {
      this.productToEdit = null
      this.modal = true
    },
    editProduct(product) {
      this.productToEdit = product
      this.modal = true
    },
    newProduct(val) {
      if (val) {
        this.products.unshift(val)
      }
      this.modal = false
    },
    updatedProduct(val) {
      if (val) {
        const index = this.products.findIndex((p) => p.id === val.id)
        this.products[index] = val
      }
    },
  },
}
</script>

<style lang="scss" scoped>
#product-page {
  .add-btn {
    width: 180px;
    height: 37px;
    img {
      width: 20px;
      height: 20px;
    }
  }
  .product-list {
    border-spacing: 0 1.5em;
    width: 90%;
    th {
      text-align: left;
      font-weight: normal;
    }
  }
  button {
    outline: none;
  }
}
</style>
