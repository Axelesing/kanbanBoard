import { reflect } from '@effector/reflect'

import { USERS } from '@/shared/constants/kanban/data'
import { UserSelect } from '@/shared/ui/select/UserSelect'
import type { Item } from '@/shared/ui/select/UserSelect'

type UserSelectFieldProps = {
  value: Item | null | undefined
  onChange: (v: Item | null | undefined) => void
}

const _UserSelect = reflect({
  view: UserSelect,
  bind: { items: USERS },
})

export function UserSelectField({ value, onChange }: UserSelectFieldProps) {
  return <_UserSelect value={value} setValue={onChange} />
}
