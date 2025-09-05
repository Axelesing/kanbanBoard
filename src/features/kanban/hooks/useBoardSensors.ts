import { useSensor, useSensors, MouseSensor, TouchSensor } from '@dnd-kit/core'

export const useBoardSensors = () =>
  useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    }),
  )
