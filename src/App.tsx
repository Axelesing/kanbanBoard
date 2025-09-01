import { Theme, presetGpnDefault } from '@consta/uikit/Theme'

import { Board } from './features/kanban/ui/Board'

export function App() {
  return (
    <Theme preset={presetGpnDefault}>
      <Board />
    </Theme>
  )
}
