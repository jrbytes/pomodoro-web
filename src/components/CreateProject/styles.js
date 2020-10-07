import styled from 'styled-components'

export const CreateProjectCSS = styled.div`
  width: 90vw;
  max-width: 700px;
  margin-bottom: 0.8rem;
  background-color: var(--color-box-base);
  padding: 1rem 1.4rem;
  border-radius: 0.3rem;
  position: relative;

  display: flex;
  flex-direction: row;
  align-items: center;

  svg {
    margin-left: 1rem;
    position: absolute;
    color: var(--color-primary);
    font-size: 2rem;
  }

  svg:last-child {
    margin-left: 0;
    font-size: 2.2rem;
  }

  form {
    width: 100%;
    margin-right: 2.8rem;

    input {
      width: 100%;
      padding: 0.4rem 1rem 0.4rem 3.2rem;
      outline: 0;
      border: 2px solid var(--color-line-in-white);
      border-radius: var(--border-radius-default);
    }

    input:focus {
      border: 2px solid var(--color-primary-lighter);
      border-radius: var(--border-radius-default);
    }
  }

  button {
    width: 3.7rem;
    height: 100%;
    background-color: transparent;
    border: none;
    cursor: pointer;
    position: absolute;
    right: 0;
    top: 0;
    margin-right: 0.5rem;
    margin-left: 1rem;
    color: var(--color-primary);

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    :hover {
      color: var(--color-primary-darker);
    }
  }
`
