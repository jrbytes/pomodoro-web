import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { IoIosClose, IoMdTrash, IoMdCheckbox } from 'react-icons/io'
import { useDispatch } from 'react-redux'
import api from '../../services/api'

import { useHandleCloseModal } from '../../hooks/handleCloseModal'
import { useHandleFieldFocusAtModal } from '../../hooks/handleFieldFocusAtModal'

import './styles.css'
import { ActionTypes as ActionTypesTasks } from '../../store/modules/tasks/types'
import { ActionTypes as ActionTypesCompletedTasks } from '../../store/modules/completedTasks/types'

const ModalTask = ({
  openModal,
  titleModal,
  taskData,
  project_id,
  closeModal,
  handleSetQuestion,
  question,
  setCompletedTasks,
  searchCompletedTask,
}) => {
  const { handleSubmit, register, errors, clearErrors, reset } = useForm()
  const [handleEsc, closeModalClickingOutside] = useHandleCloseModal({
    closeModal,
    openModal,
    clearErrors,
    errors: errors.name,
    reset,
  })
  const dispatch = useDispatch()
  const [nameRef] = useHandleFieldFocusAtModal({ openModal })

  useEffect(() => {
    async function loadTasks() {
      const { data } = await api.get(`completed-tasks/${project_id}`)

      dispatch({
        type: ActionTypesTasks.INITIAL_COMPLETE_TASK_STATE,
        payload: { completedTasks: data },
      })
    }
    loadTasks()
  }, [project_id, dispatch])

  const onSubmit = data => {
    dispatch({
      type: ActionTypesTasks.UPDATE_TASK_REQUEST,
      payload: { id: taskData.id, name: data.name, project_id },
    })

    closeModal()

    setTimeout(() => {
      reset()
    }, 300)
  }

  function handleDeleteItemWithQuestion(result) {
    dispatch({
      type: ActionTypesTasks.DELETE_TASK_REQUEST,
      payload: { id: result },
    })

    closeModal()
  }

  function handleDeleteItem(e) {
    e.preventDefault()

    if (taskData.realized_pomos > 0) return handleSetQuestion(true)

    dispatch({
      type: ActionTypesTasks.DELETE_TASK_REQUEST,
      payload: { id: taskData.id },
    })

    closeModal()
  }

  function handleToCompleteItem(e) {
    e.preventDefault()

    if (taskData.realized_pomos === 0) return window.alert('Ops, sem pomos')

    dispatch({
      type: ActionTypesCompletedTasks.TASK_COMPLETE_REQUEST,
      payload: {
        id: taskData.id,
        project_id: taskData.project_id,
        completed: true,
      },
    })

    closeModal()
    setCompletedTasks(false)
    searchCompletedTask()
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

              <button onClick={e => handleToCompleteItem(e)}>
                <IoMdCheckbox />
              </button>

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
              <button onClick={() => handleDeleteItemWithQuestion(taskData.id)}>
                Sim
              </button>
              <button onClick={closeModal}>Não</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ModalTask
