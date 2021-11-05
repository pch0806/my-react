import React from 'react';
import styled from 'styled-components';

import { Player } from '@lottiefiles/react-lottie-player';
import loadingAnimation from '../assets/images/lotties/loading.json';

const Loading = ({ className, position, text, bacgroundColor }) => {
  return (
    <Background className={className} position={position} bacgroundColor={bacgroundColor}>
      {text && text}
      <Player
        autoplay
        loop
        src={loadingAnimation}
        style={{ height: '12em', width: '12em' }}
      />
    </Background>
  )
};

const Background = styled.div`
  position: ${({ position }) => position ? position : 'relative'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: ${({ bacgroundColor }) => bacgroundColor ? bacgroundColor : 'inherit'};
  font-weight: bold;
  font-size: 1.5625rem;
  color: #000000;
`;

export default Loading;
