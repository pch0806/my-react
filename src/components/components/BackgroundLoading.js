import React from 'react';
import styled from 'styled-components';

import { Player } from '@lottiefiles/react-lottie-player';

import loadingAnimation from '../assets/images/lotties/loading.json';

const BackgroundLoading = ({ className, position, text, bacgroundColor }) => {
  return (
    <Background className={className} position={position} bacgroundColor={bacgroundColor}>
      <Player
        autoplay
        loop
        src={loadingAnimation}
        style={{ height: '12em', width: '12em' }}
      />
      {text && text}
    </Background>
  )
};

const Background = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: ${({ position }) => position ? position : 'fixed'};
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: ${({ bacgroundColor }) => bacgroundColor ? bacgroundColor : 'rgba(0, 0, 0, 0.4)'};
  z-index: 9999;
  font-weight: bold;
  font-size: 1.5625rem;
  color: #000000;
`;

export default BackgroundLoading;
