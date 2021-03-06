import styled from 'styled-components'

export const Container = styled.div`
  width: 90vw;
  max-width: 700px;
  margin: 0 auto;

  a {
    text-decoration: none;
    color: inherit;
  }
`

export const Title = styled.h2`
  color: var(--color-text-title);
  margin-bottom: 3rem;

  display: flex;
  align-items: center;
`

export const Task = styled.div`
  width: 90vw;
  max-width: 700px;
  margin-bottom: 0.8rem;
  background-color: var(--color-box-base);
  padding: 1rem 1.4rem;
  border-radius: 0.3rem;
  position: relative;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  animation-name: ${props => props.colorWhenUpdating || ''};
  animation-duration: var(--updated-element-seconds);

  p {
    color: var(--color-text-base);
    padding: 0.4rem 1rem 0.4rem 0.7rem;
  }

  button {
    width: 4rem;
    height: 100%;
    background-color: transparent;
    border: none;
    cursor: pointer;
    position: absolute;
    right: 0;
    top: 0;
    margin-right: 0.5rem;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    svg {
      font-size: 2rem;
    }
  }

  span {
    color: var(--color-text-complement);
  }
`

export const TaskPomos = styled.div`
  display: flex;
  align-items: center;
  margin: 0.2rem 3rem 0 0;

  svg {
    font-size: 2rem;
  }
`
