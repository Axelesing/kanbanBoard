import { fork, allSettled, type Scope } from 'effector'
import {
  setTheme,
  setMode,
  setAutoMode,
  setLightTheme,
  setDarkTheme,
  toggleTheme,
  toggleAutoMode,
} from '../actions'
import {
  $currentTheme,
  $themeMode,
  $autoMode,
  themeRequested,
  modeRequested,
  autoModeRequested,
} from '../core'
import { lightTheme, darkTheme } from '@/shared/constants/themes'

describe('Theme actions', () => {
  let scope: Scope

  beforeEach(() => {
    scope = fork()
  })

  it('должен устанавливать тему', async () => {
    setTheme('dark')

    await allSettled(themeRequested, { scope, params: 'dark' })

    expect(scope.getState($currentTheme)).toEqual(darkTheme)
  })

  it('должен устанавливать режим', async () => {
    setMode('dark')

    await allSettled(modeRequested, { scope, params: 'dark' })

    expect(scope.getState($themeMode)).toBe('dark')
  })

  it('должен устанавливать автоматический режим', async () => {
    setAutoMode(false)

    await allSettled(autoModeRequested, { scope, params: false })

    expect(scope.getState($autoMode)).toBe(false)
  })

  it('должен устанавливать светлую тему', async () => {
    setLightTheme()

    await allSettled(themeRequested, { scope, params: 'light' })

    expect(scope.getState($currentTheme)).toEqual(lightTheme)
  })

  it('должен устанавливать темную тему', async () => {
    setDarkTheme()

    await allSettled(themeRequested, { scope, params: 'dark' })

    expect(scope.getState($currentTheme)).toEqual(darkTheme)
  })

  it('должен переключать тему', async () => {
    await allSettled(themeRequested, { scope, params: 'light' })
    expect(scope.getState($currentTheme)).toEqual(lightTheme)

    toggleTheme()
    await allSettled(themeRequested, { scope, params: 'dark' })
    expect(scope.getState($currentTheme)).toEqual(darkTheme)

    toggleTheme()
    await allSettled(themeRequested, { scope, params: 'light' })
    expect(scope.getState($currentTheme)).toEqual(lightTheme)
  })

  it('должен переключать автоматический режим', async () => {
    await allSettled(autoModeRequested, { scope, params: true })
    expect(scope.getState($autoMode)).toBe(true)

    toggleAutoMode()
    await allSettled(autoModeRequested, { scope, params: false })
    expect(scope.getState($autoMode)).toBe(false)

    toggleAutoMode()
    await allSettled(autoModeRequested, { scope, params: true })
    expect(scope.getState($autoMode)).toBe(true)
  })
})
