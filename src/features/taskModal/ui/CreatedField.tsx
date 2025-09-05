import { format } from 'date-fns'

type CreatedFieldProps = {
  date: Date
}

export function CreatedField({ date }: CreatedFieldProps) {
  const validDate = format(date, 'dd/MM/yyyy')
  return <div>Дата создания: {validDate}</div>
}
