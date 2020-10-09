import React, { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'

import Header from '../../components/Header'

import api from '../../services/api'
import { useAuth } from '../../hooks/auth'

import {
  Container,
  FormPasswords,
  FieldPassword,
  Field,
  UpdateButton,
  SignOutButton,
} from './styles'

function Profile() {
  const [credentials, setCredentials] = useState(false)

  const { user, signOut } = useAuth()

  const nameRef = useRef(null)
  const emailRef = useRef(null)

  const { handleSubmit, register, errors, setError, watch, reset } = useForm()

  const onSubmit = async data => {
    console.log(data)
    try {
      await api.put('profile', data)
      reset()
    } catch (error) {
      setError()
      setCredentials(true)
    }
  }

  return (
    <>
      <Header goBackButton={false} />
      <Container>
        <h2>Perfil</h2>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Field>
            <label htmlFor="name">Nome Completo:</label>
            <input
              type="text"
              name="name"
              defaultValue={user.name}
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
            {errors.email && <span>{errors.email.message}</span>}
          </Field>

          <Field>
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              name="email"
              defaultValue={user.email}
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
          </Field>

          <Field>
            <label htmlFor="old_password">Senha antiga:</label>
            <input
              type="password"
              name="old_password"
              ref={register({
                required: {
                  value: value => (value === 0 ? false : true),
                  message: 'É necessário incluir a senha de autenticação.',
                },
                minLength: {
                  value: 6,
                  message: 'Sua senha deve ter 6 caracteres no mínimo.',
                },
              })}
            />
            {errors.old_password && <span>{errors.old_password.message}</span>}
          </Field>

          <FormPasswords>
            <FieldPassword>
              <label htmlFor="password">Senha atual:</label>
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
              {errors.password && <span>{errors.password.message}</span>}
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

          <UpdateButton>Atualizar</UpdateButton>
          {credentials && <span>Suas credenciais estão incorretas</span>}
        </form>

        <SignOutButton onClick={signOut}>Deslogar</SignOutButton>
      </Container>
    </>
  )
}

export default Profile
