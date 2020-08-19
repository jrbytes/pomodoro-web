import React, { useState } from 'react'
import { IoMdAdd, IoIosCheckmarkCircle } from 'react-icons/io'
import { useForm } from 'react-hook-form'

import './styles.css'

function CreateItem({ createItem }) {
  const [name, setName] = useState('')

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            name="name"
            placeholder={errors.name && errors.name.message}
            onChange={e => handleName(e.target.value)}
            ref={register({
              required: {
                value: true,
                message: 'É necessário cadastrar algo',
              },
              maxLength: 240,
              pattern: {
                value: name,
              },
            })}
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
