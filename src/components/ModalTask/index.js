import React, { useState, useEffect, useRef } from 'react'
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
  handleSetQuestion,
  question,
}) => {
  const { handleSubmit, register, errors } = useForm()
  const [handleEsc, closeModalClickingOutside] = useHandleCloseModal({
    closeModal,
  })

  const [id, setId] = useState('')
  const [name, setName] = useState('')

  const nameRef = useRef(null)

  useEffect(() => {
    if (openModal) {
      setTimeout(() => {
        nameRef.current.focus()
      }, 100)
    }
  }, [openModal])

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

    if (taskData.realizedPomos > 0) return handleSetQuestion(true)

    deleteItem(id)
  }

  return (
    <div
      className={`modal${openModal ? ' active' : ''}`}
      onClick={e => closeModalClickingOutside(e.target.className)}
      onKeyUp={handleEsc}
    >
      <div className="modal-content">
        <div className="modal-title-close">
          <span className="close" onClick={closeModal}>
            <IoIosClose className="icon" />
          </span>
          {console.log()}
          {titleModal}
        </div>

        {!question && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="form"
            autoComplete="off"
          >
            <input
              type="text"
              name="name"
              value={name || ''}
              onChange={e => handleName(e.target.value)}
              ref={e => {
                register(e, {
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
                })
                nameRef.current = e
              }}
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
        )}

        {question && (
          <>
            <div className="modal-content-text-question">
              <p>
                Opss! Tem certeza que deseja apagar a tarefa{' '}
                <strong>{name}</strong>?
              </p>
              <p>
                Essa ação pode excluir pomodoros executados. Considere renomear.
              </p>
            </div>
            <div className="form-buttons-modal-question">
              <button onClick={() => deleteItem(id)}>Sim</button>
              <button onClick={closeModal}>Não</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ModalTask
