<template>
  <div
    id="memo-modal"
    class="fixed w-full z-50 top-0 left-0 h-screen bg-black bg-opacity-50 overflow-y-scroll"
    @click.stop="$emit('dismiss')"
  >
    <div
      class="add-modal flex flex-col bg-white relative rounded-md mx-auto sm:mt-12 py-6 w-full sm:w-2/5 md:w-4/5 xl:w-2/5"
      @click.stop=""
    >
      <div class="heading">
        <img id="logo-img" src="/header-image.png" style="display: none" />
        <h1 class="text-lg font-medium text-center mb-2 sm:mb-4">CASH MEMO</h1>
      </div>
      <div class="form px-4 sm:px-12 md:px-8 flex-grow overflow-y-scroll">
        <div class="w-full mb-4 flex items-center">
          <label for="city" class="text-base font-normal text-gray-400 w-3/12"
            >Memo Title :</label
          >
          <input
            v-model="title"
            class="border rounded border-gray-300 p-2 w-1/2 mt-1 mb-2 outline-none w-9/12"
            type="text"
            autocomplete="on"
          />
        </div>
        <div class="w-full mb-4 flex items-center">
          <label for="city" class="text-base font-normal text-gray-400 w-3/12"
            >Date :</label
          >
          <input
            v-model="inputDate"
            class="border rounded border-gray-300 p-2 w-1/2 mt-1 mb-2 outline-none w-9/12"
            type="date"
            autocomplete="on"
          />
        </div>
        <div class="w-full mb-4 flex items-center">
          <label for="city" class="text-base font-normal text-gray-400 w-3/12"
            >Case Paper :</label
          >
          <input
            v-model="casePaper"
            class="border rounded border-gray-300 p-2 w-1/2 mt-1 mb-2 outline-none w-9/12"
            type="number"
            autocomplete="on"
          />
        </div>
        <div class="w-full mb-4 flex items-center">
          <label for="city" class="text-base font-normal text-gray-400 w-3/12"
            >F.U :</label
          >
          <input
            v-model="fuPrice"
            class="border rounded border-gray-300 p-2 w-1/2 mt-1 mb-2 outline-none w-9/12"
            type="number"
            autocomplete="on"
          />
        </div>
        <div class="flex">
          <h1 class="text-base font-normal text-gray-400">Procedure</h1>
          <AddButton @click.native="addEmptyProcedure" />
        </div>
        <div class="procedure-wrapper">
          <div
            class="procedure-inputs mt-4 relative flex justify-between"
            v-for="(item, i) in procedures"
            :key="i"
          >
            <ProcedureInput :procedure="item" v-model="procedures[i]" />
            <img
              class=" "
              src="/delete_btn.svg"
              alt=""
              @click="deleteProcedure(i)"
            />
          </div>
          <hr class="mt-4" />
          <div class="products-total flex items-center justify-end mt-4">
            <label for="city" class="text-base font-normal text-gray-400"
              >Procedure Total :
            </label>
            <input
              v-model="proceduresTotal"
              type="number "
              class="border w-28 p-2 text-center rounded cursor-pointer ml-2"
              placeholder="Product total"
              disabled
            />
          </div>
        </div>

        <div class="products-wrapper mt-4">
          <label for="city" class="text-base font-normal text-gray-400"
            >Product Prescriptions :</label
          >
          <div
            class="products sm:flex flex-wrap justify-between items-center my-4"
            v-for="(item, i) in memoProducts"
            :key="i"
          >
            <p class="mb-4 sm:mb-0">{{ item.product.name }} -</p>

            <input
              v-model="memoProducts[i].product.retailPrice"
              type="number"
              class="border w-24 sm:w-28 p-2 text-center rounded cursor-pointer"
              placeholder="Price"
            />
            *
            <input
              v-model="memoProducts[i].quantity"
              type="number"
              class="border w-24 sm:w-28 p-2 text-center rounded cursor-pointer"
              placeholder="Quantity"
            />
            =
            <input
              type="number "
              class="border w-24 sm:w-28 p-2 text-center rounded cursor-pointer"
              :value="item.product.retailPrice * item.quantity"
              placeholder="total"
              disabled
            />
          </div>
          <hr />
          <div class="products-total flex items-center justify-end mt-4">
            <label for="city" class="text-base font-normal text-gray-400"
              >Product Total :
            </label>
            <input
              v-model="productsTotal"
              type="number "
              class="border w-28 p-2 text-center rounded cursor-pointer ml-2"
              placeholder="Product total"
              disabled
            />
          </div>
          <div class="products-total flex items-center justify-end mt-4">
            <label for="city" class="text-base font-normal text-gray-400"
              >Discount(%) :
            </label>
            <input
              v-model="discount"
              type="number "
              class="border w-28 p-2 text-center rounded cursor-pointer ml-2 outline-none"
              placeholder="Product total"
            />
          </div>
          <div class="products-total flex items-center justify-end mt-4">
            <label for="city" class="text-base font-normal text-gray-400"
              >Final product Total :
            </label>
            <input
              v-model="afterDiscountTotal"
              type="number "
              class="border w-28 p-2 text-center rounded cursor-pointer ml-2"
              placeholder="Product total"
              disabled
            />
          </div>
        </div>
        <MemoPrescription :prescriptions="prescriptions" />
        <hr />
        <div class="products-total flex items-center justify-end mt-4">
          <label for="city" class="text-base font-normal text-gray-400"
            >Final Amount :
          </label>
          <input
            v-model="grandTotal"
            type="number "
            class="border w-28 p-2 text-center rounded cursor-pointer ml-2"
            placeholder="Product total"
            disabled
          />
        </div>
      </div>
      <div class="mt-8 flex btn px-4 sm:px-12 md:px-8">
        <MyButton class="mr-4" :loading="loading" @click.native="createMemo"
          >Submit</MyButton
        >
        <MyButton class="cancel-btn" @click.native="$emit('dismiss')"
          >Cancel</MyButton
        >
      </div>
    </div>
  </div>
</template>

<script>
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
pdfMake.vfs = pdfFonts.pdfMake.vfs

export default {
  name: 'CashMemoModal',
  props: ['products', 'prescriptions', 'patient'],
  data() {
    return {
      title: 'Cash Memo',
      inputDate: this.getDate(),
      loading: false,
      casePaper: 500,
      fuPrice: 100,
      procedures: [{ name: '', price: 0 }],
      memoProducts: [],
      discount: 10,
    }
  },
  mounted() {
    this.memoProducts = this.products
  },
  methods: {
    createBlob() {
      const imgToExport = document.getElementById('logo-img')
      const canvas = document.createElement('canvas')
      canvas.width = imgToExport.width
      canvas.height = imgToExport.height
      canvas.getContext('2d').drawImage(imgToExport, 0, 0)
      return canvas.toDataURL('image/png')
    },
    getDate() {
      return this.$dayjs().format('YYYY-MM-DD')
    },

    addEmptyProcedure() {
      this.procedures.push({})
    },
    deleteProcedure(i) {
      this.procedures.splice(i, 1)
    },
    createMemo() {
      const patientInfo = [
        `Patient Name: ${this.patient.name}`,
        `Phone: ${this.patient.mobile}`,
        `Address: ${this.patient.address}`,
      ]
      const casePaper = this.casePaper
      const fuPrice = this.fuPrice
      const procedures = this.procedures
      const procedureTotal = this.proceduresTotal
      const date = this.$dayjs(this.inputDate).format('DD/MM/YYYY')

      const docDefinition = {
        content: [
          {
            stack: [
              {
                image: this.createBlob(),
                width: 250,
                alignment: 'center',
              },
            ],
            style: 'header',
          },
          {
            text: this.title,
            alignment: 'center',
            margin: [0, 36, 0, 0],
            fontSize: 22,
            bold: true,
          },
          {
            margin: 16,
            text: '',
          },
          {
            text: `Date : ${date} `,
            margin: [8, 0, 8, 4],
            alignment: 'left',
          },
          {
            margin: 4,
            text: '',
          },
          ...patientInfo.map((info) => ({ text: info, margin: [8, 0, 0, 4] })),
          {
            margin: 8,
            text: '',
          },
          {
            margin: 16,
            text: '',
          },
          {
            text: `Case Paper = Rs ${casePaper} `,
            margin: [0, 0, 0, 4],
            alignment: 'right',
          },
          {
            text: `F.U  = Rs ${fuPrice} `,
            margin: [0, 0, 0, 4],
            alignment: 'right',
          },
          {
            margin: 8,
            text: '',
          },
          { text: `Procedures : `, margin: [0, 0, 0, 4], bold: true },
          {
            layout: 'lightHorizontalLines',
            table: {
              widths: ['*', 'auto', '*', 'auto'],

              body: [
                ['Name', '', '', { text: 'Charge', alignment: 'right' }],
                ...procedures.map((p) => this.parseProcedursIntoRow(p)),
                [
                  '',
                  '',
                  '',
                  {
                    text: `Procedure Total = Rs ${procedureTotal}`,
                    bold: true,
                    alignment: 'right',
                  },
                ],
              ],
            },
          },

          {
            margin: 8,
            text: '',
          },
          { text: `Product Prescriptions :`, margin: [0, 0, 0, 4], bold: true },
          {
            layout: 'lightHorizontalLines',
            table: {
              widths: ['*', 'auto', 'auto', 'auto', '*'],
              body: [
                [
                  'Name',
                  'Quantity',
                  'Frequency',
                  'Price',
                  { text: 'Total', alignment: 'right' },
                ],
                ...this.memoProducts.map((p) => this.parseProductIntoRow(p)),
                [
                  '',
                  '',
                  '',
                  '',
                  {
                    text: `Product Total = Rs ${this.productsTotal} `,
                    bold: true,
                    alignment: 'right',
                  },
                ],
                [
                  '',
                  '',
                  '',
                  '',
                  {
                    text: `Discount = ${this.discount}%`,
                    bold: true,
                    alignment: 'right',
                  },
                ],
                [
                  '',
                  '',
                  '',
                  '',
                  {
                    text: `After Discount = Rs ${this.afterDiscountTotal} `,
                    bold: true,
                    alignment: 'right',
                  },
                ],
              ],
            },
          },
          {
            margin: 8,
            text: '',
          },
          { text: `Other Prescriptions :`, margin: [0, 0, 0, 4], bold: true },
          {
            layout: 'lightHorizontalLines',
            table: {
              widths: ['*', 'auto', 'auto', '*'],
              body: [
                [
                  'Drug',
                  'Dosage & Frequency',
                  'Duration',
                  { text: 'Instructions', alignment: 'center' },
                ],
                ...this.prescriptions.map((p) =>
                  this.parsePrescriptionsIntoRow(p)
                ),
              ],
            },
          },
          {
            margin: 8,
            text: '',
          },
          {
            text: `Final Amount = Rs ${this.grandTotal} `,
            margin: [0, 0, 0, 4],
            bold: true,
            alignment: 'right',
          },
        ],
      }
      pdfMake.createPdf(docDefinition).open()
    },
    parseProductIntoRow(item) {
      return [
        item.product.name,
        { text: `${item.quantity}`, alignment: 'center' },
        item.frequency?.frequency.replaceAll('_', ' ') || '',
        `Rs ${item.product.retailPrice}`,
        {
          text: `Rs ${item.product.retailPrice * item.quantity}`,
          alignment: 'right',
        },
      ]
    },
    parsePrescriptionsIntoRow(item) {
      return [
        item.drug.name,
        `${
          item.frequency.frequency
            ? item.frequency.frequency.replaceAll('_', ' ')
            : '---'
        }`,
        `${item.frequency.drugDuration} ${item.frequency.drugDurationFor}`,
        item.frequency.instructions,
      ]
    },
    parseProcedursIntoRow(item) {
      return [
        item.name,
        '',
        '',
        { text: `Rs ${item.price}`, alignment: 'right' },
      ]
    },
  },
  computed: {
    productsTotal() {
      let productsTotal = 0
      for (let i = 0; i <= this.memoProducts.length - 1; i++) {
        productsTotal +=
          this.memoProducts[i].product.retailPrice *
          this.memoProducts[i].quantity
      }
      return productsTotal
    },
    proceduresTotal() {
      let total = 0
      for (let i = 0; i <= this.procedures.length - 1; i++) {
        total += parseInt(this.procedures[i].price)
      }
      return total
    },
    grandTotal() {
      return (
        parseInt(this.casePaper) +
        parseInt(this.fuPrice) +
        this.proceduresTotal +
        this.afterDiscountTotal
      )
    },
    afterDiscountTotal() {
      let discount = (this.productsTotal / 100) * this.discount
      return this.productsTotal - discount
    },
  },
}
</script>

<style lang="scss" scoped>
#memo-modal {
  .add-btn {
    width: 180px;
    height: 37px;
  }
  button {
    outline: none;
  }
  .cancel-btn {
    background: #f3f4f6;
    color: #000;
  }
  .add-modal {
    height: 85vh;
  }
  .btn {
    min-height: 30px;
  }
  .heading {
    min-height: 30px;
  }
  .form {
    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-track {
      background: #f9f9f9;
    }
    &::-webkit-scrollbar-thumb {
      background: #888;
    }
  }
  .placeholder-img {
    height: 200px;
    width: 200px;
    margin: 0 auto;
    cursor: pointer;
    border-radius: 50%;
  }
  .products {
    p {
      max-width: 100px;
    }
    input {
      outline: none;
    }
  }
}
</style>
