import { Layout } from '@consta/uikit/Layout'
import { cnMixFlex } from '@consta/uikit/MixFlex'
import sc from 'styled-components'

import type { Item } from '@/shared/ui/select/UserSelect'

import { UserSelectField } from './UserSelectField'

type TaskSettingsPanelProps = {
  user: Item | null | undefined
  onUserChange: (v: Item | null | undefined) => void
}

export function TaskSettingsPanel({
  user,
  onUserChange,
}: TaskSettingsPanelProps) {
  return (
    <Panel
      className={cnMixFlex({ direction: 'column', gap: 'l', align: 'stretch' })}
      flex={1}
    >
      <UserSelectField value={user} onChange={onUserChange} />
    </Panel>
  )
}

const Panel = sc(Layout)`
  border-left: 1px solid;
  padding: 16px;
`
