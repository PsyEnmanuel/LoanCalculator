import styled from "styled-components";

export const Title = styled.h1`
  font-size: 2em;
  color: #47a1d6;
  letter-spacing: 0.07em;
  line-height: 1;
`;

export const BodyBox = styled.div`
  position: relative;
  padding-left: 2.5em;
  padding-right: 2.5em;
  max-width: calc(1340px + (2 * 2.5em));
  margin: auto;
  z-index: 3;

  @media (max-width: 769px) {
    padding-left: 1em;
    padding-right: 1em;
  }
`;
export const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1em;
  max-width: 350px;
`;
export const Select = styled.select`
  border: none;
  background-image: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;

  padding: 0.85rem 2rem;
  background-color: #a8f7e7;
  border-radius: 1em;
  width: 100%;
`;
export const ErrorInput = styled.small`
  color: red
`;
export const Input = styled.input`
  border: none;
  background-image: none;
  background-color: transparent;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;

  padding: 0.85rem 2rem;
  background-color: #a8f7e7;
  border-radius: 1em;
  width: 100%;
`;
export const InputIcon = styled.div`
  display: flex;
  align-items: center;
  max-width: 350px;
  input {
    border-radius: 1rem 0 0 1rem;
  }
  svg {
    background: #a8f7e7;
    padding: 0.85rem 1rem;
    border-radius: 0 1rem 1rem 0;
    font-size: 1em;
    box-sizing: initial;
  }
`;

export const Label = styled.label`
  font-size: 1.1em;
  padding-bottom: 0.25em;
  padding-left: 0.6em;
`;

export const Button = styled.button`
  background: #cc922e;
  max-width: 350px;
  padding: 0.75em 2em;
  border-radius: 1em;
  text-transform: uppercase;
  color: white;
  font-weight: 900;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    background: #111;
  }
  &:disabled {
    background: #cccccc !important;
    cursor: not-allowed;
  }
`;
