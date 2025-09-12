import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material'

import { STATUSES_SELECT, TaskStatus } from '@/shared/constants/kanban/data'

type TaskStatusFieldProps = {
  status: TaskStatus
  setStatus: (status: TaskStatus) => void
}

export function TaskStatusField({ status, setStatus }: TaskStatusFieldProps) {
  return (
    <Box sx={{ flex: 1 }}>
      <FormControl fullWidth>
        <InputLabel>Статус</InputLabel>
        <Select
          value={status}
          onChange={(event) => setStatus(event.target.value as TaskStatus)}
          label="Статус"
        >
          {STATUSES_SELECT.map((statusOption) => (
            <MenuItem key={statusOption.id} value={statusOption.id}>
              {statusOption.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}
