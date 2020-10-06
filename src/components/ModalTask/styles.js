import styled from 'styled-components'

export const Modal = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);

  transition: visibility 0.2s, opacity 0.2s linear;
  overflow: hidden;

  visibility: ${props => (props.openModal ? 'visible' : 'hidden')};
  opacity: ${props => (props.openModal ? 1 : 0)};

  form {
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;

    input:first-child {
      margin-top: 0;
    }

    input {
      background-color: var(--color-input-background);
      margin-top: 1rem;
      padding: 0.5rem 1rem;
      border: 0;
      outline: 0;
      border-radius: var(--border-radius-default);
    }

    #form-error {
      border-left: 1rem solid var(--color-input-alert);
    }

    span {
      color: var(--color-input-alert);
      margin: 0.5rem 0;
    }
  }
`

export const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 15% auto;
  border-radius: var(--border-radius-default);
  padding: 2rem;
  border: 1px solid #888;
  width: 80%;
`

export const ModalTitleClose = styled.div`
  font-size: 1.9rem;
  font-weight: 700;

  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  flex-direction: center;

  span {
    color: #aaa;
    font-size: 28px;
    font-weight: bold;

    :hover,
    :focus {
      color: black;
      text-decoration: none;
      cursor: pointer;
    }
  }
`

export const ModalContentTextQuestion = styled.div`
  p {
    margin-top: 1.7rem;
    text-align: center;
  }

  p:last-child {
    margin: 0;
    font-size: 1.4rem;
    font-family: monospace;
    text-align: center;
  }
`

export const FormButtonsModalQuestion = styled.div`
  margin-top: 1.7rem;

  display: flex;
  align-items: center;
  justify-content: center;

  button {
    width: 6rem;
    margin-left: 1rem;
    background-color: var(--color-input-alert);
    color: var(--color-title-in-primary);
    border: none;
    border-radius: var(--border-radius-default);
    cursor: pointer;
    padding: 0.5rem 1rem;
    font-size: 1.6rem;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  button:last-child {
    background-color: var(--color-primary);
  }
`
