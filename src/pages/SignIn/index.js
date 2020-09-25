import React, { useRef, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory, Link } from 'react-router-dom'
import { IoIosCreate } from 'react-icons/io'

import { useAuth } from '../../hooks/auth'

import { ContainerSignIn, Span, RegisterLink, Title } from './styles'

const SignIn = () => {
  const emailRef = useRef(null)

  const { signIn } = useAuth()
  const history = useHistory()

  const { handleSubmit, register, errors } = useForm()

  const [credentials, setCredentials] = useState(false)

  const onSubmit = useCallback(
    async data => {
      try {
        await signIn({
          email: data.email,
          password: data.password,
        })

        history.push('/projects')
      } catch (error) {
        setCredentials(true)
      }
    },
    [signIn, history],
  )

  return (
    <ContainerSignIn>
      <Title>Login</Title>

      <form onSubmit={handleSubmit(onSubmit)} className="form">
        {credentials && <Span>Suas credenciais estão incorretas</Span>}

        <input
          type="email"
          name="email"
          ref={e => {
            register(e, {
              required: {
                value: true,
                message: 'É necessário incluir um e-mail.',
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Inclua um e-mail válido.',
              },
            })
            emailRef.current = e
          }}
        />
        {errors.email && <Span>{errors.email.message}</Span>}

        <input
          type="password"
          name="password"
          ref={register({
            required: {
              value: true,
              message: 'É necessário incluir uma senha.',
            },
            minLength: {
              value: 6,
              message: 'Sua senha deve ter 6 caracteres no mínimo.',
            },
          })}
        />
        {errors.password && <Span>{errors.password.message}</Span>}

        <div className="form-buttons-modal">
          <input type="submit" value="Entrar" />
        </div>
      </form>

      <RegisterLink>
        <IoIosCreate />
        <Link to="/signup">Cadastre-se</Link>
      </RegisterLink>
    </ContainerSignIn>
  )
}

export default SignIn
