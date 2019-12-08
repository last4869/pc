import dayjs from 'dayjs'
import Vue from 'vue'

Vue.filter('formatDate', (val: string) => {
  return dayjs(val).format('YYYY-MM-DD HH:mm')
})
