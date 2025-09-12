import { Box, Typography, Container } from '@mui/material'

import { ThemeSelector, ThemeToggle } from '@/shared/ui'

export function ThemeSettingsPage() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          alignItems: 'stretch',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h3" component="h1" fontWeight="bold">
            Настройки темы
          </Typography>
          <ThemeToggle size="m" />
        </Box>

        <Typography variant="body1" color="text.secondary">
          Настройте внешний вид приложения. Выберите тему, которая вам больше
          подходит.
        </Typography>

        <ThemeSelector showTitle={false} />
      </Box>
    </Container>
  )
}
