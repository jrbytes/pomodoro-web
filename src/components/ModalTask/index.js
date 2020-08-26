import React from 'react'
import { useForm } from 'react-hook-form'
import { IoIosClose, IoMdTrash } from 'react-icons/io'

import { useHandleCloseModal } from '../../hooks/handleCloseModal'
import { useHandleFieldFocusAtModal } from '../../hooks/handleFieldFocusAtModal'

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
  const { handleSubmit, register, errors, clearErrors, reset } = useForm()
  const [handleEsc, closeModalClickingOutside] = useHandleCloseModal({
    closeModal,
    openModal,
    clearErrors,
    errors: errors.name,
    reset,
  })
  const [nameRef] = useHandleFieldFocusAtModal({ openModal })

  const onSubmit = data => {
    updateTask(data)
    closeModal()

    setTimeout(() => {
      reset()
    }, 300)
  }

  function handleDeleteItem(e) {
    e.preventDefault()

    if (taskData.realized_pomos > 0) return handleSetQuestion(true)

    deleteItem(taskData.id)
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
              defaultValue={taskData.name}
              ref={e => {
                register(e, {
                  required: {
                    value: true,
                    message: 'É necessário renomear a tarefa para atualizar',
                  },
                  max: 240,
                  min: 1,
                  maxLength: 240,
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
                <strong>{taskData.name}</strong>?
              </p>
              <p>
                Essa ação pode excluir pomodoros executados. Considere renomear.
              </p>
            </div>
            <div className="form-buttons-modal-question">
              <button onClick={() => deleteItem(taskData.id)}>Sim</button>
              <button onClick={closeModal}>Não</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ModalTask
