import dayjs from 'dayjs'
const formatDateTime = {
  formatDate(date) {
    return dayjs(date).format('DD MMM YYYY')
  },
  formatTime(time) {
    return dayjs(time).format('hh:mm A')
  },
}
export default formatDateTime
