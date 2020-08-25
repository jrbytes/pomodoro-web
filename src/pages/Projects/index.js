import React, { useEffect, useState } from 'react'
import { IoIosCreate, IoIosBookmark, IoIosBook } from 'react-icons/io'
import { Link } from 'react-router-dom'
import api from '../../services/api'

import { useToCleanCSSClass } from '../../hooks/toCleanCSSClass'
import { useHandleCloseModal } from '../../hooks/handleCloseModal'

import Header from '../../components/Header'
import ModalProject from '../../components/ModalProject'
import CreateItem from '../../components/CreateItem'
import './styles.css'

const Projects = () => {
  const [projects, setProjects] = useState([])

  const [openModal, setOpenModal] = useState(false)
  const [projectData, setProjectData] = useState({})

  const [colorWhenUpdating, setColorWhenUpdating] = useToCleanCSSClass()
  const [handleEsc] = useHandleCloseModal({ closeModal })

  useEffect(() => {
    async function loadProjects() {
      const { data } = await api.get('projects')

      setProjects(data)
    }

    loadProjects()
  }, [])

  async function openUpdateProject(result) {
    setOpenModal(true)
    setProjectData(result)
  }

  function closeModal() {
    setOpenModal(false)
  }

  async function updateProject(result) {
    const { name, color } = result

    const nameIsEqual = projectData.name === result.name
    const colorIsEqual = projectData.color === result.color

    if (nameIsEqual && colorIsEqual) return

    const { data } = await api.patch(`projects/${projectData.id}`, {
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

  const createItem = async result => {
    const { name } = result

    const { data } = await api.post('projects', {
      name,
      color: 'violet',
    })

    setProjects([...projects, data])
    setColorWhenUpdating(data.id)
  }

  return (
    <>
      <Header goBackButton={false} />

      {projects.length ? (
        <div className="container" onKeyUp={handleEsc}>
          <h2 className="title-projects">
            <IoIosBook />
            Projetos
          </h2>

          <CreateItem
            createItem={createItem}
            errorMessage="É necessário digitar um projeto"
          />

          {projects.map(item => (
            <div
              className={`projects${
                colorWhenUpdating === item.id ? ' updated-element' : ''
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
      ) : (
        <div className="loader">Loading...</div>
      )}

      <ModalProject
        openModal={openModal}
        title="Editar Projeto"
        projectData={projectData}
        updateProject={updateProject}
        closeModal={closeModal}
      />
    </>
  )
}

export default Projects
