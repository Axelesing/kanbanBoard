import { useEffect, useMemo, useState } from 'react'

import { useUnit } from 'effector-react'

import { TaskStatus } from '@/constants/kanban/data'
import { $$kanban } from '@/features/kanban'
import type { Item } from '@/shared/ui/select/UserSelect'
import { $$modal } from '@/widgets/Modal'

export function useTaskModal() {
  const [isOpen, setOpen, selectedTask] = useUnit([
    $$modal.$isViewModal,
    $$modal.modalViewSet,
    $$modal.$selectedTask,
  ])

  const [updateTask, removeTask] = useUnit([
    $$kanban.taskUpdate,
    $$kanban.taskRemove,
  ])

  const [title, setTitle] = useState<string | null | undefined>(null)
  const [description, setDescription] = useState<string | null | undefined>(
    null,
  )
  const [user, setUser] = useState<Item | null | undefined>(null)
  const [status, setStatus] = useState<TaskStatus>('toDo')

  useEffect(() => {
    if (!isOpen || !selectedTask) return
    setTitle(selectedTask.title ?? null)
    setDescription(selectedTask.description ?? null)
    setUser(selectedTask.user ?? null)
    setStatus(selectedTask.status ?? 'toDo')
  }, [isOpen, selectedTask, selectedTask?.id])

  const isTitleInvalid = useMemo(() => !title?.trim(), [title])

  const closeWithoutSave = () => setOpen(false)

  const saveAndClose = () => {
    if (!selectedTask?.id || isTitleInvalid) {
      setOpen(false)
      return
    }
    updateTask({
      id: selectedTask.id,
      title: title!.trim(),
      description: description?.trim(),
      user,
      status,
    })
    setOpen(false)
  }

  const removeAndClose = () => {
    if (selectedTask?.id) {
      removeTask({ id: selectedTask.id })
    }
    setOpen(false)
  }

  return {
    isOpen,
    closeWithoutSave,
    saveAndClose,
    removeAndClose,
    form: {
      title,
      setTitle,
      description,
      setDescription,
      user,
      setUser,
      status,
      setStatus,
      isTitleInvalid,
    },
  }
}
