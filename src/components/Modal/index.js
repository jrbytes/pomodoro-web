import React from 'react'

import './styles.css'

// eslint-disable-next-line react/prop-types
const Modal = ({ open, updateProject, closeModal }) => {
  return (
    <div className="modal" style={{ display: `${open ? 'block' : 'none'}` }}>
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <p>Some text in the modal...</p>
        <button onClick={updateProject}>Update</button>
      </div>
    </div>
  )
}

export default Modal
