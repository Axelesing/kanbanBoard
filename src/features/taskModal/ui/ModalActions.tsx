import { memo } from 'react'
import { Button, Box } from '@mui/material'

type ModalActionsProps = {
  onClose: () => void
  onRemove: () => void
  onSave: () => void
  disableSave?: boolean
}

export const ModalActions = memo<ModalActionsProps>(
  ({ onClose, onRemove, onSave, disableSave }: ModalActionsProps) => {
    return (
      <Box
        sx={{
          'display': 'flex',
          'flexDirection': 'row',
          'justifyContent': 'space-between',
          'flexWrap': 'wrap',
          'gap': 1,
          '@media (max-width: 768px)': {
            flexDirection: 'column',
            alignItems: 'center',
          },
        }}
      >
        <Button
          size="large"
          variant="outlined"
          onClick={onClose}
          aria-label="Закрыть модальное окно"
        >
          Закрыть
        </Button>
        <Button
          size="large"
          variant="outlined"
          color="error"
          onClick={onRemove}
          aria-label="Удалить задачу"
        >
          Удалить
        </Button>
        <Button
          size="large"
          variant="contained"
          onClick={onSave}
          disabled={disableSave}
          aria-label="Сохранить изменения"
        >
          Сохранить
        </Button>
      </Box>
    )
  },
)

ModalActions.displayName = 'ModalActions'
