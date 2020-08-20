import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { IoIosClose } from 'react-icons/io'

import { useHandleCloseModal } from '../../hooks/handleCloseModal'
import { useHandleFieldFocusAtModal } from '../../hooks/handleFieldFocusAtModal'

import './styles.css'

const ModalProject = ({
  openModal,
  title,
  projectData,
  updateProject,
  closeModal,
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

  const [name, setName] = useState('')
  const [color, setColor] = useState('')

  useEffect(() => {
    function loadProjectData() {
      const { name } = projectData
      const { color } = projectData

      setName(name)
      setColor(color)
    }

    loadProjectData()
  }, [projectData])

  const onSubmit = data => {
    updateProject(data)

    closeModal()
  }

  function handleName(e) {
    setName(e)
  }

  function handleColor(e) {
    setColor(e)
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

          {title}
        </div>

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
      </div>
    </div>
  )
}

export default ModalProject
