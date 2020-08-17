import React, { useEffect, useState } from 'react'
import { IoIosCreate, IoIosBookmark, IoIosBook } from 'react-icons/io'
import { Link } from 'react-router-dom'
import api from '../../services/api'

import Header from '../../components/Header'
import ModalProject from '../../components/ModalProject'
import './styles.css'

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [colorWhenUpdating, setColorWhenUpdating] = useState('')

  const [projectData, setProjectData] = useState({})

  useEffect(() => {
    async function loadProjects() {
      const { data } = await api.get('projects')

      setProjects(data)
    }

    loadProjects()
  }, [])

  useEffect(() => {
    let isSubscribed = true

    function toCleanClass() {
      if (colorWhenUpdating.length) {
        setTimeout(() => {
          if (isSubscribed) return setColorWhenUpdating('')
        }, 3000)
      }
    }
    toCleanClass()

    return () => (isSubscribed = false)
  }, [colorWhenUpdating])

  async function openUpdateProject(result) {
    setOpenModal(true)
    setProjectData(result)
  }

  function closeModal() {
    setOpenModal(false)
  }

  async function updateProject(result) {
    const { id, name, color } = result

    const { data } = await api.patch(`projects/${id}`, {
      name,
      color,
    })

    const updateStateOfProject = projects.map(item =>
      item.id === data.id
        ? { ...item, name: data.name, color: data.color }
        : item,
    )

    setProjects(updateStateOfProject)
    setColorWhenUpdating(data.id)
  }

  return (
    <>
      <Header goBackButton={false} />
      <div className="container">
        <h2 className="title-projects">
          <IoIosBook />
          Projetos
        </h2>
        {projects.map(item => (
          <div
            className={`projects${
              colorWhenUpdating === item.id ? ' updated' : ''
            }`}
            key={item.id}
          >
            <Link to={{ pathname: `/tasks/${item.id}` }}>
              <div className="projects-color-title">
                <IoIosBookmark
                  className="projects-booksmark"
                  style={{ color: `${item.color}` }}
                />
                <p>{item.name}</p>
              </div>
            </Link>
            <button onClick={() => openUpdateProject(item)}>
              <IoIosCreate className="icon" />
            </button>
          </div>
        ))}
      </div>
      <ModalProject
        openModal={openModal}
        title="Atualizar Projeto"
        projectData={projectData}
        updateProject={updateProject}
        closeModal={closeModal}
      />
    </>
  )
}

export default Projects
