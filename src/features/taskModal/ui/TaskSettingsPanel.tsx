import { Layout } from '@consta/uikit/Layout'
import { cnMixFlex } from '@consta/uikit/MixFlex'
import sc from 'styled-components'

import { primaryDarkNavy } from '@/shared/constants/colors'
import { TaskStatus } from '@/shared/constants/kanban/data'
import type { Item } from '@/shared/ui/select/UserSelect'

import { CreatedField } from './CreatedField'
import { TaskStatusField } from './TaskStatusField'
import { UserSelectField } from './UserSelectField'

type TaskSettingsPanelProps = {
  user: Item | null | undefined
  onUserChange: (v: Item | null | undefined) => void
  date?: Date | null
  setStatus: (status: TaskStatus) => void
  status: TaskStatus
}

export function TaskSettingsPanel({
  user,
  onUserChange,
  date,
  setStatus,
  status,
}: TaskSettingsPanelProps) {
  return (
    <Panel
      className={cnMixFlex({
        direction: 'column',
        gap: 'l',
        align: 'stretch',
        justify: 'space-between',
      })}
      flex={1}
    >
      <UserSelectField value={user} onChange={onUserChange} />

      <TaskStatusField status={status} setStatus={setStatus} />

      <CreatedField date={date} />
    </Panel>
  )
}

const Panel = sc(Layout)`
  border-left: 1px solid ${primaryDarkNavy};
  padding: 16px;

  @media (max-width: 768px) {
    padding: 8px 0;

    border-left: none;
    border-top: 1px solid ${primaryDarkNavy};
  }
`
