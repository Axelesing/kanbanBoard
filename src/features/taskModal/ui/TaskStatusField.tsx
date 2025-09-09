import { Select } from '@consta/uikit/SelectCanary'
import { Text } from '@consta/uikit/Text'

import { STATUSES_SELECT, TaskStatus } from '@/shared/constants/kanban/data'

type TaskStatusFieldProps = {
  status: TaskStatus
  setStatus: (status: TaskStatus) => void
}

export function TaskStatusField({ status, setStatus }: TaskStatusFieldProps) {
  return (
    <div style={{ flex: 1 }}>
      <Text view="secondary" lineHeight="l">
        Статус задачи
      </Text>
      <Select
        items={STATUSES_SELECT}
        value={STATUSES_SELECT.find((s) => s.id === status)}
        onChange={(val) => {
          if (val) {
            setStatus(val.id as TaskStatus)
          }
        }}
      />
    </div>
  )
}
