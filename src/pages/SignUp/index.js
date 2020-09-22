import React, { useState, useCallback, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

import { useAuth } from '../../hooks/auth'
import api from '../../services/api'

import { Container, FormPasswords, FieldPassword } from './styles'

function SignUp() {
  const nameRef = useRef(null)
  const emailRef = useRef(null)

  const { signIn } = useAuth()
  const history = useHistory()

  const { handleSubmit, register, errors, setError, watch } = useForm()

  const [credentials, setCredentials] = useState(false)

  const onSubmit = useCallback(
    async data => {
      try {
        const { name, email, password } = data

        const response = await api.post('users', { name, email, password })

        if (response.status === 200) {
          await signIn({
            email: data.email,
            password: data.password,
          })

          history.push('/projects')
        }
      } catch (error) {
        console.log(error)
        setError()
        setCredentials(true)
      }
    },
    [signIn, history, setError],
  )

  return (
    <Container>
      <h2>Cadastrar usuário</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form"
        autoComplete="off"
      >
        <label htmlFor="name">Nome Completo:</label>
        <input
          type="text"
          name="name"
          ref={e => {
            register(e, {
              required: {
                value: true,
                message: 'É necessário incluir um nome.',
              },
            })
            nameRef.current = e
          }}
        />

        <label htmlFor="email">E-mail:</label>
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

        <FormPasswords>
          <FieldPassword>
            <label htmlFor="password">Senha:</label>
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
          </FieldPassword>

          <FieldPassword>
            <label htmlFor="password_confirmation">Confirmar Senha:</label>
            <input
              type="password"
              name="password_confirmation"
              ref={register({
                validate: value =>
                  value === watch('password') ||
                  'As senhas precisam ser iguais.',
              })}
            />
            {errors.password_confirmation && (
              <span>{errors.password_confirmation.message}</span>
            )}
          </FieldPassword>
        </FormPasswords>

        <div className="form-buttons-modal">
          <input type="submit" value="Cadastrar" />
        </div>
      </form>
      {errors.email && <span>{errors.email.message}</span>}
      {errors.password && <span>{errors.password.message}</span>}
      {credentials && <span>Suas credenciais estão incorretas</span>}
    </Container>
  )
}

export default SignUp
