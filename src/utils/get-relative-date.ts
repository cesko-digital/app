function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

export function getRelativeDate(
  startDateString: string,
  endDateString: string,
  nowDate: Date
): string {
  const startDate = new Date(Date.parse(startDateString))
  const endDate = new Date(Date.parse(endDateString))

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
        toReturn = startDate.getDate() + '.' + (startDate.getMonth() + 1) + '.'
        if (startDate.getFullYear() !== nowDate.getFullYear())
          toReturn += startDate.getFullYear()
      }
    }

    toReturn +=
      ', ' +
      startDate.toLocaleString('cs-CZ', { hour: '2-digit', minute: '2-digit' })

    return toReturn
  }
}
