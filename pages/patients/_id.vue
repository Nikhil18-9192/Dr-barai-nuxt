<template>
  <div id="patient-page">
    <AddPatientDialog
      v-if="$store.state.patientModal"
      :patient="patient"
      @dismiss="$store.commit('togglePatientModal')"
      @patientData="patientUpdated"
    />
    <SendSmsModal
      v-if="$store.state.notifyModal"
      :patient="patient"
      @dismiss="$store.commit('toggleNotifyModal')"
      @addNotify="newNotify"
    />
    <div v-if="patient" class="patient-profile flex my-8">
      <div class="patient-info w-2/4">
        <div class="name border-b pb-3 w-full">
          <h1 class="text-xl sm:text-2xl font-medium capitalize">
            {{ patient.name }}
          </h1>
          <p class="text-gray-400 text-sm font-normal">
            <span>{{ patient.gender ? patient.gender + ',' : '' }}</span
            ><span class="mx-1"
              >{{ patient.birthDate ? age + 'Years,' : '' }} </span
            ><span>{{ patient.bloodGroup }}</span>
          </p>
        </div>
        <div class="contact text-gray-400 text-sm font-normal mt-3">
          <p class="mb-2">Phone : +91 {{ patient.mobile }}</p>
          <p>Address : {{ patient.address }}</p>
        </div>
      </div>
      <div class="btn-section flex flex-col items-end w-2/4">
        <MyButton
          class="mb-4"
          :icon="notifyBtnIcon"
          @click.native="$store.commit('toggleNotifyModal')"
          >Notify</MyButton
        >
        <MyButton
          class="edit-btn mb-4"
          :icon="editBtnIcon"
          @click.native="$store.commit('togglePatientModal')"
          >Edit Profile</MyButton
        >
      </div>
    </div>
    <div class="consent-view">
      <ConsentView
        :patient-id="patient.id || 0"
        class="mb-4 consentView"
        @onConsentSigned="onConsentSigned"
      />
      <div class="download" v-if="patient.consent">
        <a target="_blank" :href="patient.consent.url"
          ><img src="/doc-download.svg" alt=""
        /></a>
      </div>
    </div>
    <div class="appintment">
      <h4>Appointment History</h4>
      <table v-if="$device.isDesktopOrTablet" class="patient-list">
        <tbody>
          <tr class="text-gray-400 text-sm font-normal">
            <th
              class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200"
            >
              Date
            </th>
            <th
              class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200"
            >
              Time
            </th>
            <th
              class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200"
            >
              Reason
            </th>
            <th
              class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200"
            >
              Observation
            </th>
            <th
              class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200"
            >
              Diagnoses
            </th>
          </tr>
          <tr
            v-for="appointment in patient.appointments"
            :key="appointment.id"
            class="text-sm font-normal cursor-pointer"
            @click="routeToAppointment(appointment.id)"
          >
            <td
              class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200"
            >
              {{ formatter.formatDate(appointment.startDateTime) }}
            </td>
            <td
              class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200"
            >
              {{ formatter.formatTime(appointment.startDateTime) }}
            </td>
            <td
              class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200"
            >
              {{
                appointment.clinicalNotes &&
                appointment.clinicalNotes.complaints
                  ? appointment.clinicalNotes.complaints
                  : '---'
              }}
            </td>
            <td
              class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200"
            >
              {{
                appointment.clinicalNotes.observations
                  ? appointment.clinicalNotes.observations
                  : '---'
              }}
            </td>
            <td
              class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200"
            >
              {{
                appointment.clinicalNotes.diagnoses
                  ? appointment.clinicalNotes.diagnoses
                  : '---'
              }}
            </td>
          </tr>
          <tr>
            <td
              v-if="patient && !patient.appointments.length"
              class="text-gray-200"
            >
              No Appointments Yet
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="$device.isMobile" id="patient-info" class="mt-4">
        <div
          v-if="patient && !patient.appointments.length"
          class="text-gray-200"
        >
          No Appointments Yet
        </div>
        <div
          v-for="appointment in patient.appointments"
          :key="appointment.id"
          class="card p-4 mb-4 border cursor-pointer rounded-lg shadow-lg"
          @click="routeToAppointment(appointment.id)"
        >
          <p class="text-gray-600 text-xs font-normal border-b mb-3">
            Date:
            <span class="text-blue-600 text-base">{{
              formatter.formatDate(appointment.startDateTime)
            }}</span>
          </p>
          <p class="text-gray-600 text-xs font-normal">
            Time : {{ formatter.formatTime(appointment.startDateTime) }}
          </p>
          <p class="text-gray-600 text-xs font-normal">
            Reason :
            {{
              appointment.clinicalNotes
                ? appointment.clinicalNotes.complaints
                : ''
            }}
          </p>
          <p class="text-gray-600 text-xs font-normal">
            Observation :
            {{
              appointment.clinicalNotes
                ? appointment.clinicalNotes.observations
                : '---'
            }}
          </p>
          <p class="text-gray-600 text-xs font-normal">
            Diagnoses :
            {{
              appointment.clinicalNotes
                ? appointment.clinicalNotes.diagnoses
                : '---'
            }}
          </p>
        </div>
      </div>
    </div>
    <div class="notifications mt-10">
      <h4>Notifications History</h4>
      <table v-if="$device.isDesktopOrTablet" class="patient-list">
        <tbody>
          <tr class="text-gray-400 text-sm font-normal">
            <th
              class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200"
            >
              Id
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
            v-for="notify in notifications"
            :key="notify.id"
            class="text-sm font-normal cursor-pointer"
          >
            <td
              class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200"
            >
              {{ notify.id }}
            </td>
            <td
              class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200"
            >
              {{ notify.message }}
            </td>
            <td
              class="py-3 border border-t-0 border-l-0 border-r-0 border-gray-200"
            >
              {{
                formatter.formatDate(notify.createdAt) +
                ' at ' +
                formatter.formatTime(notify.createdAt)
              }}
            </td>
          </tr>
          <tr>
            <td v-if="patient && !notifications.length" class="text-gray-200">
              No Notifications Yet
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="$device.isMobile" class="notify-phone my-4">
        <div v-if="!notifications.length" class="text-gray-200">
          No Notifications Yet
        </div>
        <div
          v-for="(item, i) in notifications"
          :key="i"
          class="card p-4 mb-4 border cursor-pointer rounded-lg shadow-lg"
        >
          <p class="text-gray-600 text-xs font-normal border-b mb-3">
            Date:
            <span class="text-blue-600 text-base">{{
              formatter.formatDate(item.createdAt) +
              ' at ' +
              formatter.formatTime(item.createdAt)
            }}</span>
          </p>
          <p class="text-gray-600 text-xs font-normal">
            Message : {{ item.message }}
          </p>
        </div>
      </div>
    </div>
    <h1 v-if="notifications.length" class="text-gray-400 text-center mt-6">
      ----- FIN -----
    </h1>
  </div>
</template>

<script>
import query from '@/apollo/queries/patient/patient.gql'
import query1 from '@/apollo/queries/notifications/notificationByPatient.gql'
import formatDateTime from '@/utils/formatDateTime'
export default {
  data() {
    return {
      editBtnIcon: '/pencil-alt.svg',
      notifyBtnIcon: '/bell.svg',
      age: false,
      patient: false,
      notifications: false,
      consentBlob: null,
      loading: false,
    }
  },
  computed: {
    formatter() {
      return formatDateTime
    },
  },
  mounted() {
    this.fetchPatient()
  },

  methods: {
    async onConsentSigned(blob) {
      this.consentBlob = blob
      await this.uploadConsentFileAsync()
    },
    patientUpdated(val) {
      if (val) {
        this.patient = val
        const birthday = +new Date(this.patient.birthDate)
        this.age = ~~((Date.now() - birthday) / 31557600000)
      }
      this.modal = false
    },
    async fetchPatient() {
      const { data } = await this.$apollo.query({
        query,
        fetchPolicy: 'network-only',
        variables: {
          id: this.$route.params.id,
        },
        fetch,
      })

      this.patient = data.patient
      const birthday = +new Date(this.patient.birthDate)
      this.age = ~~((Date.now() - birthday) / 31557600000)

      this.fetchNotifications()
    },
    async fetchNotifications() {
      const { data } = await this.$apollo.query({
        query: query1,
        variables: {
          name: this.patient.name,
        },
      })
      this.notifications = data.notifications
    },
    routeToAppointment(id) {
      this.$router.push(`/appointments/${id}`)
    },
    newNotify(val) {
      this.notifications.unshift(val)
    },
    uploadConsentFileAsync() {
      this.$store.commit('SET_LOADING')
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve, reject) => {
        const data = {
          ref: 'patients',
          field: 'consent',
          refId: this.patient.id,
        }
        const fd = new FormData()
        fd.append('files.consent', this.consentBlob, `${this.patient.id}.pdf`)

        fd.append('data', JSON.stringify(data))
        try {
          if (this.patient.consent) {
            await this.$axios.$delete(
              `http://localhost:1337/upload/files/${this.patient.consent.id}`
            )
          }
          const res = await this.$axios.$put(
            `/patients/${this.patient.id}`,
            fd,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          )
          this.patient = res
          resolve(res)
          this.$store.commit('UNSET_LOADING')
        } catch (error) {
          if (error.response) {
            this.$toast.error(error.response.data.message)
          }
          reject(error)
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
#patient-page {
  .contact {
    max-width: 530px;
  }
  .patient-list {
    border-spacing: 0 1.5em;
    width: 90%;
    th {
      text-align: left;
      font-weight: normal;
    }
  }
  .btn-section {
    button {
      width: 133px;
      height: 37px;
    }
    .edit-btn {
      background: #f3f3f3;
      color: #52525b;
    }
  }
  .consent-view {
    display: flex;
    border: 0.5px solid #d3d3d3;
    padding: 15px;
    margin-bottom: 15px;
    @include for-phone-only {
      flex-wrap: wrap;
    }
    .download {
      img {
        width: 35px;
        height: 35px;
        object-fit: contain;
      }
    }
  }
}
</style>
