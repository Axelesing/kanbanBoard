import { Box } from '@mui/material'

import { TaskStatus } from '@/shared/constants/kanban/data'
import type { Item } from './UserSelect'

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
    <Box
      sx={{
        'display': 'flex',
        'flexDirection': 'column',
        'gap': 3,
        'alignItems': 'stretch',
        'justifyContent': 'space-between',
        'flex': 1,
        'borderLeft': '1px solid var(--color-border-primary)',
        'px': 2,
        '@media (max-width: 768px)': {
          px: 1,
          borderLeft: 'none',
          borderTop: '1px solid var(--color-border-primary)',
        },
      }}
    >
      <UserSelectField value={user} onChange={onUserChange} />

      <TaskStatusField status={status} setStatus={setStatus} />

      <CreatedField date={date} />
    </Box>
  )
}
