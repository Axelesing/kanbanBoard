import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import { reflect } from '@effector/reflect'
import { useTaskModal } from '@/features/taskModal'
import { ModalActions, TaskForm, TaskSettingsPanel } from '@/features/taskModal'
import { ScreenReaderOnly } from '@/shared/ui/ScreenReaderOnly'

import { $$modal } from '../model/core'

export function TaskModal() {
  const {
    isOpen,
    closeWithoutSave,
    taskFormProps,
    taskSettingsProps,
    modalActionsProps,
  } = useTaskModal()

  if (!isOpen) {
    return null
  }

  return (
    <Dialog
      open={isOpen}
      onClose={closeWithoutSave}
      maxWidth="lg"
      fullWidth
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <ScreenReaderOnly id="modal-title">
        Редактирование задачи
      </ScreenReaderOnly>
      <ScreenReaderOnly id="modal-description">
        Форма для редактирования названия, описания, статуса и исполнителя
        задачи
      </ScreenReaderOnly>

      <DialogTitle>Редактирование задачи</DialogTitle>

      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            gap: 3,
            mt: 2,
          }}
          role="form"
          aria-label="Форма задачи"
        >
          <TaskForm {...taskFormProps} />
          <_TaskSettingsPanel {...taskSettingsProps} />
        </Box>
      </DialogContent>

      <DialogActions>
        <ModalActions {...modalActionsProps} />
      </DialogActions>
    </Dialog>
  )
}

const _TaskSettingsPanel = reflect({
  view: TaskSettingsPanel,
  bind: {
    date: $$modal.$selectedTask.map((item) => item?.date || null),
  },
})
