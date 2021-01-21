<template>
  <div id="view-sms" class="py-8">
    <div class="message-info flex-col flex">
      <p for="message" class="text-2xl font-medium capitalize">Message</p>
      <p class="text-gray-400 text-sm font-normal">
        {{
          formatter.formatDate(notification.createdAt) +
          ' at ' +
          formatter.formatTime(notification.createdAt)
        }}
      </p>
      <textarea
        :placeholder="notification.message"
        class="border rounded border-gray-300 p-2 w-full sm:w-2/4 mt-1 mb-2 outline-none placeholder-gray-400::placeholder text-sm"
        disabled
      ></textarea>
    </div>

    <div class="patients flex-grow">
      <h4>Sent To</h4>
      <table
        v-if="$device.isDesktopOrTablet"
        class="patient-list table-fixed w-full"
      >
        <tbody>
          <tr class="text-gray-400 text-sm font-normal">
            <th
              class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200 text-left"
            >
              Id
            </th>
            <th
              class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200 text-left"
            >
              Name
            </th>
            <th
              class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200 text-left"
            >
              Mobile
            </th>
            <th
              class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200 text-left"
            >
              Address
            </th>
          </tr>
          <tr
            v-for="item in paginateItem"
            :key="item.id"
            class="text-sm font-normal"
          >
            <td
              class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200"
            >
              {{ item.id }}
            </td>
            <td
              class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200"
            >
              {{ item.name }}
            </td>
            <td
              class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200"
            >
              {{ item.mobile }}
            </td>
            <td
              class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200"
            >
              {{ item.address }}
            </td>
          </tr>
        </tbody>
      </table>
      <SmsLogCard
        v-if="$device.isMobile"
        class="mt-3"
        :card-info="paginateItem"
      />
    </div>
    <div v-if="paginateItem.length" class="pagination flex justify-between">
      <client-only>
        <paginate
          v-model="currentPage"
          :page-count="totalPages"
          :page-range="3"
          :margin-pages="2"
          :click-handler="clickCallback"
          :prev-text="'<<'"
          :next-text="'>>'"
          prev-class="flex items-center mr-2"
          next-class="flex items-center ml-2"
          :container-class="'flex'"
          :page-class="'text-gray-400 p-1 mr-2'"
          :active-class="'text-gray-900'"
          :page-link-class="'outline-none'"
        >
        </paginate>
      </client-only>

      <div
        v-if="$device.isDesktopOrTablet"
        class="pagination flex justify-between"
      >
        <div class="nextprev flex">
          <button
            class="prev bg-gray-200 p1 h-8 w-14 text-base font-medium rounded-l"
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
import query from '@/apollo/queries/notifications/notification.gql'
import formatDateTime from '@/utils/formatDateTime'

export default {
  data() {
    return {
      notification: {},
      currentPage: 1,
      totalPages: 0,
      paginateItem: [],
      perPage: 10,
    }
  },
  computed: {
    formatter() {
      return formatDateTime
    },
  },
  mounted() {
    this.fetchNotification()
  },
  methods: {
    clickCallback(selectedPage) {
      if (selectedPage > this.totalPages) {
        this.$toast.error('no pages')
        return
      }
      if (selectedPage === 0) {
        this.$toast.error('no pages')
        return
      }
      this.currentPage = selectedPage
      this.paginateItem = this.notification.patients.slice(
        selectedPage * this.perPage - this.perPage,
        selectedPage * this.perPage
      )
    },
    next() {
      this.currentPage++
      if (this.currentPage > this.totalPages) {
        this.$toast.error('no pages')
        this.currentPage = this.totalPages
      }
      this.paginateItem = this.notification.patients.slice(
        this.currentPage * this.perPage - this.perPage,
        this.currentPage * this.perPage
      )
    },
    prev() {
      this.currentPage--
      if (this.currentPage === 0) {
        this.$toast.error('no pages')
        this.currentPage = 1
      }
      this.paginateItem = this.notification.patients.slice(
        this.currentPage * this.perPage - this.perPage,
        this.currentPage * this.perPage
      )
    },
    async fetchNotification() {
      const { data } = await this.$apollo.query({
        query,
        variables: {
          id: this.$route.params.id,
        },
      })
      this.notification = data.notification
      this.totalPages = Math.ceil(
        this.notification.patients.length / this.perPage
      )
      this.paginateItem = this.notification.patients.slice(0, this.perPage)
    },
  },
}
</script>

<style lang="scss" scopped>
td {
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.message-info {
  min-height: 150px;
}
.patients {
  min-height: 550px;
}
.pagination {
  button {
    outline: none;
  }
}
</style>
