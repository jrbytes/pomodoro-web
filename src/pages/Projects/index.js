import React, { useEffect, useState } from 'react'
import { IoIosCreate, IoIosBookmark, IoIosBook } from 'react-icons/io'
import { Link } from 'react-router-dom'
import api from '../../services/api'

import './styles.css'

const Projects = () => {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    async function loadProjects() {
      const { data } = await api.get('projects')

      setProjects(data)
    }

    loadProjects()
  }, [])

  return (
    <div className="container">
      <h2 className="title-projects">
        <IoIosBook />
        Projetos
      </h2>
      {projects.map(item => (
        <Link to={{ pathname: `/tasks/${item.id}` }} key={item.id}>
          <div className="projects">
            <div className="projects-color-title">
              <IoIosBookmark
                className="projects-booksmark"
                style={{ color: `${item.color}` }}
              />
              <p>{item.name}</p>
            </div>
            <IoIosCreate className="icon" />
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Projects
