export const Format =  (time, temp = false) => {
  const date = {
    day: Math.floor(time / 86400),
    second: Math.floor(time % 60),
    minute: Math.floor(time / 60 % 60),
    hour: Math.floor(time / 3600 % 24)
  }
  let { day, hour, second, minute } = date
  let Day = day < 10 ? '0' + day : day
  let Hour = hour < 10 ? '0' + hour : hour
  let Second = second < 10 ? '0' + second : second
  let Minute = minute < 10 ? '0' + minute : minute
  return temp ? Day + '天' + Hour + ':' + Minute + ':' + Second : Hour + ':' + Minute + ':' + Second
}
