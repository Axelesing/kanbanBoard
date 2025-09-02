import { Theme, presetGpnDefault } from '@consta/uikit/Theme'

import { Board } from './features/kanban'
import { Modal } from './widgets/Modal'

export function App() {
  return (
    <Theme preset={presetGpnDefault}>
      <Board />
      <Modal />
    </Theme>
  )
}
