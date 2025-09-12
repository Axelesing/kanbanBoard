import { fork, allSettled } from 'effector'
import {
  $currentTheme,
  $themeMode,
  $autoMode,
  $isDark,
  $isLight,
  themeRequested,
  modeRequested,
  autoModeRequested,
  loadThemeConfigFx,
  saveThemeConfigFx,
  applyThemeFx,
} from '../core'
import { lightTheme, darkTheme } from '@/shared/constants/themes'

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

const mockDocument = {
  documentElement: {
    style: {
      setProperty: jest.fn(),
    },
  },
  body: {
    className: '',
    classList: {
      add: jest.fn(),
      remove: jest.fn(),
    },
  },
  querySelector: jest.fn(),
}

Object.defineProperty(document, 'documentElement', {
  value: mockDocument.documentElement,
  writable: true,
})

Object.defineProperty(document, 'body', {
  value: mockDocument.body,
  writable: true,
})

Object.defineProperty(document, 'querySelector', {
  value: mockDocument.querySelector,
  writable: true,
})

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

describe('Theme model', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    localStorageMock.getItem.mockReturnValue(null)
  })

  it('должен загружать конфигурацию темы по умолчанию', async () => {
    const scope = fork()

    await allSettled(loadThemeConfigFx, { scope })

    expect(scope.getState($currentTheme)).toEqual(lightTheme)
    expect(scope.getState($themeMode)).toBe('light')
    expect(scope.getState($autoMode)).toBe(true)
  })

  it('должен загружать сохраненную конфигурацию темы', async () => {
    const savedConfig = {
      currentTheme: 'dark',
      mode: 'dark',
      autoMode: false,
      persist: true,
    }
    localStorageMock.getItem.mockReturnValue(JSON.stringify(savedConfig))

    const scope = fork()

    await allSettled(loadThemeConfigFx, { scope })

    expect(scope.getState($currentTheme)).toEqual(darkTheme)
    expect(scope.getState($themeMode)).toBe('dark')
    expect(scope.getState($autoMode)).toBe(false)
  })

  it('должен переключать тему', async () => {
    const scope = fork()

    await allSettled(themeRequested, { scope, params: 'dark' })

    expect(scope.getState($currentTheme)).toEqual(darkTheme)
    expect(scope.getState($isDark)).toBe(true)
    expect(scope.getState($isLight)).toBe(false)
  })

  it('должен переключать режим темы', async () => {
    const scope = fork()

    await allSettled(modeRequested, { scope, params: 'dark' })

    expect(scope.getState($themeMode)).toBe('dark')
  })

  it('должен переключать автоматический режим', async () => {
    const scope = fork()

    await allSettled(autoModeRequested, { scope, params: false })

    expect(scope.getState($autoMode)).toBe(false)
  })

  it('должен сохранять конфигурацию темы', async () => {
    const config = {
      currentTheme: 'dark',
      mode: 'dark',
      autoMode: false,
      persist: true,
    }

    const scope = fork()

    await allSettled(saveThemeConfigFx, { scope, params: config })

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'kanban-theme-config',
      JSON.stringify(config),
    )
  })

  it('должен применять тему к DOM', async () => {
    const scope = fork()

    await allSettled(applyThemeFx, { scope, params: darkTheme })

    expect(mockDocument.documentElement.style.setProperty).toHaveBeenCalled()
    expect(mockDocument.body.classList.add).toHaveBeenCalledWith('theme-dark')
  })

  it('должен обрабатывать ошибки при загрузке конфигурации', async () => {
    localStorageMock.getItem.mockImplementation(() => {
      throw new Error('Storage error')
    })

    const scope = fork()

    await allSettled(loadThemeConfigFx, { scope })

    expect(scope.getState($currentTheme)).toEqual(lightTheme)
  })

  it('должен обрабатывать ошибки при сохранении конфигурации', async () => {
    localStorageMock.setItem.mockImplementation(() => {
      throw new Error('Storage error')
    })

    const config = {
      currentTheme: 'dark',
      mode: 'dark',
      autoMode: false,
      persist: true,
    }

    const scope = fork()

    await expect(
      allSettled(saveThemeConfigFx, { scope, params: config }),
    ).resolves.toBeDefined()
  })
})
