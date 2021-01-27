<template>
  <div id="inventory-summary">
    <div class="list relative border border-gray-300 rounded-xl mt-14">
      <div class="container py-3">
        <div class="title py-4">
          <p class="text-black text-center font-semibold">Inventory Summary</p>
        </div>
        <div class="container-1">
          <p
            v-if="itemsToBeStocked.length == 0"
            class="text-gray-400 absolute top-1/2 left-1/3"
          >
            All products in stock
          </p>
          <div v-else class="header flex py-3 justify-between">
            <p class="pl-6">Product</p>
            <p class="pr-4">Quantity</p>
          </div>
        </div>
        <nuxt-link to="/products">
          <div class="container-2">
            <div
              v-for="(item, i) in itemsToBeStocked"
              :key="i"
              class="items py-5 mx-6 flex justify-between"
            >
              <p class="text-lg mb-1">{{ item.name }}</p>
              <h2 class="qty text-lg capitalize font-normal pr-3">
                {{ item.stock }}
              </h2>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { products } from '@/apollo/queries/products/restock.gql'
export default {
  data() {
    return {
      itemsToBeStocked: [],
    }
  },
  mounted() {
    this.fetchLowQtyProducts()
  },
  methods: {
    async fetchLowQtyProducts() {
      try {
        const { data } = await this.$apollo.query({
          query: products,
          variables: {
            limit: 25,
          },
        })
        this.itemsToBeStocked = data.products
      } catch (error) {
        this.$toast.error(error.message)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
#inventory-summary {
  .list {
    width: 350px;
    min-height: 65vh;

    @include for-phone-only {
      width: 300px;
      margin-inline: auto;
    }
  }
  .container-2 {
    max-height: 47vh;
    overflow-y: scroll;
    scrollbar-width: 0;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .title {
    padding-bottom: 24px;
    border-bottom: 1px solid #c4c4c4;
  }
  .items {
    padding-bottom: 10px;
    border-bottom: 1px solid #c4c4c4;
  }
}
</style>
