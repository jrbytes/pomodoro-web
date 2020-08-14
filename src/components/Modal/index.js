import React from 'react'

import './styles.css'

// eslint-disable-next-line react/prop-types
const Modal = ({ open, title, updateProject, closeModal }) => {
  return (
    <div
      className="modal"
      style={{ display: `${open ? 'block' : 'none'}` }}
      onClick={closeModal}
    >
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>

        <h3>{title}</h3>

        <form>
          <input type="text" />
        </form>

        <button onClick={updateProject}>Update</button>
      </div>
    </div>
  )
}

export default Modal
