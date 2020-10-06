import React, { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { IoIosClose, IoMdTrash, IoMdCheckbox } from 'react-icons/io'
import { useDispatch } from 'react-redux'
import api from '../../services/api'

import { useHandleCloseModal } from '../../hooks/handleCloseModal'
import { useHandleFieldFocusAtModal } from '../../hooks/handleFieldFocusAtModal'

import { ActionTypes as ActionTypesTasks } from '../../store/modules/tasks/types'
import { ActionTypes as ActionTypesCompletedTasks } from '../../store/modules/completedTasks/types'

import {
  Modal,
  ModalContent,
  ModalTitleClose,
  ModalContentTextQuestion,
  FormButtonsModalQuestion,
} from './styles'

const ModalTask = ({
  openModal,
  titleModal,
  taskData,
  closeModal,
  handleSetQuestion,
  question,
  setCompletedTasks,
  searchCompletedTask,
}) => {
  const closeModalRef = useRef(null)

  const { handleSubmit, register, errors, clearErrors, reset } = useForm()
  const [handleEsc, closeModalClickingOutside] = useHandleCloseModal({
    closeModal,
    openModal,
    clearErrors,
    errors: errors.name,
    reset,
    closeModalRef,
  })
  const dispatch = useDispatch()
  const [nameRef] = useHandleFieldFocusAtModal({ openModal })

  useEffect(() => {
    async function loadTasks() {
      const { data } = await api.get(`completed-tasks/${taskData.project_id}`)

      dispatch({
        type: ActionTypesTasks.INITIAL_COMPLETE_TASK_STATE,
        payload: { completedTasks: data },
      })
    }
    loadTasks()
  }, [taskData, dispatch])

  const onSubmit = data => {
    dispatch({
      type: ActionTypesTasks.UPDATE_TASK_REQUEST,
      payload: {
        id: taskData.id,
        name: data.name,
        project_id: taskData.project_id,
      },
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
    <Modal
      openModal={openModal}
      onClick={e => closeModalClickingOutside(e.target.className)}
      onKeyUp={handleEsc}
      ref={closeModalRef}
    >
      <ModalContent>
        <ModalTitleClose>
          <span onClick={closeModal}>
            <IoIosClose className="icon" />
          </span>

          {titleModal}
        </ModalTitleClose>

        {!question && (
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
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
            <ModalContentTextQuestion>
              <p>
                Opss! Tem certeza que deseja apagar a tarefa{' '}
                <strong>{taskData.name}</strong>?
              </p>
              <p>
                Essa ação pode excluir pomodoros executados. Considere renomear.
              </p>
            </ModalContentTextQuestion>
            <FormButtonsModalQuestion>
              <button onClick={() => handleDeleteItemWithQuestion(taskData.id)}>
                Sim
              </button>
              <button onClick={closeModal}>Não</button>
            </FormButtonsModalQuestion>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default ModalTask
