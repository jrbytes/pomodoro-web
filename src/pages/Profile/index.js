import React from 'react'

import Header from '../../components/Header'

import { useAuth } from '../../hooks/auth'

function Profile() {
  const { signOut } = useAuth()

  return (
    <>
      <Header goBackButton={false} />
      <div>
        <button onClick={signOut}>Sair</button>
      </div>
    </>
  )
}

export default Profile
