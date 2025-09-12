# Руководство по компонентам

## Принципы разработки компонентов

### 1. Единая ответственность

Каждый компонент должен иметь одну четко определенную ответственность.

### 2. Переиспользование

Компоненты должны быть максимально переиспользуемыми и настраиваемыми.

### 3. Производительность

Используйте мемоизацию и оптимизацию рендеринга где это необходимо.

### 4. Доступность

Все компоненты должны быть доступными для пользователей с ограниченными возможностями.

## Структура компонента

```typescript
/**
 * Краткое описание компонента
 */

import { memo } from 'react'
import { ComponentProps } from './types'

interface ComponentProps {
  /** Описание пропса */
  prop: string
  /** Опциональный пропс */
  optionalProp?: boolean
}

/**
 * Подробное описание компонента
 */
export const Component = memo<ComponentProps>(({ prop, optionalProp = false }) => {
  // Логика компонента

  return (
    // JSX
  )
})

Component.displayName = 'Component'
```

## Правила именования

- Компоненты: PascalCase (`UserCard`)
- Пропсы: camelCase (`isVisible`)
- События: `on` + PascalCase (`onUserClick`)
- Константы: UPPER_SNAKE_CASE (`MAX_ITEMS`)

## Типизация

- Все пропсы должны быть типизированы
- Используйте `interface` для пропсов компонентов
- Используйте `type` для утилитарных типов
- Добавляйте JSDoc комментарии для сложных типов

## Стилизация

- Используйте `sx` prop для MUI компонентов
- Выносите сложные стили в отдельные объекты
- Используйте CSS переменные для тем
- Применяйте responsive дизайн

## Тестирование

- Каждый компонент должен иметь тесты
- Тестируйте основные сценарии использования
- Используйте `data-testid` для селекторов в тестах
- Мокайте внешние зависимости

## Примеры

### Простой компонент

```typescript
interface ButtonProps {
  children: React.ReactNode
  onClick: () => void
  variant?: 'primary' | 'secondary'
}

export const Button = memo<ButtonProps>(({ children, onClick, variant = 'primary' }) => {
  return (
    <button
      onClick={onClick}
      className={`btn btn-${variant}`}
    >
      {children}
    </button>
  )
})
```

### Сложный компонент

```typescript
interface UserListProps {
  users: User[]
  onUserSelect: (user: User) => void
  loading?: boolean
  error?: string
}

export const UserList = memo<UserListProps>(({ users, onUserSelect, loading, error }) => {
  const handleUserClick = useCallback((user: User) => {
    onUserSelect(user)
  }, [onUserSelect])

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} />

  return (
    <div className="user-list">
      {users.map(user => (
        <UserCard
          key={user.id}
          user={user}
          onClick={() => handleUserClick(user)}
        />
      ))}
    </div>
  )
})
```
