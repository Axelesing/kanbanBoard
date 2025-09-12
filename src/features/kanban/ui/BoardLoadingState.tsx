import { memo } from 'react'
import { Container, CircularProgress, Typography } from '@mui/material'

/**
 * Компонент состояния загрузки доски
 */
export const BoardLoadingState = memo(() => {
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 2,
        minHeight: '50vh',
      }}
    >
      <CircularProgress size={40} />
      <Typography variant="body1" color="text.secondary">
        Загрузка канбан доски...
      </Typography>
    </Container>
  )
})

BoardLoadingState.displayName = 'BoardLoadingState'
