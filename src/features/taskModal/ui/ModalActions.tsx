import { Button } from '@consta/uikit/Button'
import { Layout } from '@consta/uikit/Layout'
import { cnMixFlex } from '@consta/uikit/MixFlex'
import sc from 'styled-components'

type ModalActionsProps = {
  onClose: () => void
  onRemove: () => void
  onSave: () => void
  disableSave?: boolean
}

export function ModalActions({
  onClose,
  onRemove,
  onSave,
  disableSave,
}: ModalActionsProps) {
  return (
    <LayoutWrapper
      className={cnMixFlex({
        direction: 'row',
        justify: 'space-between',
        wrap: 'wrap',
        gap: 's',
      })}
    >
      <Button size="l" view="primary" label="Закрыть" onClick={onClose} />
      <Button size="l" view="primary" label="Удалить" onClick={onRemove} />
      <Button
        size="l"
        view="primary"
        label="Сохранить"
        onClick={onSave}
        disabled={disableSave}
      />
    </LayoutWrapper>
  )
}

const LayoutWrapper = sc(Layout)`
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`
