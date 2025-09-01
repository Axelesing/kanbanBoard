const REM_DEFAULT_VALUE = 16

export const convertPxToRem = (...values: number[]) =>
  values
    .map((item) => item / REM_DEFAULT_VALUE)
    .map((item) => (item === 0 ? item : `${item.toFixed(2)}rem`))
    .join(' ')
