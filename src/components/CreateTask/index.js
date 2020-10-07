import React from 'react'
import { IoMdAdd, IoIosCheckmarkCircle } from 'react-icons/io'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { addTaskRequest } from '../../store/modules/tasks/actions'

import { useKeyboardShortcutTab } from '../../hooks/keyboardShotcutTab'

import { CreateTaskCSS } from './styles'

function CreateTask({ project_id }) {
  const [nameRef] = useKeyboardShortcutTab()
  const dispatch = useDispatch()

  const { handleSubmit, register, errors, reset } = useForm()

  const onSubmit = data => {
    dispatch(addTaskRequest({ name: data.name, project_id }))
    reset()
  }

  return (
    <>
      <CreateTaskCSS>
        <IoMdAdd />
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <input
            type="text"
            name="name"
            placeholder={errors.name && errors.name.message}
            style={{
              borderColor: `${
                errors.name && errors.name.message
                  ? 'var(--color-input-alert)'
                  : ''
              }`,
            }}
            ref={e => {
              register(e, {
                required: {
                  value: true,
                  message: 'É necessário digitar uma tarefa',
                },
                maxLength: 240,
                min: 1,
              })
              nameRef.current = e
            }}
          />

          <button>
            <IoIosCheckmarkCircle />
          </button>
        </form>
      </CreateTaskCSS>
    </>
  )
}

export default CreateTask
