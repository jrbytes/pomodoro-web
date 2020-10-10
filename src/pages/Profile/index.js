import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import Header from '../../components/Header'

import api from '../../services/api'
import { useAuth } from '../../hooks/auth'

import { Container, Field, UpdateButton, UpdatedMessage } from './styles'

function Profile() {
  const { user, updateUser } = useAuth()

  const [updated, setUpdated] = useState(false)

  const { handleSubmit, register, errors, setError } = useForm()

  const onSubmit = async data => {
    try {
      const response = await api.put('profile', data)
      updateUser(response.data)
      setUpdated(true)
    } catch (error) {
      setError()
    }
  }

  return (
    <>
      <Header goBackButton={true} />
      <Container>
        <h2>Perfil</h2>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Field>
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              name="name"
              defaultValue={user.name}
              ref={register({
                required: {
                  value: true,
                  message: 'É necessário incluir um nome.',
                },
              })}
            />
            {errors.name && <span>{errors.name.message}</span>}
          </Field>

          <Field>
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              name="email"
              defaultValue={user.email}
              ref={register({
                required: {
                  value: true,
                  message: 'É necessário incluir um e-mail.',
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Inclua um e-mail válido.',
                },
              })}
            />
            {errors.email && <span>{errors.email.message}</span>}
          </Field>

          <Field>
            <label htmlFor="default_minute">Tempo do pomo:</label>
            <input
              type="text"
              name="default_minute"
              defaultValue={user.default_minute}
              ref={register({
                required: {
                  value: true,
                  message: 'É necessário incluir o tempo padrão do pomodoro.',
                },
              })}
            />
            {errors.default_minute && (
              <span>{errors.default_minute.message}</span>
            )}
          </Field>

          <Field>
            <label htmlFor="setting_progress_bar">
              Ver % da barra de progresso:
            </label>
            <input
              type="text"
              name="setting_progress_bar"
              defaultValue={user.setting_progress_bar}
              ref={register({
                required: {
                  value: true,
                  message: 'É necessário definir deseja ver ou não.',
                },
              })}
            />
            {errors.setting_progress_bar && (
              <span>{errors.setting_progress_bar.message}</span>
            )}
          </Field>

          <Field>
            <label htmlFor="theme">Tema:</label>
            <input
              type="text"
              name="theme"
              defaultValue={user.theme}
              ref={register({
                required: {
                  value: true,
                  message: 'É necessário escolher um tema.',
                },
              })}
            />
            {errors.theme && <span>{errors.theme.message}</span>}
          </Field>

          <UpdateButton>Atualizar</UpdateButton>
        </form>

        <UpdatedMessage updated={updated}>
          Dados atualizados com sucesso!
        </UpdatedMessage>
      </Container>
    </>
  )
}

export default Profile
