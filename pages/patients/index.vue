<template>
  <div id="patient-page">
    <div class="title flex justify-between my-8">
      <h1 class="text-2xl font-medium">Patient List</h1>
      <button
        class="bg-blue-500 rounded-md text-white text-sm font-medium add-btn flex items-center justify-center"
      >
        <img class="mr-3" src="/plus-circle.svg" alt="" />
        Add New Patient
      </button>
    </div>

    <table class="patient-list border-separate">
      <tr class="text-gray-600 text-sm font-normal">
        <th
          class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200"
        >
          ID
        </th>
        <th
          class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200"
        >
          Patient’s Name
        </th>
        <th
          class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200"
        >
          Mobile
        </th>
        <th
          class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200"
        >
          Session Count
        </th>
      </tr>
      <tr
        v-for="item in patients"
        :key="item.id"
        class="bg-gray-100 my-6 text-sm font-normal"
      >
        <td class="p-3">{{ item.id }}</td>
        <td class="p-3">{{ item.name }}</td>
        <td class="p-3">{{ item.phone }}</td>
        <td class="p-3">{{ item.date }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      patients: [
        {
          id: 'AB1swwaaaw',
          name: 'Elon Musk',
          phone: '9876543210',
          date: '30/12/2019 at 1:00 AM',
        },
        {
          id: 'AB1swwaaaw',
          name: 'Elon Musk',
          phone: '9876543210',
          date: '30/12/2019 at 1:00 AM',
        },
        {
          id: 'AB1swwaaaw',
          name: 'Elon Musk',
          phone: '9876543210',
          date: '30/12/2019 at 1:00 AM',
        },
        {
          id: 'AB1swwaaaw',
          name: 'Elon Musk',
          phone: '9876543210',
          date: '30/12/2019 at 1:00 AM',
        },
        {
          id: 'AB1swwaaaw',
          name: 'Elon Musk',
          phone: '9876543210',
          date: '30/12/2019 at 1:00 AM',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
#patient-page {
  .add-btn {
    width: 180px;
    height: 37px;
    img {
      width: 20px;
      height: 20px;
    }
  }
  .patient-list {
    // border-collapse: separate;
    border-spacing: 0 1.5em;
    width: 90%;
    th {
      text-align: left;
      font-weight: normal;
    }
  }
}
</style>
