import { Layout } from '@consta/uikit/Layout'
import { cnMixFlex } from '@consta/uikit/MixFlex'
import { Modal as ConstaModal } from '@consta/uikit/Modal'
import { reflect } from '@effector/reflect'
import sc from 'styled-components'

import { extraBigPadding, mediumPadding } from '@/shared/constants/styles'
import { useTaskModal } from '@/features/taskModal/hooks/useTaskModal'
import { ModalActions } from '@/features/taskModal/ui/ModalActions'
import { TaskForm } from '@/features/taskModal/ui/TaskForm'
import { TaskSettingsPanel } from '@/features/taskModal/ui/TaskSettingsPanel'
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
    <ModalShell
      isOpen={isOpen}
      hasOverlay
      position="top"
      onClickOutside={closeWithoutSave}
      onEsc={closeWithoutSave}
      className={cnMixFlex({ direction: 'column', gap: 'l', align: 'stretch' })}
      role="dialog"
      aria-modal="true"
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

      <LayoutWrapper
        className={cnMixFlex({ gap: 'l', align: 'stretch' })}
        role="form"
        aria-label="Форма задачи"
      >
        <TaskForm {...taskFormProps} />
        <_TaskSettingsPanel {...taskSettingsProps} />
      </LayoutWrapper>

      <ModalActions {...modalActionsProps} />
    </ModalShell>
  )
}

const _TaskSettingsPanel = reflect({
  view: TaskSettingsPanel,
  bind: {
    date: $$modal.$selectedTask.map((item) => item?.date || null),
  },
})

const ModalShell = sc(ConstaModal)`
  padding: ${extraBigPadding};
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  
  transition: all 0.3s ease-in-out;
  
  @media (max-width: 1024px) {
    max-width: 95vw;
    padding: ${mediumPadding};
  }
  
  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    border-radius: 0;
    height: 100%;
    max-height: 100%;
    padding: ${mediumPadding};
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
  }
  
  &:focus-within {
    outline: 2px solid #007bff;
    outline-offset: 2px;
  }
`

const LayoutWrapper = sc(Layout)`
  min-height: 200px;
  
  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 1rem;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    padding: ${mediumPadding};
  }
  
  @media (max-width: 480px) {
    gap: 12px;
    padding: 0.5rem;
  }
`
