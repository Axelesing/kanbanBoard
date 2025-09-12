import { memo } from 'react'
import { Box, TextField, Typography } from '@mui/material'

type TaskFormProps = {
  title: string | null | undefined
  description: string | null | undefined
  titleError?: string
  descriptionError?: string
  titleStatus?: 'default' | 'alert' | 'success'
  descriptionStatus?: 'default' | 'alert' | 'success'
  onTitleChange: (v: string | null | undefined) => void
  onDescriptionChange: (v: string | null | undefined) => void
  onTitleBlur?: () => void
  onDescriptionBlur?: () => void
}

export const TaskForm = memo(
  ({
    title,
    description,
    titleError,
    descriptionError,
    titleStatus = 'default',
    descriptionStatus = 'default',
    onTitleChange,
    onDescriptionChange,
    onTitleBlur,
    onDescriptionBlur,
  }: TaskFormProps) => {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 3 }}>
        <TextField
          type="text"
          value={title || ''}
          size="medium"
          label="Название"
          placeholder="Введите название"
          required
          error={titleStatus === 'alert'}
          helperText={titleError || ''}
          onChange={(event) => onTitleChange(event.target.value)}
          onBlur={onTitleBlur}
          aria-describedby={titleError ? 'title-error' : undefined}
          fullWidth
        />
        {titleError && (
          <Typography
            id="title-error"
            role="alert"
            aria-live="polite"
            color="error"
            variant="caption"
          >
            {titleError}
          </Typography>
        )}

        <TextField
          multiline
          value={description || ''}
          size="medium"
          minRows={6}
          label="Описание"
          placeholder="Введите описание задачи"
          error={descriptionStatus === 'alert'}
          helperText={descriptionError || ''}
          onChange={(event) => onDescriptionChange(event.target.value)}
          onBlur={onDescriptionBlur}
          aria-describedby={descriptionError ? 'description-error' : undefined}
          fullWidth
        />
        {descriptionError && (
          <Typography
            id="description-error"
            role="alert"
            aria-live="polite"
            color="error"
            variant="caption"
          >
            {descriptionError}
          </Typography>
        )}
      </Box>
    )
  },
)

TaskForm.displayName = 'TaskForm'
