import { UserSelect as ConstaUserSelect } from '@consta/uikit/UserSelect'

export type Item = {
  label: string
  subLabel?: string
  avatarUrl?: string
  id: string | number
}

interface UserSelectProps {
  items: Item[]
  setValue: (value: Item | null) => void
  value?: Item | null
}

export function UserSelect({ items, value, setValue }: UserSelectProps) {
  return (
    <ConstaUserSelect
      items={items}
      value={value}
      onChange={setValue}
      placeholder="Выберите сотрудника"
      label="Исполняющий"
      labelPosition="top"
      virtualScroll
    />
  )
}
