import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { IoIosClose } from 'react-icons/io'

import { useHandleEsc } from '../../hooks/handleEsc'

import './styles.css'

const ModalProject = ({
  openModal,
  title,
  projectData,
  updateProject,
  closeModal,
}) => {
  const { handleSubmit, register, errors } = useForm()
  const [handleEsc] = useHandleEsc()

  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [color, setColor] = useState('')

  useEffect(() => {
    function loadProjectData() {
      const { id } = projectData
      const { name } = projectData
      const { color } = projectData

      setId(id)
      setName(name)
      setColor(color)
    }

    loadProjectData()
  }, [projectData])

  const onSubmit = data => {
    Object.assign(data, { id })
    updateProject(data)

    closeModal()
  }

  function handleColor(e) {
    setColor(e)
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
      onKeyUp={handleEsc && closeModal}
    >
      <div className="modal-content">
        <div className="modal-title-close">
          <span className="close" onClick={closeModal}>
            <IoIosClose className="icon" />
          </span>

          {title}
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

          <input type="submit" value="Atualizar" />
        </form>
      </div>
    </div>
  )
}

export default ModalProject
