<template>
  <div
    id="memo-modal"
    class="fixed w-full z-50 top-0 left-0 h-screen bg-black bg-opacity-50 overflow-y-scroll"
    @click.stop="$emit('dismiss')"
  >
    <div
      class="add-modal flex flex-col bg-white relative rounded-md mx-auto sm:mt-12 py-6 w-full sm:w-2/6 md:w-3/5 xl:w-2/5"
      @click.stop=""
    >
      <div class="heading">
        <h1 class="text-lg font-medium text-center mb-2 sm:mb-4">CASH MEMO</h1>
      </div>
      <div class="form px-4 sm:px-12 md:px-8 flex-grow overflow-y-scroll">
        <div class="w-full mb-4">
          <label for="city" class="text-xl font-normal text-gray-400"
            >Case Paper :</label
          >
          <input
            v-model="casePaper"
            class="border rounded border-gray-300 p-2 w-1/2 mt-1 mb-2 outline-none"
            type="number"
            autocomplete="on"
          />
        </div>
        <div class="w-full mb-4">
          <label for="city" class="text-xl font-normal text-gray-400"
            >F.U :</label
          >
          <input
            v-model="fuPrice"
            class="border rounded border-gray-300 p-2 w-1/2 mt-1 mb-2 outline-none"
            type="number"
            autocomplete="on"
          />
        </div>
        <div class="flex">
          <h1 class="text-xl font-normal text-gray-400">Procedure</h1>
          <AddButton @click.native="addEmptyProcedure" />
        </div>
        <div
          class="procedure-inputs mt-4 relative flex border border-gray-400 p-2 justify-between"
          v-for="(item, i) in procedures"
          :key="i"
        >
          <ProcedureInput v-model="procedures[i]" />
          <img
            class=" "
            src="/delete_btn.svg"
            alt=""
            @click="deleteProcedure(i)"
          />
        </div>
        <div class="products-wrapper mt-4">
          <label for="city" class="text-xl font-normal text-gray-400"
            >Products :</label
          >
          <div
            class="products flex justify-between items-center my-4"
            v-for="(item, i) in products"
            :key="i"
          >
            <p>{{ item.product.name }} -</p>

            <input
              type="number  "
              class="border w-28 h-12 text-center rounded cursor-pointer"
              :value="item.product.retailPrice"
            />
            -
            <input
              type="number  "
              class="border w-28 h-12 text-center rounded cursor-pointer"
              :value="item.quantity"
            />
            =
            <input
              type="number "
              class="border w-28 h-12 text-center rounded cursor-pointer"
              :placeholder="item.quantity * item.product.retailPrice"
              disabled
            />
          </div>
        </div>
        <div class="prescription-wrapper mt-8">
          <label for="city" class="text-xl font-normal text-gray-400"
            >Products :</label
          >
          <table
            v-if="prescriptions.length && $device.isDesktopOrTablet"
            class="drugs-list w-full table-fixed mt-4"
          >
            <tbody>
              <tr class="bg-gray-100 text-black-400 text-sm">
                <th
                  class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200 font-normal"
                >
                  DRUG
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
                v-for="(item, i) in prescriptions"
                :key="i"
                class="row my-6 text-sm font-normal text-center"
              >
                <td v-if="item" class="p-3">
                  {{ item.name ? item.name : item.drug.name }}
                </td>
                <td class="p-3">
                  {{
                    item.frequency == null || item.frequency.frequency == null
                      ? '---'
                      : item.frequency.frequency
                  }}
                </td>
                <td class="p-3">
                  {{
                    item.frequency == null ||
                    item.frequency.drugDuration == null
                      ? '---'
                      : item.frequency.drugDuration +
                        ' ' +
                        item.frequency.drugDurationFor
                  }}
                </td>
                <td class="p-3 flex mr-20 instructions-container">
                  <p>
                    {{
                      item.frequency == null ||
                      item.frequency.instructions == null
                        ? '---'
                        : item.frequency.instructions
                    }}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="mt-8 flex btn px-4 sm:px-12 md:px-8">
        <MyButton class="mr-4" :loading="loading" @click.native="addMemo"
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
export default {
  name: 'CashMemoModal',
  props: ['products', 'prescriptions'],
  data() {
    return {
      loading: false,
      casePaper: 500,
      fuPrice: 100,
      procedures: [{}],
      total: '',
    }
  },
  methods: {
    addEmptyProcedure() {
      this.procedures.push({})
    },
    deleteProcedure(i) {
      this.procedures.splice(i, 1)
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
    height: 90vh;
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
