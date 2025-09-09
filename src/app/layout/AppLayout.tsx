import { Outlet, Link } from 'react-router-dom'

import { primaryLightBlue } from '@/shared/constants/colors'
import { bigPadding } from '@/shared/constants/styles'

export function AppLayout() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <main style={{ padding: '16px', flex: 1 }}>
        <Outlet />
      </main>
      <footer
        style={{
          padding: bigPadding,
          borderTop: '1px solid #ddd',
          backgroundColor: primaryLightBlue,
        }}
      >
        <nav>
          <Link style={{ color: 'white' }} to="/">
            Board
          </Link>{' '}
          |{' '}
          <Link style={{ color: 'white' }} to="/about">
            About
          </Link>
        </nav>
      </footer>
    </div>
  )
}
