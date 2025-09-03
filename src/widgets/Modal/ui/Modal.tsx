import { useEffect, useState } from 'react'

import { Button } from '@consta/uikit/Button'
import { Layout } from '@consta/uikit/Layout'
import { cnMixFlex } from '@consta/uikit/MixFlex'
import { Modal as ModalComponent } from '@consta/uikit/Modal'
import { TextField } from '@consta/uikit/TextField'
import { reflect } from '@effector/reflect'
import { useUnit } from 'effector-react'
import sc from 'styled-components'

import { USERS } from '@/constants/kanban/data'
import { extraBigPadding } from '@/constants/styles'
import { $$kanban } from '@/features/kanban'
import { Item, UserSelect } from '@/shared/ui/select/UserSelect'

import { $$modal } from '../model/core'

export function Modal() {
  const [isModalOpen, setIsModalOpen, modalData] = useUnit([
    $$modal.$isViewModal,
    $$modal.modalViewSet,
    $$modal.$selectedTask,
  ])

  const [updateTask, removeTask] = useUnit([
    $$kanban.taskUpdate,
    $$kanban.taskRemove,
  ])

  const { title, id, description, user: userData } = modalData ?? {}

  const [titleText, setTitleText] = useState<string | null | undefined>(title)
  const [user, setUser] = useState<Item | null | undefined>(userData)
  const [descriptionText, setDescriptionText] = useState<
    string | null | undefined
  >(description)

  const closeModalWithoutSave = () => setIsModalOpen(false)

  const closeModalWithSave = () => {
    if (id && titleText?.trim()) {
      updateTask({
        id,
        title: titleText.trim(),
        description: descriptionText?.trim(),
        user,
      })
    }
    setIsModalOpen(false)
  }

  const closeModalWithRemove = () => {
    removeTask({
      id: modalData!.id,
    })
    setIsModalOpen(false)
  }

  useEffect(() => {
    setTitleText(title ?? null)
  }, [title, isModalOpen])

  useEffect(() => {
    setDescriptionText(description ?? null)
  }, [isModalOpen, description])

  useEffect(() => {
    setUser(userData)
  }, [isModalOpen, userData])

  const isTitle = !titleText?.length || !titleText?.trim()

  return (
    <StyledModal
      isOpen={isModalOpen}
      hasOverlay
      position="top"
      onClickOutside={closeModalWithoutSave}
      onEsc={closeModalWithoutSave}
      className={cnMixFlex({
        direction: 'column',
        gap: 'l',
        align: 'stretch',
      })}
    >
      <Layout
        className={cnMixFlex({
          gap: 'l',
          align: 'stretch',
        })}
      >
        <Layout
          className={cnMixFlex({
            direction: 'column',
            gap: 'l',
          })}
          flex={3}
        >
          <TextField
            type="text"
            value={titleText}
            size="l"
            label="Название"
            placeholder="Введите название"
            required
            status={isTitle ? 'alert' : undefined}
            caption={isTitle ? 'Обязательное поле' : ''}
            onChange={setTitleText}
          />
          <TextField
            type="textarea"
            value={descriptionText}
            size="m"
            minRows={13}
            cols={75}
            label="Описание"
            placeholder="Введите описание задачи"
            onChange={setDescriptionText}
          />
        </Layout>
        <TaskSettings flex={1}>
          <_UserSelect value={user} setValue={setUser} />
        </TaskSettings>
      </Layout>
      <Layout
        className={cnMixFlex({
          direction: 'row',
          justify: 'space-between',
        })}
      >
        <Button
          size="l"
          view="primary"
          label="Close"
          onClick={closeModalWithoutSave}
        />
        <Button
          size="l"
          view="primary"
          label="Remove"
          onClick={closeModalWithRemove}
        />
        <Button
          size="l"
          view="primary"
          label="Save"
          onClick={closeModalWithSave}
          disabled={isTitle}
        />
      </Layout>
    </StyledModal>
  )
}

const StyledModal = sc(ModalComponent)`
  padding: ${extraBigPadding};
`

const TaskSettings = sc(Layout)`
  border-left: 1px solid;
  padding: 16px;
`

const _UserSelect = reflect({
  view: UserSelect,
  bind: {
    items: USERS,
  },
})
