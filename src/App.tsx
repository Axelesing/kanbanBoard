import { Theme, presetGpnDefault } from '@consta/uikit/Theme'
import { RouterProvider } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'

import { router } from './app/providers/router'
import { primaryDarkNavy } from './constants/colors'

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    color: ${primaryDarkNavy};
    margin: 0;
  }
`

export function App() {
  return (
    <Theme preset={presetGpnDefault}>
      <GlobalStyle />

      <RouterProvider router={router} />
    </Theme>
  )
}
