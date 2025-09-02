import { useEffect, useState } from 'react'

import { Button } from '@consta/uikit/Button'
import { cnMixFlex } from '@consta/uikit/MixFlex'
import { Modal as ModalComponent } from '@consta/uikit/Modal'
import { Text } from '@consta/uikit/Text'
import { TextField } from '@consta/uikit/TextField'
import { useUnit } from 'effector-react'
import sc from 'styled-components'

import { extraBigPadding } from '@/constants/styles'
import { $$kanban } from '@/features/kanban'

import { $$modal } from '../model/core'

export function Modal() {
  const [isModalOpen, setIsModalOpen, modalData] = useUnit([
    $$modal.$isViewModal,
    $$modal.modalViewSet,
    $$modal.$selectedTask,
  ])
  const [updateTask] = useUnit([$$kanban.taskUpdate])

  const { title, id } = modalData ?? {}
  const [value, setValue] = useState<string | null>(title || null)

  const closeModalWithoutSave = () => setIsModalOpen(false)

  const closeModalWithSave = () => {
    if (id && value?.trim()) {
      updateTask({ id, title: value.trim() })
    }
    setIsModalOpen(false)
  }

  useEffect(() => {
    setValue(title || null)
  }, [title, isModalOpen])

  return (
    <StyledModal
      isOpen={isModalOpen}
      hasOverlay
      position="top"
      onClickOutside={closeModalWithoutSave}
      onEsc={closeModalWithoutSave}
    >
      <div>
        <TextField
          value={value}
          size="l"
          leftSide="Название:"
          placeholder="Введите название"
          view="clear"
          status={!value?.length ? 'alert' : 'success'}
          onChange={setValue}
        />
        <Text size="s" view="secondary" lineHeight="m">
          Это содержимое модального окна. Здесь может быть что угодно: текст,
          изображение, форма или таблица. Всё, что хочется вынести из контекста
          и показать поверх основной страницы.Это содержимое модального окна.
          Здесь может быть что угодно: текст, изображение, форма или таблица.
          Всё, что хочется вынести из контекста и показать поверх основной
          страницы.Это содержимое модального окна. Здесь может быть что угодно:
          текст, изображение, форма или таблица. Всё, что хочется вынести из
          контекста и показать поверх основной страницы.Это содержимое
          модального окна. Здесь может быть что угодно: текст, изображение,
          форма или таблица. Всё, что хочется вынести из контекста и показать
          поверх основной страницы.Это содержимое модального окна. Здесь может
          быть что угодно: текст, изображение, форма или таблица. Всё, что
          хочется вынести из контекста и показать поверх основной страницы.
        </Text>
      </div>
      <div
        className={cnMixFlex({ direction: 'row', justify: 'space-between' })}
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
          label="Save"
          onClick={closeModalWithSave}
          disabled={!value?.length || !value?.trim()}
        />
      </div>
    </StyledModal>
  )
}

const StyledModal = sc(ModalComponent)`
  display: flex;
  flex-direction: column;
  padding: ${extraBigPadding};
  max-width: 50vw;
  justify-content: space-between;
  gap:  ${extraBigPadding};
`
