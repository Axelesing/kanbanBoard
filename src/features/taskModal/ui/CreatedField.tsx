import { formatDate } from '../lib/helper'
import { ScreenReaderOnly } from '@/shared/ui/ScreenReaderOnly'

type CreatedFieldProps = {
  date: Date | null | undefined
}

export function CreatedField({ date }: CreatedFieldProps) {
  const formattedDate = formatDate(date)

  return (
    <div>
      <ScreenReaderOnly>Дата создания задачи: {formattedDate}</ScreenReaderOnly>
      Дата создания: {formattedDate}
    </div>
  )
}
