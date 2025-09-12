import { Box } from '@mui/material'

interface ScreenReaderOnlyProps {
  id?: string
  children: React.ReactNode
}

export function ScreenReaderOnly({ id, children }: ScreenReaderOnlyProps) {
  return (
    <Box
      id={id}
      sx={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: 0,
        left: '-10000px',
        top: 'auto',
      }}
    >
      {children}
    </Box>
  )
}
