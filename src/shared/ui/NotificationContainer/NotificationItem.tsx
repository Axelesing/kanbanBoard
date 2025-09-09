import { Badge } from '@consta/uikit/Badge'
import { Button } from '@consta/uikit/Button'
import { Card } from '@consta/uikit/Card'
import { Text } from '@consta/uikit/Text'
import { IconClose } from '@consta/icons/IconClose'
import { useEffect } from 'react'
import sc from 'styled-components'

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

  const getBadgeStatus = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'success'
      case 'error':
        return 'alert'
      case 'warning':
        return 'warning'
      case 'info':
        return 'normal'
      default:
        return 'normal'
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

  return (
    <StyledCard type={notification.type} verticalSpace="s" horizontalSpace="s">
      <ScreenReaderOnly>
        Уведомление типа {notification.type}: {notification.title}
      </ScreenReaderOnly>
      <Header>
        <Badge
          status={getBadgeStatus(notification.type)}
          label={getIcon(notification.type)}
          size="s"
        />
        <Text size="s" weight="bold">
          {notification.title}
        </Text>
        <Button
          size="xs"
          view="ghost"
          iconLeft={IconClose}
          onClick={onRemove}
          aria-label="Закрыть уведомление"
        />
      </Header>

      {notification.message && (
        <Message>
          <Text size="xs">{notification.message}</Text>
        </Message>
      )}

      {notification.action && (
        <Action>
          <Button
            size="xs"
            view="ghost"
            label={notification.action.label}
            onClick={notification.action.onClick}
          />
        </Action>
      )}
    </StyledCard>
  )
}

const StyledCard = sc(Card)<{ type: Notification['type'] }>`
  border-left: 4px solid ${({ type }) => {
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
  }};
  
  animation: slideIn 0.3s ease-out;
  
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`

const Header = sc.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`

const Message = sc.div`
  margin-bottom: 8px;
`

const Action = sc.div`
  display: flex;
  justify-content: flex-end;
`
