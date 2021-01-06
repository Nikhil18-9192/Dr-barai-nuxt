<template>
  <div id="notification-page">
    <SendSmsModal
      v-if="modal"
      @dismiss="modal = false"
      @addNotify="addNotify"
    />
    <div class="title flex justify-between my-8">
      <h1 class="text-2xl font-medium">SMS Logs</h1>
      <MyButton :icon="addBtnIcon" @click.native="modal = true"
        >Create New SMS</MyButton
      >
    </div>

    <table class="notification-list border-separate">
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
            Sent To
          </th>
          <th
            class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200"
          >
            Message
          </th>
          <th
            class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200"
          >
            Sent At
          </th>
        </tr>

        <tr
          v-for="item in notifications"
          :key="item.id"
          class="bg-gray-100 my-6 text-sm font-normal cursor-pointer"
        >
          <td class="p-3">{{ item.id }}</td>
          <td class="p-3">{{ item.patients[0].name }}, ...</td>
          <td class="p-3">{{ text_truncate(item.message) }}</td>
          <td class="p-3">
            {{
              formatter.formatDate(item.createdAt) +
              ' at ' +
              formatter.formatTime(item.createdAt)
            }}
          </td>
        </tr>

        <tr>
          <td v-if="!notifications.length">No notifications Yet</td>
        </tr>
      </tbody>
    </table>
    <div class="pagination flex justify-between outline-none">
      <div class="flex mb-6 items-center">
        <button
          v-if="maxPage <= totalPages && currentPage > Math.ceil(maxPage / 2)"
          class="w-10 h-5 mr-2"
          @click="firstPage()"
        >
          first
        </button>

        <button
          v-for="item in pages"
          :key="item"
          :class="currentPage == item ? 'text-gray-900' : ''"
          class="p-1 mr-2 outline-none text-gray-400 font-normal"
          @click.prevent="paginatData(item)"
        >
          {{ item }}
        </button>

        <button
          v-if="
            maxPage <= totalPages &&
            currentPage <= totalPages - Math.ceil(maxPage / 2)
          "
          class="w-10 h-5 mr-2"
          @click="lastPage()"
        >
          last
        </button>
      </div>
      <div v-if="notifications.length" class="nextprev flex">
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
</template>

<script>
import { notifications } from '@/apollo/queries/notifications/notifications.gql'
import formatDateTime from '@/utils/formatDateTime'
export default {
  name: 'NotificationsPage',
  data() {
    return {
      modal: false,
      addBtnIcon: '/plus-circle.svg',
      totalItem: 0,
      notifications: [],
      perPage: 5,
      totalPages: 0,
      pages: [],
      start: 0,
      currentPage: 1,
      maxPage: 5,
      startPage: 0,
      endPage: 0,
      patient: null,
      total: 0,
    }
  },
  computed: {
    formatter() {
      return formatDateTime
    },
  },
  mounted() {
    this.fetchNotifications()
    this.fetchTotalNotificationCount()
  },
  methods: {
    text_truncate(str, length, ending) {
      if (length == null) {
        length = 30
      }
      if (ending == null) {
        ending = '...'
      }
      if (str.length > length) {
        return str.substring(0, length - ending.length) + ending
      } else {
        return str
      }
    },
    addNotify(val) {
      if (val) {
        this.notifications.unshift(val)
      }
    },

    async fetchNotifications() {
      this.$store.commit('SET_LOADING')
      const { data } = await this.$apollo.query({
        query: notifications,
        variables: {
          limit: this.perPage,
          start: this.start,
        },
      })
      this.notifications = data.notifications
      this.$store.commit('UNSET_LOADING')
      this.pagination()
    },
    async fetchTotalNotificationCount() {
      this.totalItem = await this.$axios.$get(
        'http://localhost:1337/notifications/count'
      )
      this.pagination()
    },
    pagination() {
      this.totalPages = Math.ceil(this.totalItem / this.perPage)
      if (this.totalPages <= this.maxPage) {
        this.startPage = 1
        this.endPage = this.totalPages
        const newPages = []
        for (let i = this.startPage; i <= this.endPage; i++) {
          newPages.push(i)
          this.pages = newPages
        }
        return
      } else if (
        this.currentPage >= Math.ceil(this.maxPage / 2) &&
        this.totalPages > this.maxPage
      ) {
        if (this.currentPage <= this.totalPages - 1) {
          this.startPage = this.currentPage - Math.floor(this.maxPage / 2)
          if (this.startPage === 0) {
            this.startPage = 1
          }
          this.endPage = this.currentPage + Math.floor(this.maxPage / 2)
          if (this.currentPage === this.totalPages - 1) {
            this.endPage = this.currentPage + 1
          }
          const newPages = []
          for (let i = this.startPage; i <= this.endPage; i++) {
            newPages.push(i)
            this.pages = newPages
          }
        }
      } else if (this.currentPage <= Math.ceil(this.maxPage / 2)) {
        this.startPage = 1
        this.endPage = this.maxPage
        const newPages = []
        for (let i = this.startPage; i <= this.endPage; i++) {
          newPages.push(i)
          this.pages = newPages
        }
      }

      if (this.currentPage === this.totalPages) {
        this.startPage = this.totalPages - (this.maxPage - 1)
        if (this.startPage <= 0) {
          this.startPage = 1
        }
        this.endPage = this.totalPages
        const newPages = []
        for (let i = this.startPage; i <= this.endPage; i++) {
          newPages.push(i)
          this.pages = newPages
        }
      }
    },
    firstPage() {
      this.paginatData(1)
    },
    lastPage() {
      this.paginatData(this.totalPages)
    },
    paginatData(pageNum) {
      this.currentPage = pageNum
      this.start = this.currentPage * this.perPage - this.perPage
      this.fetchNotifications()
    },
    next(pageNum) {
      this.$store.commit('SET_LOADING')
      if (pageNum > this.totalPages - 1) {
        this.$toast.error('There is no next page')
        this.$store.commit('UNSET_LOADING')
        return
      }
      const nextPage = pageNum + 1
      this.paginatData(nextPage)
    },
    prev(pageNum) {
      this.$store.commit('SET_LOADING')
      if (pageNum < 2) {
        this.$toast.error('There is no prev page')
        this.$store.commit('UNSET_LOADING')
        return
      }
      const prevPage = pageNum - 1
      this.paginatData(prevPage)
    },
  },
}
</script>

<style lang="scss" scoped>
#notification-page {
  .add-btn {
    width: 180px;
    height: 37px;
    img {
      width: 20px;
      height: 20px;
    }
  }
  .notification-list {
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
