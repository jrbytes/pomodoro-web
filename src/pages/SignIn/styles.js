import styled from 'styled-components'

export const ContainerSignIn = styled.div`
  margin: auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const Title = styled.div`
  font-size: 2rem;
  color: var(--color-primary);
`

export const Span = styled.span`
  margin-top: 1rem;
  color: var(--color-input-alert);
  text-align: center;
`

export const RegisterLink = styled.div`
  color: var(--color-primary);
  margin-top: 2rem;

  display: flex;
  justify-content: center;

  a {
    text-decoration: none;
    color: var(--color-primary);
    margin-left: 0.6rem;
  }
`
