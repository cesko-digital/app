function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

export function getRelativeDate(
  startDateString: string,
  endDateString: string
): string {
  const startDate = new Date(Date.parse(startDateString))
  const endDate = new Date(Date.parse(endDateString))
  const nowDate = new Date()

  if (nowDate > endDate) return 'Proběhlo'
  else if (nowDate > startDate) return 'Probíhá'
  else {
    let toReturn: string

    if (isSameDay(startDate, nowDate)) toReturn = 'Dnes'
    else {
      const tomorrowDate = new Date(nowDate)
      tomorrowDate.setDate(tomorrowDate.getDate() + 1)
      if (isSameDay(startDate, tomorrowDate)) toReturn = 'Zítra'
      else {
        toReturn = startDate.getDate() + '.' + (startDate.getMonth() + 1)
        if (startDate.getFullYear() !== nowDate.getFullYear())
          toReturn += '.' + startDate.getFullYear()
      }
    }

    toReturn +=
      ', ' +
      ('0' + startDate.getHours()).slice(-2) +
      ':' +
      ('0' + startDate.getMinutes()).slice(-2)

    return toReturn
  }
}
