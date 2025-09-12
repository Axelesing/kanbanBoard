import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  Box,
  Typography,
} from '@mui/material'

export type Item = {
  label: string
  subLabel?: string
  avatarUrl?: string
  id: string | number
  value?: string
}

interface UserSelectProps {
  items: Item[]
  setValue: (value: Item | null) => void
  value?: Item | null
}

export function UserSelect({ items, value, setValue }: UserSelectProps) {
  return (
    <FormControl fullWidth>
      <InputLabel>Исполняющий</InputLabel>
      <Select
        value={value?.id || ''}
        onChange={(event) => {
          const selectedItem = items.find(
            (item) => item.id === event.target.value,
          )
          setValue(selectedItem || null)
        }}
        label="Исполняющий"
      >
        {items.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar src={item.avatarUrl} sx={{ width: 24, height: 24 }}>
                {item.label?.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="body2">{item.label}</Typography>
                {item.subLabel && (
                  <Typography variant="caption" color="text.secondary">
                    {item.subLabel}
                  </Typography>
                )}
              </Box>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
