import { Layout } from '@consta/uikit/Layout'
import { useUnit } from 'effector-react'
import sc from 'styled-components'

import { NotificationItem } from './NotificationItem'
import { $$notifications } from '@/shared/model'

export function NotificationContainer() {
  const [notifications, removeNotification] = useUnit([
    $$notifications.$notifications,
    $$notifications.notificationRemoved,
  ])

  const safeNotifications = Array.isArray(notifications) ? notifications : []

  return (
    <StyledLayout>
      {safeNotifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onRemove={() => removeNotification(notification.id)}
        />
      ))}
    </StyledLayout>
  )
}

const StyledLayout = sc(Layout)`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 400px;
  
  @media (max-width: 768px) {
    top: 10px;
    right: 10px;
    left: 10px;
    max-width: none;
  }
`
