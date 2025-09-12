import {
  Card,
  CardContent,
  IconButton,
  Typography,
  Box,
  Chip,
} from '@mui/material'
import { Close } from '@mui/icons-material'
import { useEffect } from 'react'

import type { Notification } from '@/shared/model'
import { ScreenReaderOnly } from '@/shared/ui/ScreenReaderOnly'

interface NotificationItemProps {
  notification: Notification
  onRemove: () => void
}

export function NotificationItem({
  notification,
  onRemove,
}: NotificationItemProps) {
  useEffect(() => {
    if (notification.duration && notification.duration > 0) {
      const timer = setTimeout(onRemove, notification.duration)
      return () => clearTimeout(timer)
    }
  }, [notification.duration, onRemove])

  const getChipColor = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'success'
      case 'error':
        return 'error'
      case 'warning':
        return 'warning'
      case 'info':
        return 'info'
      default:
        return 'default'
    }
  }

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return '✓'
      case 'error':
        return '✕'
      case 'warning':
        return '⚠'
      case 'info':
        return 'i'
      default:
        return 'i'
    }
  }

  const getBorderColor = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return '#28a745'
      case 'error':
        return '#dc3545'
      case 'warning':
        return '#ffc107'
      case 'info':
        return '#17a2b8'
      default:
        return '#6c757d'
    }
  }

  return (
    <Card
      sx={{
        'borderLeft': `4px solid ${getBorderColor(notification.type)}`,
        'animation': 'slideIn 0.3s ease-out',
        '@keyframes slideIn': {
          from: {
            transform: 'translateX(100%)',
            opacity: 0,
          },
          to: {
            transform: 'translateX(0)',
            opacity: 1,
          },
        },
      }}
    >
      <CardContent sx={{ 'p': 1.5, '&:last-child': { pb: 1.5 } }}>
        <ScreenReaderOnly>
          Уведомление типа {notification.type}: {notification.title}
        </ScreenReaderOnly>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mb: 1,
          }}
        >
          <Chip
            label={getIcon(notification.type)}
            color={getChipColor(notification.type)}
            size="small"
          />
          <Typography variant="body2" fontWeight="bold" sx={{ flex: 1 }}>
            {notification.title}
          </Typography>
          <IconButton
            size="small"
            onClick={onRemove}
            aria-label="Закрыть уведомление"
          >
            <Close fontSize="small" />
          </IconButton>
        </Box>

        {notification.message && (
          <Box sx={{ mb: 1 }}>
            <Typography variant="caption" color="text.secondary">
              {notification.message}
            </Typography>
          </Box>
        )}

        {notification.action && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton size="small" onClick={notification.action.onClick}>
              <Typography variant="caption">
                {notification.action.label}
              </Typography>
            </IconButton>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}
