import { Button } from '@consta/uikit/Button'
import { Layout } from '@consta/uikit/Layout'
import { cnMixFlex } from '@consta/uikit/MixFlex'

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
    <Layout
      className={cnMixFlex({ direction: 'row', justify: 'space-between' })}
    >
      <Button size="l" view="primary" label="Close" onClick={onClose} />
      <Button size="l" view="primary" label="Remove" onClick={onRemove} />
      <Button
        size="l"
        view="primary"
        label="Save"
        onClick={onSave}
        disabled={disableSave}
      />
    </Layout>
  )
}
