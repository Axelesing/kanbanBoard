import { Layout } from '@consta/uikit/Layout'
import { cnMixFlex } from '@consta/uikit/MixFlex'
import { TextField } from '@consta/uikit/TextField'

type TaskFormProps = {
  title: string | null | undefined
  description: string | null | undefined
  isTitleInvalid: boolean
  onTitleChange: (v: string | null | undefined) => void
  onDescriptionChange: (v: string | null | undefined) => void
}

export function TaskForm({
  title,
  description,
  isTitleInvalid,
  onTitleChange,
  onDescriptionChange,
}: TaskFormProps) {
  return (
    <Layout className={cnMixFlex({ direction: 'column', gap: 'l' })} flex={3}>
      <TextField
        type="text"
        value={title}
        size="l"
        label="Название"
        placeholder="Введите название"
        required
        status={isTitleInvalid ? 'alert' : undefined}
        caption={isTitleInvalid ? 'Обязательное поле' : ''}
        onChange={onTitleChange}
      />
      <TextField
        type="textarea"
        value={description}
        size="m"
        minRows={13}
        cols={75}
        label="Описание"
        placeholder="Введите описание задачи"
        onChange={onDescriptionChange}
      />
    </Layout>
  )
}
