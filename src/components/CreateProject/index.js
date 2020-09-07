import React from 'react'
import { IoMdAdd, IoIosCheckmarkCircle } from 'react-icons/io'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { addProjectRequest } from '../../store/modules/projects/actions'

import { useKeyboardShortcutTab } from '../../hooks/keyboardShotcutTab'

import './styles.css'

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
      <div className="create-task">
        <IoMdAdd className="icon-create-task icon" />
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <input
            type="text"
            name="name"
            placeholder={errors.name && errors.name.message}
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
            id={
              errors.name && errors.name.message ? 'form-error-placeholder' : ''
            }
          />

          <button>
            <IoIosCheckmarkCircle className="icon" />
          </button>
        </form>
      </div>
    </>
  )
}

export default CreateProject
