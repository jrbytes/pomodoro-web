import styled from 'styled-components'

export const Container = styled.div`
  width: 90vw;
  max-width: 700px;
  margin: 0 auto;

  h2 {
    margin-top: 3rem;
    text-align: center;
    color: var(--color-primary);
  }

  form {
    width: 100%;
    margin-right: 2.8rem;

    input {
      width: 100%;
      padding: 0.4rem 1rem 0.4rem 1rem;
      outline: 0;
      border: 2px solid var(--color-line-in-white);
      border-radius: var(--border-radius-default);
    }

    input:focus {
      border: 2px solid var(--color-primary-lighter);
      border-radius: var(--border-radius-default);
    }

    label {
      margin-top: 1.3rem;
      margin-bottom: 0.5rem;
    }

    span {
      margin: 0.4rem 0 0 0;
      font-size: 1.3rem;
      color: var(--color-input-alert);
    }
  }
`

export const Field = styled.div`
  display: flex;
  flex-direction: column;
`

export const FormPasswords = styled.div`
  display: flex;
  justify-content: space-between;

  div:first-child {
    margin-right: 0.8rem;
  }

  div:last-child {
    margin-left: 0.8rem;
  }

  /* @media (max-width: 700px) {
    flex-direction: column;

    div:last-child {
      margin-left: 0;
    }
  } */
`

export const FieldPassword = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

export const UpdateButton = styled.button`
  width: 20vw;

  margin-top: 2.5rem;
  padding: 0.5rem 1rem;
  background-color: var(--color-primary);
  border: none;
  border-radius: var(--border-radius-default);
  color: var(--color-title-in-primary);
  cursor: pointer;
`

export const SignOutButton = styled.button`
  margin-top: 3rem;
  padding: 0.5rem 1rem;
  background-color: var(--color-secundary);
  border: none;
  border-radius: var(--border-radius-default);
  color: var(--color-title);
  cursor: pointer;
`
