<template>
  <div id="prescription py-6">
    <AddAppointmentProducts
      v-if="productModal"
      :edit-product="product[productIndexToEdit]"
      @addProduct="submitProductData"
      @updateProduct="updateProduct"
      @dismiss="clearModal"
    />
    <div class="title-container flex mb-1 items-center">
      <div class="flex">
        <h1 class="text-xl font-medium">Products</h1>
        <AddButton @click.native="productModal = true" />
      </div>
    </div>
    <div ref="content">
      <table
        v-if="product.length && $device.isDesktopOrTablet"
        class="drugs-list w-full table-fixed"
      >
        <tbody>
          <tr class="bg-gray-100 text-black-400 text-sm">
            <th
              class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200 font-normal"
            >
              PRODUCT
            </th>
            <th
              class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200 font-normal"
            >
              QUANTITY
            </th>
            <th
              class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200 font-normal"
            >
              DOSAGE & FREQUENCY
            </th>
            <th
              class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200 font-normal"
            >
              DURATION
            </th>
            <th
              class="py-3 pr-8 border border-t-0 border-l-0 border-r-0 border-gray-200 font-normal"
            >
              INSTRUCTIONS
            </th>
          </tr>
          <tr
            v-for="(item, i) in product"
            :key="i"
            class="row my-6 text-sm font-normal text-center"
          >
            <td v-if="item" class="p-3">
              {{ item.product.name }}
            </td>
            <td v-if="item" class="p-3">{{ item.quantity }}</td>
            <td class="p-3">
              {{
                item.frequency && item.frequency.frequency
                  ? item.frequency.frequency
                  : '---'
              }}
            </td>
            <td class="p-3">
              {{
                item.frequency && item.frequency.drugDuration
                  ? item.frequency.drugDuration +
                    ' ' +
                    item.frequency.drugDurationFor
                  : '---'
              }}
            </td>
            <td class="p-3 flex mr-20 instructions-container">
              <p>
                {{
                  item.frequency && item.frequency.instructions
                    ? item.frequency.instructions
                    : '---'
                }}
              </p>
              <img
                class="absolute right-20 hidden"
                src="/edit_btn.svg"
                alt=""
                @click="editProduct(i)"
              />
              <img
                class="absolute right-12 hidden"
                src="/delete_btn.svg"
                alt=""
                @click="deleteProduct(i)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div ref="phone">
      <div v-if="product.length && $device.isMobile" id="product-info">
        <div
          v-for="(item, i) in product"
          :key="i"
          class="card relative p-4 mb-4 border cursor-pointer rounded-lg shadow-lg"
        >
          <img
            class="absolute right-10"
            src="/edit_btn.svg"
            alt=""
            @click="editProduct(i)"
          />
          <img
            class="absolute right-2"
            src="/delete_btn.svg"
            alt=""
            @click="deleteProduct(i)"
          />
          <p class="text-gray-600 text-xs font-normal border-b mb-3">
            PRODUCT:
            <span class="text-blue-600 text-base">
              {{ item.name ? item.name : item.product.name }}</span
            >
          </p>
          <p class="text-gray-600 text-xs font-normal">
            QUANTITY:
            <span class="text-blue-600 text-base"> {{ item.quantity }}</span>
          </p>
          <p class="text-gray-600 text-xs font-normal">
            DOSAGE & FREQUENCY :
            {{
              item.frequency && item.frequency.frequency
                ? item.frequency.frequency
                : '---'
            }}
          </p>
          <p class="text-gray-600 text-xs font-normal">
            DURATION :
            {{
              item.frequency && item.frequency.drugDuration
                ? item.frequency.drugDuration +
                  ' ' +
                  item.frequency.drugDurationFor
                : '---'
            }}
          </p>
          <p class="instructions text-gray-600 text-xs font-normal">
            INSTRUCTIONS :
            {{
              item.frequency && item.frequency.instructions
                ? item.frequency.instructions
                : '---'
            }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import query from '@/apollo/queries/drugs-template/drugsTemplate.gql'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
pdfMake.vfs = pdfFonts.pdfMake.vfs
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['value'],
  data() {
    return {
      productModal: false,
      productIndexToEdit: -1,
      product: [],
      templates: [],
      search: '',
      loading: false,
    }
  },
  watch: {
    value: {
      handler(val) {
        if (val.length > 0) {
          this.product = val
        }
      },
    },
  },

  mounted() {
    // this.submitProductData()
    if (this.value.length > 0) {
      this.product.push(this.value)
    }
  },

  methods: {
    generatePDF() {
      if (!this.value.length) return
      const docDefinition = {
        content: [
          {
            layout: 'lightHorizontalLines',
            table: {
              headerRows: 1,
              widths: ['*', 'auto', 'auto', '*', 'auto'],

              body: [
                [
                  'Product',
                  'Quantity',
                  'Frequency',
                  'Duration',
                  'Instructions',
                ],
                ...this.value.map((v) => this.parsePrescriptionIntoRow(v)),
              ],
            },
          },
        ],
      }
      pdfMake.createPdf(docDefinition).open()
    },
    submitProductData(val) {
      if (val) {
        this.product.push(val)
      }
      this.productModal = false
      this.$emit('input', this.product)
    },
    updateProduct(val) {
      this.product[this.productIndexToEdit] = val
      this.productModal = false
      this.productIndexToEdit = -1
      this.$emit('input', this.product)
    },

    editProduct(index) {
      this.productIndexToEdit = index
      this.productModal = true
    },
    deleteProduct(index) {
      this.product.splice(index, 1)
      this.$emit('input', this.product)
    },
    clearModal() {
      this.productModal = false
      this.productIndexToEdit = -1
    },
    parsePrescriptionIntoRow(item) {
      return [
        item.product.name,
        item.quantity,
        `${
          item.frequency.frequency
            ? item.frequency.frequency.replaceAll('_', ' ')
            : '---'
        }`,
        `${item.frequency.drugDuration} ${item.frequency.drugDurationFor}`,
        item.frequency.instructions,
      ]
    },
  },
}
</script>

<style lang="scss" scoped>
#prescription {
  .drugs-list {
    width: 100%;
    border-bottom: 1px solid #c4c4c4;
  }
}
.title-container {
  @include for-phone-only {
    display: block;
  }
}
.selection {
  margin: 15px 0;
  align-items: center;
}
.generatePdf {
  @include for-phone-only {
    width: 8%;
  }
}
.instructions-container {
  justify-content: space-evenly;
  margin-left: 25px;
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
td {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.row {
  &:hover {
    background: #c4c4c411;
  }

  &:hover img {
    display: block;
  }
  img {
    padding: 4px;
    &:hover {
      transform: scale(1.05);
      cursor: pointer;
    }
  }
}
.instructions {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.card {
  &:hover img {
    display: block;
  }
}
.add-btn {
  width: 180px;
  height: 37px;
}
</style>
