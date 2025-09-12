import { memo, useMemo, useRef } from 'react'
import { Box } from '@mui/material'
import { useUnit } from 'effector-react'
import { useVirtualizer } from '@tanstack/react-virtual'

import { NotificationItem } from './NotificationItem'
import { $$notifications } from '@/shared/model'

/**
 * Виртуализированный контейнер уведомлений
 */
export const VirtualizedNotificationContainer = memo(() => {
  const [notifications, removeNotification] = useUnit([
    $$notifications.$notifications,
    $$notifications.notificationRemoved,
  ])

  const safeNotifications = Array.isArray(notifications) ? notifications : []
  const parentRef = useRef<HTMLDivElement>(null)

  const shouldVirtualize = safeNotifications.length > 5

  const containerHeight = useMemo(() => {
    const maxHeight = 400
    const itemHeight = 80
    const calculatedHeight = Math.min(
      safeNotifications.length * itemHeight,
      maxHeight,
    )

    return Math.max(calculatedHeight, 100)
  }, [safeNotifications.length])

  // Настройка виртуализатора
  const virtualizer = useVirtualizer({
    count: safeNotifications.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 80, // высота уведомления
    overscan: 2,
  })

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
        <Box
          ref={parentRef}
          sx={{
            height: containerHeight,
            overflow: 'auto',
          }}
        >
          <div
            style={{
              height: `${virtualizer.getTotalSize()}px`,
              width: '100%',
              position: 'relative',
            }}
          >
            {virtualizer.getVirtualItems().map((virtualItem) => {
              const notification = safeNotifications[virtualItem.index]
              return (
                <div
                  key={notification.id}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: `${virtualItem.size}px`,
                    transform: `translateY(${virtualItem.start}px)`,
                  }}
                >
                  <NotificationItem
                    notification={notification}
                    onRemove={() => removeNotification(notification.id)}
                  />
                </div>
              )
            })}
          </div>
        </Box>
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
