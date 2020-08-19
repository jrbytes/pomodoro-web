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
  const [name, setName] = useState('')

  useEffect(() => {
    function loadData() {
      const { id, name } = taskData

      setId(id)
      setName(name)
    }

    loadData()
  }, [taskData])

  const onSubmit = data => {
    Object.assign(data, { id })
    updateTask(data)

    closeModal()
  }

  function handleName(e) {
    setName(e)
  }

  function closeModalClickingOutside(e) {
    if (e === 'modal active') return closeModal()
  }

  return (
    <div
      className={`modal${openModal ? ' active' : ''}`}
      onClick={e => closeModalClickingOutside(e.target.className)}
    >
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
            name="name"
            value={name || ''}
            onChange={e => handleName(e.target.value)}
            ref={register({
              required: {
                value: true,
                message: 'É necessário renomear o projeto para atualizar',
              },
              max: 240,
              min: 1,
              maxLength: 240,
              pattern: {
                value: name,
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
