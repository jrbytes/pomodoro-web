import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { useHistory, Link } from 'react-router-dom'

import './styles.css'

const Header = ({ goBackButton }) => {
  let history = useHistory()

  return (
    <header
      className={`header-container${
        goBackButton === false ? ' just-logo' : ''
      }`}
    >
      {goBackButton === true && (
        <button onClick={history.goBack}>
          <IoIosArrowBack className="icon" />
        </button>
      )}
      <span>
        <Link to="/profile">POMO</Link>
      </span>
    </header>
  )
}

export default Header
