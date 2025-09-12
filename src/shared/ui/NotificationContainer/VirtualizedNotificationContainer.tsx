import { memo, useCallback, useMemo } from 'react'
import { Box } from '@mui/material'
import { useUnit } from 'effector-react'

import { NotificationItem } from './NotificationItem'
import { VirtualizedList } from '@/shared/ui/VirtualizedList'
import { $$notifications } from '@/shared/model'
import type { Notification } from '@/shared/model'

/**
 * Виртуализированный контейнер уведомлений
 */
export const VirtualizedNotificationContainer = memo(() => {
  const [notifications, removeNotification] = useUnit([
    $$notifications.$notifications,
    $$notifications.notificationRemoved,
  ])

  const safeNotifications = Array.isArray(notifications) ? notifications : []

  const shouldVirtualize = safeNotifications.length > 5

  const renderNotification = useCallback(
    ({
      style,
      item: notification,
    }: {
      index: number
      style: React.CSSProperties
      item: Notification
    }) => {
      return (
        <div key={notification.id} style={style}>
          <NotificationItem
            notification={notification}
            onRemove={() => removeNotification(notification.id)}
          />
        </div>
      )
    },
    [removeNotification],
  )

  const containerHeight = useMemo(() => {
    const maxHeight = 400
    const itemHeight = 80
    const calculatedHeight = Math.min(
      safeNotifications.length * itemHeight,
      maxHeight,
    )

    return Math.max(calculatedHeight, 100)
  }, [safeNotifications.length])

  if (safeNotifications.length === 0) {
    return null
  }

  return (
    <Box
      sx={{
        'position': 'fixed',
        'top': 20,
        'right': 20,
        'zIndex': 9999,
        'maxWidth': 400,
        '@media (max-width: 768px)': {
          top: 10,
          right: 10,
          left: 10,
          maxWidth: 'none',
        },
      }}
    >
      {shouldVirtualize ? (
        <VirtualizedList<Notification>
          items={safeNotifications}
          height={containerHeight}
          itemHeight={80}
          renderItem={renderNotification}
          listProps={{
            overscanCount: 2,
          }}
        />
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {safeNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onRemove={() => removeNotification(notification.id)}
            />
          ))}
        </Box>
      )}
    </Box>
  )
})

VirtualizedNotificationContainer.displayName =
  'VirtualizedNotificationContainer'
