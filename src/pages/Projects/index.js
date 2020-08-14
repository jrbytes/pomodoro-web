import React, { useEffect, useState } from 'react'
import { IoIosCreate, IoIosBookmark, IoIosBook } from 'react-icons/io'
import { Link } from 'react-router-dom'
import api from '../../services/api'

import Header from '../../components/Header'
import Modal from '../../components/Modal'
import './styles.css'

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    async function loadProjects() {
      const { data } = await api.get('projects')

      setProjects(data)
    }

    loadProjects()
  }, [])

  async function openUpdateProject(result) {
    setOpenModal(true)
    console.log(result)
  }

  function closeModal() {
    setOpenModal(false)
  }

  async function updateProject() {
    setOpenModal(false)
    console.log('update here')
  }

  return (
    <>
      <Header />
      <div className="container">
        <h2 className="title-projects">
          <IoIosBook />
          Projetos
        </h2>
        {projects.map(item => (
          <div className="projects" key={item.id}>
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
      <Modal
        open={openModal}
        title="Atualizar Projeto"
        updateProject={updateProject}
        closeModal={closeModal}
      />
    </>
  )
}

export default Projects
