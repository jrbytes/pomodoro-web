import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { IoIosClose, IoMdTrash } from 'react-icons/io'

import { useHandleCloseModal } from '../../hooks/handleCloseModal'

import './styles.css'

const ModalTask = ({
  openModal,
  titleModal,
  taskData,
  updateTask,
  closeModal,
  deleteItem,
}) => {
  const { handleSubmit, register, errors } = useForm()
  const [handleEsc, closeModalClickingOutside] = useHandleCloseModal({
    closeModal,
  })

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

  function handleDeleteItem(e) {
    e.preventDefault()
    deleteItem(id)
  }

  return (
    <div
      className={`modal${openModal ? ' active' : ''}`}
      onClick={e => closeModalClickingOutside(e.target.className)}
      onKeyUp={handleEsc && closeModal}
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

          <div className="form-buttons-modal">
            <input type="submit" value="Atualizar" />

            <button onClick={e => handleDeleteItem(e)}>
              <IoMdTrash />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ModalTask
