import dayjs from 'dayjs'

export const parseTimes = (date, format) => {
  format = format || 'YYYY-MM-DD HH:mm:ss'
  return dayjs(date).format(format)
}
