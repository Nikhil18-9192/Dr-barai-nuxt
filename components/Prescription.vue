<template>
  <div id="prescription">
    <AddPrescription v-if="addModal" @dismiss="addModal = false" />
    <div class="title-container mb-6 flex">
      <h1 class="text-xl font-medium">Prescription</h1>
      <img
        class="mx-2 mt-1"
        src="/add_btn.svg"
        alt=""
        @click="addModal = true"
      />
    </div>

    <table class="drugs-list w-full hidden">
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
            class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200 font-normal"
          >
            INSTRUCTIONS
          </th>
        </tr>
        <tr
          v-for="item in 4"
          :key="item"
          class="row my-6 text-sm font-normal text-center"
        >
          <td class="p-3">{{ item }}</td>
          <td class="p-3">{{ item + 1 }}</td>
          <td class="p-3">{{ item + 2 }}</td>
          <td class="p-3 flex justify-center">
            <p>{{ item + 3 }}</p>
            <img class="absolute ml-36 hidden" src="/edit_btn.svg" alt="" />
            <img class="absolute ml-56 hidden" src="/delete_btn.svg" alt="" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addModal: false,
    }
  },
}
</script>

<style lang="scss" scoped>
#prescription {
  margin-bottom: 55px;
  .drugs-list {
    border-bottom: 1px solid #c4c4c4;
    .row {
      &:hover {
        background: #c4c4c44b;
      }

      &:hover img {
        display: block;
      }
    }
  }
}
</style>
