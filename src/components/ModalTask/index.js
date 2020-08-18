import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { IoIosClose } from 'react-icons/io'

import './styles.css'

const ModalTask = ({
  openModal,
  titleModal,
  taskData,
  updateTask,
  closeModal,
}) => {
  const { handleSubmit, register, errors } = useForm()

  const [id, setId] = useState('')
  const [title, setTitle] = useState('')

  useEffect(() => {
    function loadTitleData() {
      const { id } = taskData
      const { title } = taskData

      setId(id)
      setTitle(title)
    }

    loadTitleData()
  }, [taskData])

  const onSubmit = data => {
    Object.assign(data, { id })
    updateTask(data)

    closeModal()
  }

  function handleTitle(e) {
    setTitle(e)
  }

  return (
    <div className={`modal${openModal ? ' active' : ''}`}>
      <div className="modal-content">
        <div className="modal-title-close">
          <span className="close" onClick={closeModal}>
            <IoIosClose className="icon" />
          </span>

          {titleModal}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <input
            type="text"
            name="title"
            value={title || ''}
            onChange={e => handleTitle(e.target.value)}
            ref={register({
              required: {
                value: true,
                message: 'É necessário renomear o projeto para atualizar',
              },
              max: 240,
              min: 1,
              maxLength: 240,
              pattern: {
                value: title,
              },
            })}
            id={errors.name && errors.name.message ? 'form-error' : ''}
          />
          {errors.name && <span>{errors.name.message}</span>}

          <input type="submit" value="Atualizar" />
        </form>
      </div>
    </div>
  )
}

export default ModalTask
