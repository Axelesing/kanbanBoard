import { Card } from '@consta/uikit/Card'
import { Text } from '@consta/uikit/Text'
import sc from 'styled-components'

import type { Task } from '@/constants/kanban'
import { borderRadius, smallPadding } from '@/constants/styles'

export function ColumnCard({ task }: { task: Task }) {
  return (
    <OverlayCard horizontalSpace="3xl" verticalSpace="3xl">
      <Text>{task.title}</Text>
    </OverlayCard>
  )
}

const OverlayCard = sc(Card)`
  background-color: #fafafa;
  border: 1px dashed;
  border-radius: ${borderRadius};
  padding: ${smallPadding};
  opacity: 0.9;
`
