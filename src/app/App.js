import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Reset } from 'styled-reset';
import { injectStyle } from 'react-toastify/dist/inject-style';

import Routes from './Route';

const theme = {
  white: '#FFFFFF',
  black: '#000000',
  gray50: '#F6F6F6',
  gray75: '#F5F5F5',
  gray100: '#F3F3F3',
  gray200: '#EEEEEE',
  gray250: '#EBEBEB',
  gray300: '#DDDDDD',
  gray400: '#C8C8C8',
  gray500: '#CCCCCC',
  gray600: '#999999',
  gray700: '#666666',
  gray800: '#333333',
  gray900: '#111111',
  red200: '#FF0000',
  red100: '#FF3317',
  red50: '#FF5A5A',
  pink50: '#FF5689',
  orange50: '#F87904',
  green50: '#22EC42',
  green100: '#51D285',
  blue100: '#00A3FF',
};

const GlobalStyle = createGlobalStyle`
  html {
    width: 100%;
    height: 100%;
    font-size: 16px;
  }

  body {
    width: 100%;
    height: 100%;
    font-family: 'Spoqa Han Sans Neo', sans-serif !important;
    font-weight: 400;
    box-sizing: border-box;

    #root {
      width: 100%;
      height: 100%;
    }
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    cursor: pointer;
    border: none;

    &:focus {
      outline: none;
    }
  }

  input {
    &:focus {
      outline: none;
    }
  }

  button, input, textarea {
    font: inherit;
  }

  * {
    box-sizing: inherit;
  }

  *:not(input, textarea) {
    /* 드래그 방지 css */
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
  }

  /* 포커스 시 placeholder 숨기기 in <input>, <textarea> */
  input:focus::-webkit-input-placeholder,
  textarea:focus::-webkit-input-placeholder { /* WebKit browsers */
    color: transparent;
  } 
  input:focus:-moz-placeholder,
  textarea:focus:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color:transparent;
  }
  input:focus::-moz-placeholder,
  textarea:focus::-moz-placeholder { /* Mozilla Firefox 19+ */
    color:transparent;
  }
  input:focus:-ms-input-placeholder,
  textarea:focus:-ms-input-placeholder { /* Internet Explorer 10+ */
    color:transparent;
  }
`;

const App = () => {
  injectStyle();

  return (
    <ThemeProvider theme={theme}>
      <Reset />
      <GlobalStyle />
      <Routes />
    </ThemeProvider>
  );
};

export default App;
