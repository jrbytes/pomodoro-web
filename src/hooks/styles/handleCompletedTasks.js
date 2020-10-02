import styled from 'styled-components'

export const CompletedTasks = styled.div`
  width: 100%;
  margin-bottom: 0.8rem;

  display: flex;
  align-items: center;

  button {
    margin: 0 auto;
    background-color: var(--color-box-base);
    color: var(--color-text-complement);
    font-size: 1.3rem;
    padding: 0.4rem 0.8rem;
    border: 0px;
    border-radius: var(--border-radius-default);
    cursor: pointer;

    display: flex;
    align-items: center;
  }

  span {
    margin-right: 0.5rem;
  }
`
