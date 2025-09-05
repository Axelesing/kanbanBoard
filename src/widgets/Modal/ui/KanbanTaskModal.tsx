import { Layout } from '@consta/uikit/Layout'
import { cnMixFlex } from '@consta/uikit/MixFlex'
import { Modal as ConstaModal } from '@consta/uikit/Modal'
import sc from 'styled-components'

import { extraBigPadding, mediumPadding } from '@/constants/styles'
import { useTaskModal } from '@/features/taskModal/hooks/useTaskModal'
import { ModalActions } from '@/features/taskModal/ui/ModalActions'
import { TaskForm } from '@/features/taskModal/ui/TaskForm'
import { TaskSettingsPanel } from '@/features/taskModal/ui/TaskSettingsPanel'

export function TaskModal() {
  const {
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
      isTitleInvalid,
      date,
    },
  } = useTaskModal()

  return (
    <ModalShell
      isOpen={isOpen}
      hasOverlay
      position="top"
      onClickOutside={closeWithoutSave}
      onEsc={closeWithoutSave}
      className={cnMixFlex({ direction: 'column', gap: 'l', align: 'stretch' })}
    >
      <LayoutWrapper className={cnMixFlex({ gap: 'l', align: 'stretch' })}>
        <TaskForm
          title={title}
          description={description}
          isTitleInvalid={isTitleInvalid}
          onTitleChange={setTitle}
          onDescriptionChange={setDescription}
        />
        <TaskSettingsPanel user={user} onUserChange={setUser} date={date!} />
      </LayoutWrapper>

      <ModalActions
        onClose={closeWithoutSave}
        onRemove={removeAndClose}
        onSave={saveAndClose}
        disableSave={isTitleInvalid}
      />
    </ModalShell>
  )
}

const ModalShell = sc(ConstaModal)`
  padding: ${extraBigPadding};

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    border-radius: 0;
    height: 100%;
  }
`

const LayoutWrapper = sc(Layout)`
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    padding: ${mediumPadding};
  }
`
