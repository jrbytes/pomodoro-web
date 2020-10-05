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
`

export const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 15% auto;
  border-radius: var(--border-radius-default);
  padding: 2rem;
  border: 1px solid #888;
  width: 80%;

  form {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
  }

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

  select {
    background-color: var(--color-input-background);
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    border: 0;
    outline: 0;
    border-radius: var(--border-radius-default);
  }

  span {
    color: var(--color-input-alert);
    margin: 0.5rem 0;
  }
`

export const ModalTitleClose = styled.div`
  font-size: 1.9rem;
  font-weight: 700;

  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  flex-direction: center;

  span {
    margin: 0;
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
