import { Box } from '@mui/material'
import { useUnit } from 'effector-react'

import { NotificationItem } from './NotificationItem'
import { $$notifications } from '@/shared/model'

export function NotificationContainer() {
  const [notifications, removeNotification] = useUnit([
    $$notifications.$notifications,
    $$notifications.notificationRemoved,
  ])

  const safeNotifications = Array.isArray(notifications) ? notifications : []

  return (
    <Box
      sx={{
        'position': 'fixed',
        'top': 20,
        'right': 20,
        'zIndex': 9999,
        'display': 'flex',
        'flexDirection': 'column',
        'gap': 1.5,
        'maxWidth': 400,
        '@media (max-width: 768px)': {
          top: 10,
          right: 10,
          left: 10,
          maxWidth: 'none',
        },
      }}
    >
      {safeNotifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onRemove={() => removeNotification(notification.id)}
        />
      ))}
    </Box>
  )
}
