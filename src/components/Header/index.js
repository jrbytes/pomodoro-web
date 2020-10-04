import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { useHistory, Link } from 'react-router-dom'

import { ContainerHeader } from './styles'

const Header = ({ goBackButton }) => {
  let history = useHistory()

  return (
    <ContainerHeader>
      {goBackButton === true && (
        <button onClick={history.goBack}>
          <IoIosArrowBack className="icon" />
        </button>
      )}
      <span>
        <Link to="/profile">POMO</Link>
      </span>
    </ContainerHeader>
  )
}

export default Header
