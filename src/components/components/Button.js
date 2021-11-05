import React from 'react';
import styled, { css } from 'styled-components';
import { darken } from 'polished';
import { Link } from 'react-router-dom';

const buttonSizes = {
  // large: {
  //   height: '50px',
  //   fontSize: '17px',
  //   borderRadius: '10px',
  // },
  medium: {
    height: '2.25rem',
    fontSize: '1rem',
    borderRadius: '6.25rem',
  },
  small: {
    height: '2.125rem',
    fontSize: '0.875rem',
    borderRadius: '6.25rem',
  },
};

const buttonStyles = css`
  /* 공통 스타일 */
  display: inline-flex;
  justify-content: center;
  align-items: center;
  outline: none;
  color: white;
  min-width: 4.5rem;
  padding : 0 15px;

  /* 색상 */
  ${({ theme, color, outline, fontColor }) => {
    const buttonColor = theme.[color];
    const font = theme.[fontColor];

    return css`
      border: 0.0625rem solid ${buttonColor};
      background: ${buttonColor};

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

      ${fontColor&&
      css`
        color: ${font}; 
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

const Button = ({ to, color, size, outline, ...rest }) => {
  return to ? (
    <StyledLink to={to} color={color} size={size} outline={outline} {...rest} />
  ) : (
    <StyledButton color={color} size={size} outline={outline} {...rest} />
  );
};

Button.defaultProps = {
  color: 'black',
  size: 'medium',
};

export default Button;
