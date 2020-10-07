import React from 'react'
import { IoMdAdd, IoIosCheckmarkCircle } from 'react-icons/io'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { addProjectRequest } from '../../store/modules/projects/actions'

import { useKeyboardShortcutTab } from '../../hooks/keyboardShotcutTab'

import { CreateProjectCSS } from './styles'

function CreateProject() {
  const [nameRef] = useKeyboardShortcutTab()
  const dispatch = useDispatch()

  const { handleSubmit, register, errors, reset } = useForm()

  const onSubmit = data => {
    dispatch(addProjectRequest(data))
    reset()
  }

  return (
    <>
      <CreateProjectCSS>
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
                  message: 'É necessário digitar um projeto',
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
      </CreateProjectCSS>
    </>
  )
}

export default CreateProject
