import { format, isValid, parseISO } from 'date-fns'

export const formatDate = (inputDate: Date | null | undefined): string => {
  if (!inputDate) {
    return 'Не указана'
  }

  let dateToFormat: Date

  if (typeof inputDate === 'string') {
    try {
      dateToFormat = parseISO(inputDate)
    } catch {
      return 'Неверный формат даты'
    }
  } else {
    dateToFormat = inputDate
  }

  if (!isValid(dateToFormat)) {
    return 'Неверная дата'
  }

  try {
    return format(dateToFormat, 'dd/MM/yyyy')
  } catch (error) {
    console.error('Error formatting date:', error)
    return 'Ошибка форматирования'
  }
}
