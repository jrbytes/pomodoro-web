import React, { useState } from 'react'
import { IoMdAdd, IoIosCheckmarkCircle } from 'react-icons/io'
import { useForm } from 'react-hook-form'

import { useKeyboardShortcutTab } from '../../hooks/keyboardShotcutTab'

import './styles.css'

function CreateItem({ createItem, errorMessage }) {
  const [name, setName] = useState('')

  const [nameRef] = useKeyboardShortcutTab()

  const { handleSubmit, register, reset, errors } = useForm()

  const onSubmit = data => {
    createItem(data)
    reset()
  }

  function handleName(e) {
    setName(e)
  }

  return (
    <>
      <div className="create-task">
        <IoMdAdd className="icon-create-task icon" />
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <input
            type="text"
            name="name"
            value={name || ''}
            placeholder={errors.name && errors.name.message}
            onChange={e => handleName(e.target.value)}
            ref={e => {
              register(e, {
                required: {
                  value: true,
                  message: errorMessage,
                },
                maxLength: 240,
                min: 1,
                pattern: {
                  value: name,
                },
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

export default CreateItem
