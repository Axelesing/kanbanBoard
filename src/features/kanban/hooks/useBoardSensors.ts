import { useSensor, useSensors, PointerSensor } from '@dnd-kit/core'

export const useBoardSensors = () => useSensors(useSensor(PointerSensor))
