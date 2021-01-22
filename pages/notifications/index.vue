<template>
  <div id="notification-page">
    <div class="sms-info flex-col flex">
      <SendSmsModal
        v-if="$store.state.notifyModal"
        @dismiss="$store.commit('toggleNotifyModal')"
        @addNotify="addNotify"
      />
      <div class="title flex justify-between my-8">
        <h1 class="text-xl sm:text-2xl font-medium mb-4">SMS Logs</h1>
        <MyButton
          :icon="addBtnIcon"
          @click.native="$store.commit('toggleNotifyModal')"
          >Create New SMS</MyButton
        >
      </div>
    </div>

    <table
      v-if="$device.isDesktopOrTablet"
      class="notification-list border-separate flex-grow table-fixed"
    >
      <tbody>
        <tr class="text-gray-600 text-sm font-normal ml-2">
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
          @click="viewNotification(item.id)"
        >
          <td class="p-3">{{ item.id }}</td>
          <td class="p-3">
            {{ getName(item.patients) }}
          </td>
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
    <NotificationCardForPhone
      v-if="$device.isMobile"
      :card-info="notifications"
    />
    <div
      v-if="notifications.length"
      class="pagination-section flex justify-between"
    >
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

      <div v-if="$device.isDesktopOrTablet" class="paginate-section">
        <div class="nextprev flex">
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
      perPage: 10,
      totalPages: 0,
      currentPage: 1,
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
    async clickCallback(selectedPage) {
      this.currentPage = selectedPage
      const { data } = await this.$apollo.query({
        query: notifications,
        variables: {
          limit: this.perPage,
          start: selectedPage * this.perPage - this.perPage,
        },
      })
      this.notifications = data.notifications
    },
    next() {
      this.currentPage++
      if (this.currentPage > this.totalPages) {
        this.$toast.error('no pages')
        this.currentPage = this.totalPages
      }
      this.fetchNotifications()
    },
    prev() {
      this.currentPage--
      if (this.currentPage === 0) {
        this.$toast.error('no pages')
        this.currentPage = 1
      }
      this.fetchNotifications()
    },
    async fetchNotifications() {
      this.$store.commit('SET_LOADING')
      const { data } = await this.$apollo.query({
        query: notifications,
        variables: {
          limit: this.perPage,
          start: this.currentPage * this.perPage - this.perPage,
        },
      })
      this.notifications = data.notifications
      this.$store.commit('UNSET_LOADING')
    },
    async fetchTotalNotificationCount() {
      this.totalItem = await this.$axios.$get('/notifications/count')
      this.totalPages = Math.ceil(this.totalItem / this.perPage)
    },
    getName(patients) {
      if (patients.length === 1) {
        return patients[0].name
      } else {
        return `${patients[0].name.substring(0, 10)} & ${
          patients.length - 1
        } Other`
      }
    },
    viewNotification(id) {
      this.$router.push(`/notifications/${id}`)
    },
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
  },
}
</script>

<style lang="scss" scoped>
.title {
  @include for-phone-only {
    flex-direction: column;
  }
}
td {
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
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
.sms-info {
  min-height: 150px;
}
</style>
