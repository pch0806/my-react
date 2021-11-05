import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import { darken } from 'polished';

const buttonSizes = {
  large: {
    height: '3.125rem',
    fontSize: '1rem',
    borderRadius: '0.5rem',
  },
  medium: {
    height: '3rem',
    fontSize: '0.875rem',
    borderRadius: '0.25rem',
  },
  small: {
    height: '2.25rem',
    fontSize: '0.875rem',
    borderRadius: '4px',
  },
};

const buttonStyles = css`
  /* 공통 스타일 */
  display: inline-flex;
  justify-content: center;
  align-items: center;
  outline: none;

  /* 색상 */
  ${({ theme, color, fontColor, outline }) => {
    const buttonColor = theme.[color];
    const textColor = theme.[fontColor];
    
    return css`
      border: 0.0625rem solid ${color === "white" ? "#E2E2E2":buttonColor} };
      background: ${buttonColor};
      color: ${textColor};
      &:active {
        background: ${darken(0.1, buttonColor)};
      }
      &:hover {
        box-shadow: 0px 0.125rem 0.3125rem rgba(0, 0, 0, 0.25);
      }

      ${outline &&
      css`
        color: ${buttonColor};
        background: none;
        border: 0.0625rem solid ${buttonColor};
        &:active {
          background: ${darken(0.1, buttonColor)};
          color: white;
        }
        &:hover {
          box-shadow: 0px 0.125rem 0.3125rem rgba(0, 0, 0, 0.25);
        }
      `}
    `;
  }}

  /* 크기 */
  ${({ size }) => css`
    height: ${buttonSizes[size].height};
    font-size: ${buttonSizes[size].fontSize};
    border-radius: ${buttonSizes[size].borderRadius};
  `}
`;

const StyledButton = styled.button`
  ${buttonStyles}
`;

const StyledLink = styled(Link)`
  ${buttonStyles}
`;

const SquaureButton = ({ to, color, fontColor, size, outline, ...rest }) => {
  return to ? (
    <StyledLink to={to} color={color} fontColor={fontColor} size={size} outline={outline} {...rest} />
  ) : (
    <StyledButton color={color} fontColor={fontColor}  size={size} outline={outline} {...rest} />
  );
};

SquaureButton.defaultProps = {
  color: 'black',
  fontColor: 'white',
  size: 'medium',
};

export default SquaureButton;
