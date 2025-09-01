import { Button } from '@consta/uikit/Button'
import { Modal as ModalComponent } from '@consta/uikit/Modal'
import { Text } from '@consta/uikit/Text'
import { useUnit } from 'effector-react'
import sc from 'styled-components'

import { extraBigPadding } from '@/constants/styles'

import { $isViewModal, $selectedTask, modalViewSet } from '../model/core'

export function Modal() {
  const [isModalOpen, setIsModalOpen, modalData] = useUnit([
    $isViewModal,
    modalViewSet,
    $selectedTask,
  ])

  const { title } = modalData ?? {}

  return (
    <StyledModal
      isOpen={isModalOpen}
      hasOverlay
      position="top"
      onClickOutside={() => setIsModalOpen(false)}
      onEsc={() => setIsModalOpen(false)}
    >
      <div>
        <Text size="2xl" view="secondary" lineHeight="m">
          {title}
        </Text>
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
      <Button
        size="m"
        view="primary"
        label="Close"
        width="default"
        onClick={() => setIsModalOpen(false)}
      />
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
