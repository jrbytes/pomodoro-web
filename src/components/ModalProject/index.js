import React, { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { IoIosClose } from 'react-icons/io'
import { useDispatch } from 'react-redux'
import { ActionTypes } from '../../store/modules/projects/types'

import { useHandleCloseModal } from '../../hooks/handleCloseModal'
import { useHandleFieldFocusAtModal } from '../../hooks/handleFieldFocusAtModal'

import { Modal, ModalContent, ModalTitleClose } from './styles'

const ModalProject = ({ openModal, title, projectData, closeModal }) => {
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
  const [nameRef] = useHandleFieldFocusAtModal({ openModal })
  const dispatch = useDispatch()

  const [color, setColor] = useState('')

  useEffect(() => {
    function loadProjectData() {
      const { color } = projectData

      setColor(color)
    }

    loadProjectData()
  }, [projectData])

  const onSubmit = data => {
    dispatch({
      type: ActionTypes.UPDATE_PROJECT_REQUEST,
      payload: {
        id: projectData.id,
        name: data.name,
        color: data.color,
      },
    })

    closeModal()

    setTimeout(() => {
      reset()
    }, 300)
  }

  function handleColor(e) {
    setColor(e)
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

          {title}
        </ModalTitleClose>

        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <input
            type="text"
            name="name"
            defaultValue={projectData.name}
            ref={e => {
              register(e, {
                required: {
                  value: true,
                  message: 'É necessário renomear o projeto para atualizar',
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

          <select
            name="color"
            value={color}
            onChange={e => handleColor(e.target.value)}
            ref={register({ required: true })}
          >
            <option value="violet">violet</option>
            <option value="yellow">yellow</option>
            <option value="black">black</option>
            <option value="green">green</option>
            <option value="blue">blue</option>
            <option value="red">red</option>
            <option value="gray">gray</option>
          </select>

          <div className="form-buttons-modal">
            <input type="submit" value="Atualizar" />
          </div>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default ModalProject
