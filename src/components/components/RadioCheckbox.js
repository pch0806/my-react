import React from 'react';
import styled from 'styled-components';

import { ReactComponent as CheckIcon } from '../assets/images/common/icon-check.svg';

const RadioCheckbox = ({ width, checked, onChange, disabled, id, name }) => {
  return (
    <Container width={width} checked={checked} disabled={disabled}>
      <input id={id} name={name} type="checkbox" checked={checked} onChange={e => onChange(e)} />
      <CheckIcon />
    </Container>
  );
};

const Container = styled.label`
  position: relative;
  min-width: ${({ width }) => width / 16}rem;
  max-width: ${({ width }) => width / 16}rem;
  height: ${({ width }) => width / 16}rem;
  background: ${({ checked, disabled }) => (checked ? (disabled ? '#767676' : '#000000') : '#FFFFFF')};
  border: 0.125rem solid ${({ checked, disabled }) => (checked ? (disabled ? '#767676' : '#000000') : '#D1D1D1')};
  & path {
    stroke: ${({ checked, disabled }) => (checked ? (disabled ? '#767676' : '#FFFFFF') : '#D1D1D1')};
  }
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.0625rem;
  overflow: hidden;

  & > input {
    position: absolute;
    visibility: hidden;
    padding: 0;
    margin: 0;
  }

  transition: background-color 0.15s ease-in-out, background-position 0.15s ease-in-out, border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'all')};
`;

RadioCheckbox.defaultProps = {
  width: 20,
  checked: false,
  onChange: () => {},
  disabled: false,
};

export default React.memo(RadioCheckbox);
