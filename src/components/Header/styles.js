import styled from 'styled-components'

export const ContainerHeader = styled.header`
  width: 100vw;
  height: 4rem;
  background-color: var(--color-box-base);
  color: var(--color-primary);
  padding: 0 3rem 0 2rem;
  margin-bottom: 3rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    width: 4rem;
    height: 100%;
    background-color: var(--color-box-base);
    border: none;
    cursor: pointer;

    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
  }

  span {
    font-weight: 700;
  }

  span a {
    text-decoration: none;
    color: var(--color-primary);
  }
`
