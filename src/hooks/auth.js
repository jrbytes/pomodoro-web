import React, { createContext, useCallback, useState, useContext } from 'react'
import api from '../services/api'

const AuthContext = createContext({})

const AuthProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const token = localStorage.getItem('@AppPomo:token')
    const user = localStorage.getItem('@AppPomo:user')

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`

      return { token, user: JSON.parse(user) }
    }

    return {}
  })

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    })

    const { token, user } = response.data

    localStorage.setItem('@AppPomo:token', token)
    localStorage.setItem('@AppPomo:user', JSON.stringify(user))

    api.defaults.headers.authorization = `Bearer ${token}`

    setData({ token, user })
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem('@AppPomo:token')
    localStorage.removeItem('@AppPomo:user')

    setData({})
  }, [])

  const updateUser = useCallback(
    updateData => {
      localStorage.setItem('@AppPomo:user', JSON.stringify(updateData))

      setData({
        token: data.token,
        user: {
          ...data.user,
          ...updateData,
        },
      })
    },
    [data.token, data.user],
  )

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)

  return context
}

export { AuthProvider, useAuth }
