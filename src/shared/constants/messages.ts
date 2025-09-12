/**
 * Сообщения об ошибках
 */
export const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'Это поле обязательно для заполнения',
  INVALID_EMAIL: 'Введите корректный email адрес',
  MIN_LENGTH: (min: number) => `Минимальная длина: ${min} символов`,
  MAX_LENGTH: (max: number) => `Максимальная длина: ${max} символов`,
  INVALID_DATE: 'Введите корректную дату',
  NETWORK_ERROR: 'Ошибка сети. Проверьте подключение к интернету',
  SERVER_ERROR: 'Ошибка сервера. Попробуйте позже',
  UNAUTHORIZED: 'Необходима авторизация',
  FORBIDDEN: 'Доступ запрещен',
  NOT_FOUND: 'Ресурс не найден',
  VALIDATION_ERROR: 'Ошибка валидации данных',
  UNKNOWN_ERROR: 'Произошла неизвестная ошибка',
} as const

/**
 * Сообщения об успехе
 */
export const SUCCESS_MESSAGES = {
  SAVED: 'Данные успешно сохранены',
  UPDATED: 'Данные успешно обновлены',
  DELETED: 'Данные успешно удалены',
  CREATED: 'Данные успешно созданы',
  COPIED: 'Данные скопированы в буфер обмена',
  EXPORTED: 'Данные успешно экспортированы',
  IMPORTED: 'Данные успешно импортированы',
} as const

/**
 * Сообщения для пользователя
 */
export const USER_MESSAGES = {
  LOADING: 'Загрузка...',
  NO_DATA: 'Нет данных для отображения',
  NO_RESULTS: 'Результаты не найдены',
  SEARCH_PLACEHOLDER: 'Введите поисковый запрос',
  SELECT_PLACEHOLDER: 'Выберите значение',
  CONFIRM_DELETE: 'Вы уверены, что хотите удалить этот элемент?',
  CONFIRM_SAVE: 'Сохранить изменения?',
  CONFIRM_CANCEL: 'Отменить изменения?',
  UNSAVED_CHANGES: 'У вас есть несохраненные изменения',
} as const

/**
 * ARIA метки
 */
export const ARIA_LABELS = {
  CLOSE: 'Закрыть',
  OPEN: 'Открыть',
  EDIT: 'Редактировать',
  DELETE: 'Удалить',
  SAVE: 'Сохранить',
  CANCEL: 'Отменить',
  SEARCH: 'Поиск',
  FILTER: 'Фильтр',
  SORT: 'Сортировка',
  ADD: 'Добавить',
  REMOVE: 'Удалить',
  EXPAND: 'Развернуть',
  COLLAPSE: 'Свернуть',
  DRAG: 'Перетащить',
  DROP: 'Переместить',
  LOADING: 'Загрузка',
  ERROR: 'Ошибка',
  SUCCESS: 'Успех',
  INFO: 'Информация',
  WARNING: 'Предупреждение',
} as const

/**
 * Заголовки страниц
 */
export const PAGE_TITLES = {
  BOARD: 'Канбан Доска',
  SETTINGS: 'Настройки',
  ABOUT: 'О приложении',
  THEME_SETTINGS: 'Настройки темы',
} as const

/**
 * Заголовки компонентов
 */
export const COMPONENT_TITLES = {
  TASK_FILTER: 'Фильтр задач',
  TASK_FORM: 'Форма задачи',
  THEME_SELECTOR: 'Выбор темы',
  USER_SELECT: 'Выбор пользователя',
  NOTIFICATION_CONTAINER: 'Уведомления',
} as const

/**
 * Подписи кнопок
 */
export const BUTTON_LABELS = {
  ADD_TASK: 'Добавить задачу',
  EDIT_TASK: 'Редактировать задачу',
  DELETE_TASK: 'Удалить задачу',
  SAVE_TASK: 'Сохранить задачу',
  CANCEL: 'Отменить',
  CLOSE: 'Закрыть',
  APPLY: 'Применить',
  RESET: 'Сбросить',
  CLEAR: 'Очистить',
  SEARCH: 'Поиск',
  FILTER: 'Фильтр',
  SHOW_FILTERS: 'Показать фильтры',
  HIDE_FILTERS: 'Скрыть фильтры',
  EXPORT: 'Экспорт',
  IMPORT: 'Импорт',
  REFRESH: 'Обновить',
} as const

/**
 * Подписи полей
 */
export const FIELD_LABELS = {
  TITLE: 'Название',
  DESCRIPTION: 'Описание',
  STATUS: 'Статус',
  USER: 'Пользователь',
  DATE: 'Дата',
  PRIORITY: 'Приоритет',
  TAGS: 'Теги',
  SEARCH: 'Поиск',
  THEME: 'Тема',
  MODE: 'Режим',
  AUTO_MODE: 'Автоматическое переключение',
} as const

/**
 * Подсказки
 */
export const TOOLTIPS = {
  ADD_TASK: 'Добавить новую задачу',
  EDIT_TASK: 'Редактировать задачу',
  DELETE_TASK: 'Удалить задачу',
  DRAG_TASK: 'Перетащите задачу для изменения статуса',
  FILTER_TASKS: 'Фильтровать задачи',
  SEARCH_TASKS: 'Поиск по названию и описанию',
  CHANGE_THEME: 'Изменить тему оформления',
  TOGGLE_AUTO_MODE: 'Автоматическое переключение темы',
} as const
