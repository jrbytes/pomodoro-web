import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'

import './styles.css'

const Header = () => {
  return (
    <header className="header-container">
      <IoIosArrowBack />
      <span>POMO</span>
    </header>
  )
}

export default Header
