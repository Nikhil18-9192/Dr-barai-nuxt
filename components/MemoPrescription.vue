<template>
  <div>
    <div class="prescription-wrapper my-8">
      <label for="city" class="text-base font-normal text-gray-400"
        >Prescriptions :</label
      >
      <table
        v-if="prescriptions.length && $device.isDesktopOrTablet"
        class="drugs-list w-full table-fixed mt-4"
      >
        <tbody>
          <tr class="bg-gray-100 text-black-400 text-sm">
            <th
              class="py-1 border border-t-0 border-l-0 border-r-0 border-gray-200 font-normal text-sm"
            >
              DRUG
            </th>
            <th
              class="py-1 border border-t-0 border-l-0 border-r-0 border-gray-200 font-normal text-sm"
            >
              DOSAGE & FREQUENCY
            </th>
            <th
              class="py-1 border border-t-0 border-l-0 border-r-0 border-gray-200 font-normal text-sm"
            >
              DURATION
            </th>
            <th
              class="py-1 pr-8 border border-t-0 border-l-0 border-r-0 border-gray-200 font-normal text-sm"
            >
              INSTRUCTIONS
            </th>
          </tr>
          <tr
            v-for="(item, i) in prescriptions"
            :key="i"
            class="row my-6 text-sm font-normal text-center"
          >
            <td v-if="item" class="p-1">
              {{ item.name ? item.name : item.drug.name }}
            </td>
            <td class="p-1">
              {{
                item.frequency == null || item.frequency.frequency == null
                  ? '---'
                  : item.frequency.frequency
              }}
            </td>
            <td class="p-1">
              {{
                item.frequency == null || item.frequency.drugDuration == null
                  ? '---'
                  : item.frequency.drugDuration +
                    ' ' +
                    item.frequency.drugDurationFor
              }}
            </td>
            <td class="p-1 flex instructions-container">
              <p>
                {{
                  item.frequency == null || item.frequency.instructions == null
                    ? '---'
                    : item.frequency.instructions
                }}
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="prescriptions.length && $device.isMobile" id="prescription-info">
      <div
        v-for="(item, i) in prescriptions"
        :key="i"
        class="card relative p-4 mb-4 border cursor-pointer rounded-lg shadow-lg"
      >
        <p class="text-gray-600 text-xs font-normal border-b mb-3">
          DRUG:
          <span class="text-blue-600 text-base">
            {{ item.name ? item.name : item.drug.name }}</span
          >
        </p>

        <p class="text-gray-600 text-xs font-normal">
          DOSAGE & FREQUENCY :
          {{
            item.frequency == null || item.frequency.frequency == null
              ? '---'
              : item.frequency.frequency
          }}
        </p>
        <p class="text-gray-600 text-xs font-normal">
          DURATION :
          {{
            item.frequency == null || item.frequency.drugDuration == null
              ? '---'
              : item.frequency.drugDuration +
                ' ' +
                item.frequency.drugDurationFor
          }}
        </p>
        <p class="instructions text-gray-600 text-xs font-normal">
          INSTRUCTIONS :
          {{
            item.frequency == null || item.frequency.instructions == null
              ? '---'
              : item.frequency.instructions
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MemoPrescription',
  props: ['prescriptions'],
}
</script>

<style></style>
