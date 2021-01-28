<template>
  <div id="machine-selector" class="border p-4">
    <div class="search-select">
      <div class="search-input">
        <img class="w-6 h-6 icon" src="/search.svg" />

        <div class="collapse">
          <input
            v-model="search"
            class="border p-2 rounded-lg cursor-pointer w-full"
            placeholder="Search product"
            @input="onSearch"
          />
          <div v-if="search.length > 0 && products.length > 0" class="results">
            <div
              v-for="product in products"
              :key="product.id"
              class="item cursor-pointer"
              @click="onSelect(product)"
            >
              <h4>{{ product.name }}</h4>
            </div>
          </div>
          <div v-if="loading" class="text-sm spinner">Loading ...</div>
        </div>
      </div>
      <p class="pl-3 text-sm mt-4 text-blue-500">Selected Products</p>
      <ul class="selected-machines sm:pl-4">
        <li
          v-for="(item, i) in value"
          :key="`product-${i}`"
          class="machine mb-2"
        >
          <div class="dot mr-2"></div>
          <h4>{{ item.product ? item.product.name : '' }}</h4>
          <input
            v-model="item.quantity"
            suffix-label="Quantity"
            size="small"
            class="border w-14 text-center rounded-lg cursor-pointer"
            _type="number"
            @input="parseInt(item.quantity) <= 0 ? (item.quantity = 1) : ''"
          />
          <p
            class="cross text-red-600 ml-3 sm:ml-8"
            @click="removeSelection(i)"
          >
            X
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import query from '@/apollo/queries/products/search.gql'
export default {
  name: 'MachineSelector',
  components: {},
  props: {
    // eslint-disable-next-line vue/require-default-prop
    value: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data() {
    return {
      search: '',
      loading: false,
      products: [],
    }
  },
  computed: {},
  watch: {},
  async mounted() {},
  methods: {
    removeSelection(i) {
      const val = this.value
      val.splice(i, 1)
      this.$emit('input', val)
    },

    onSelect(product) {
      const selectedProducts = this.value || []
      if (this.value.findIndex((item) => item.id === product.id) === -1) {
        selectedProducts.push({
          product,
          quantity: 1,
        })
        this.$emit('input', selectedProducts)
        this.search = ''
      }
    },
    onSearch(search) {
      this.search.length > 0 ? this.fetchMachines() : (this.products = [])
    },
    async fetchMachines() {
      this.loading = true
      this.products = []
      const result = await this.$apollo.query({
        query,
        variables: { search: `${this.search}` },
      })
      const products = result.data.products ? result.data.products : []
      this.products = products
      this.loading = false
    },
  },
}
</script>

<style lang="scss" scopped>
#machine-selector {
  width: 100%;
  position: relative;

  .search-input {
    display: flex;
    align-items: center;
    position: relative;
    min-height: 50px;
    width: 100%;

    .collapse {
      position: absolute;
      left: 48px;
      background: #fff;

      @include for-phone-only {
        left: 0;
      }

      .results {
        border-top: 0.5px solid rgba(0, 0, 0, 0.089);
        box-shadow: 1px 4px 8px rgba(0, 0, 0, 0.11);
        border-radius: 4px;
        max-height: 100px;
        overflow-y: scroll;
        position: absolute;
        width: 100%;
        background: #fff;
        z-index: 5;
      }

      .item {
        padding: 8px;
        box-sizing: border-box;
        border-top: 0.5px solid rgba(0, 0, 0, 0.089);

        h4 {
          font-weight: 500;
          font-size: 14px;
        }

        &:first-child {
          border: none;
        }
      }
    }

    .spinner {
      position: absolute;
      top: 8px;
      right: 8px;
    }

    p {
      margin-top: 32px;
      margin-bottom: 8px;
    }
  }

  .selected-machines {
    .dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.733);

      @include for-phone-only {
        margin-right: 16px;
      }
    }

    .cross {
      cursor: pointer;
    }
    input {
      @include for-phone-only {
        max-width: 50px;
      }
    }
    .machine {
      display: flex;
      align-items: center;

      span {
        margin: 0;
      }
      h4 {
        color: rgba(0, 0, 0, 0.733);
        margin-right: 48px;
        font-weight: normal;
        font-size: 14px;

        @include for-phone-only {
          font-size: 12px;
          margin-right: 32px;
        }
      }
    }
  }
}
</style>
