import styled from 'styled-components'

export const ContainerPomo = styled.div`
  width: 90vw;
  max-width: 700px;

  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const HeaderTaskPomos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    color: var(--color-text-title);
    font-size: 2rem;
    text-align: center;
  }

  span {
    color: var(--color-text-base);

    display: flex;
    align-items: center;
  }

  span .icon-clock {
    margin-right: 0.3rem;
  }
`

export const CountdownBorder = styled.div`
  width: 12rem;
  height: 12rem;
  margin: 3rem 0;

  border: 2px solid var(--color-primary);
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-size: 4rem;
    color: var(--color-text-title);
  }
`

export const ProgressBarBorder = styled.div`
  width: 30rem;
  height: 1.8rem;
  border: 1px solid var(--color-primary);
  border-radius: 1rem;

  display: flex;
  justify-content: center;
  align-items: center;
`

export const ProgressBar = styled.div`
  max-width: 29rem;
  height: 1.2rem;
  border-radius: 1rem;
  background-color: var(--color-secundary);
  transition: width 1s;
`

export const ProgressBarPercent = styled.div`
  font-size: 1.2rem;
  font-weight: 700;

  transition: ease-in-out 1s;
`

export const Button = styled.div`
  width: 11rem;
  height: 4rem;

  border-radius: 2rem;
  border: 0;
  background-color: var(--color-primary);

  color: var(--color-button-text);
  font-size: 1.8rem;
  cursor: pointer;
  margin-bottom: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    background-color: var(--color-primary-dark);
  }

  .icon-button {
    margin-left: -0.4rem;
    margin-right: 0.1rem;
  }
`
