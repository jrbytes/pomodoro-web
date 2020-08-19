import React, { useState } from 'react'
import { IoMdAdd, IoIosCheckmarkCircle } from 'react-icons/io'
import { useForm } from 'react-hook-form'

import './styles.css'

function CreateItem({ createTask }) {
  const [title, setTitle] = useState('')

  const { handleSubmit, register, reset, errors } = useForm({
    defaultValues: {
      title,
    },
  })

  const onSubmit = data => {
    createTask(data)
    reset()
  }

  function handleTitle(e) {
    setTitle(e)
  }

  return (
    <>
      <div className="create-task">
        <IoMdAdd className="icon-create-task icon" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            name="title"
            placeholder={errors.title && errors.title.message}
            onChange={e => handleTitle(e.target.value)}
            ref={register({
              required: {
                value: true,
                message: 'É necessário cadastrar algo',
              },
              maxLength: 240,
              pattern: {
                value: title,
              },
            })}
            id={
              errors.title && errors.title.message
                ? 'form-error-placeholder'
                : ''
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
