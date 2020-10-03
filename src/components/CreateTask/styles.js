import styled from 'styled-components'

export const CreateTaskCSS = styled.div`
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

  form {
    width: 100%;
    margin-right: 2.8rem;

    input {
      width: 100%;
      padding-left: 2.3rem;
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
  }

  #form-error-placeholder {
    border: 2px solid var(--color-input-alert);
    border-radius: var(--border-radius-default);
  }

  .icon-create-task {
    position: absolute;
  }
`
