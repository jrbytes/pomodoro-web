import React, { useEffect, useState } from 'react'
import { IoIosCreate, IoIosBookmark, IoIosBook } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ActionTypes } from '../../store/modules/projects/types'

import { useToCleanCSSClass } from '../../hooks/toCleanCSSClass'
import { useHandleCloseModal } from '../../hooks/handleCloseModal'

import Header from '../../components/Header'
import ModalProject from '../../components/ModalProject'
import CreateProject from '../../components/CreateProject'

import { Container, Title, Project, ProjectColorTitle } from './styles'

const Projects = () => {
  const dispatch = useDispatch()
  const projects = useSelector(state => state.projects.items)
  const effectCreateItem = useSelector(state => state.defaultConfig.items)

  const [spinner, setSpinner] = useState(false)

  const [openModal, setOpenModal] = useState(false)
  const [projectData, setProjectData] = useState({})

  const [colorWhenUpdating, setColorWhenUpdating] = useToCleanCSSClass()
  const [handleEsc] = useHandleCloseModal({ closeModal })

  useEffect(() => {}, [dispatch])

  useEffect(() => {
    dispatch({
      type: ActionTypes.INITIAL_PROJECT_STATE_REQUEST,
    })

    if (effectCreateItem.color_when_updating) {
      setColorWhenUpdating(effectCreateItem.color_when_updating.id)
    }

    setSpinner(true)
  }, [dispatch, effectCreateItem, setColorWhenUpdating])

  async function openUpdateProject(result) {
    setOpenModal(true)
    setProjectData(result)
  }

  function closeModal() {
    setOpenModal(false)
  }

  return (
    <>
      <Header goBackButton={false} />

      {spinner ? (
        <Container onKeyUp={handleEsc}>
          <Title>
            <IoIosBook />
            Projetos
          </Title>

          <CreateProject />

          {projects.map(item => (
            <Project
              colorWhenUpdating={
                colorWhenUpdating === item.id ? 'updated-element' : ''
              }
              key={item.id}
            >
              <Link to={{ pathname: `/tasks/${item.id}` }}>
                <ProjectColorTitle>
                  <IoIosBookmark style={{ color: `${item.color}` }} />
                  <p>{item.name}</p>
                </ProjectColorTitle>
              </Link>
              <button onClick={() => openUpdateProject(item)}>
                <IoIosCreate className="icon" />
              </button>
            </Project>
          ))}

          {spinner === true && !projects.length && (
            <span className="alert-no-items">Nenhum projeto cadastrado</span>
          )}
        </Container>
      ) : (
        <div className="loader">Loading...</div>
      )}

      <ModalProject
        openModal={openModal}
        title="Editar Projeto"
        projectData={projectData}
        closeModal={closeModal}
      />
    </>
  )
}

export default Projects
