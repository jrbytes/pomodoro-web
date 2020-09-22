import styled from 'styled-components'

export const Container = styled.div`
  width: 90vw;
  max-width: 700px;
  margin: 0 auto;

  h2 {
    margin-top: 3.8rem;
    text-align: center;
  }

  form label {
    margin-top: 1.3rem;
    margin-bottom: 0.5rem;
  }

  form input {
    margin-top: 0;
  }
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

  @media (max-width: 700px) {
    flex-direction: column;
  }
`

export const FieldPassword = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`
