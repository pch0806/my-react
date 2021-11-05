import React, { useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Button from './Button';

import { ReactComponent as CloseIcon } from '../assets/images/common/icon-close.svg';

const Modal = ({
  title,
  children,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  onClose,
  confirmColor,
  cancelColor,
  visible,
  overflow,
  showXButton,
  modalRef,
}) => {
  const [firstRendering, setFirstRendering] = useState(true);

  useEffect(() => {
    if (visible) {
      setFirstRendering(firstRendering => firstRendering && false );
    }
  }, [visible]);

  return (
    <DarkBackground
      firstRendering={firstRendering}
      disappear={!visible}
      onClick={e => {
        if (visible && onClose) {
          e.preventDefault();
          onClose(e);
        } else {
          return undefined;
        }
      }}
    >
      <ModalContainer ref={modalRef} disappear={!visible} overflow={overflow} onClick={e => e.stopPropagation()}>
        {(title || showXButton) && (
          <div className="modal-header">
            <span className="modal-title">{title}</span>
            {showXButton && (
              <button className="modal-close-btn" onClick={e => onClose(e)}>
                <CloseIcon />
              </button>
            )}
          </div>
        )}
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          <ButtonGroup>
            {onCancel && (
              <Button
                className="modal-cancel-button"
                color={cancelColor}
                outline
                onClick={onCancel}
              >
                {cancelText}
              </Button>
            )}
            {onConfirm && (
              <Button
                className="modal-confirm-button"
                color={confirmColor}
                onClick={onConfirm}
              >
                {confirmText}
              </Button>
            )}
          </ButtonGroup>
        </div>
      </ModalContainer>
    </DarkBackground>
  );
};

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; z-index: 9999; visibility: visible; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; z-index: -1; visibility: hidden;}
`;

const slideUp = keyframes`
  from { transform: translateY(12.5rem); }
  to { transform: translateY(0); }
`;

const slideDown = keyframes`
  from { transform: translateY(0); }
  to { transform: translateY(12.5rem); }
`;

const DarkBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 0 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  ${({ firstRendering }) => firstRendering ? css`
    opacity: 0;
    z-index: -1;
    visibility: hidden;
  ` : css`
    animation-duration: 0.25s;
    animation-timing-function: ease-out;
    animation-name: ${fadeIn};
    animation-fill-mode: forwards;

    ${props =>
      props.disappear &&
      css`
        animation-name: ${fadeOut};
      `}
    `}
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 0.625rem;
  color: #333333;
  padding: 1.25rem 0 0;
  overflow-y: ${props => props.overflow ? 'overlay':'none'};
  
  .modal-header {
    display: flex;
    align-items: center;
    width: 100%;
  }

  .modal-title {
    text-align: center;
    font-size: 1.125rem;
    color: #000000;
  }

  .modal-close-btn {
    margin-left: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    background: none;
  }

  .modal-body {
    font-size: 0.875rem;
    color: #646464;
  }

  .modal-footer {
    border-top: 1px solid #E2E2E2;
    padding: 0.625rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${slideUp};
  animation-fill-mode: forwards;

  ${props =>
    props.disappear &&
    css`
      animation-name: ${slideDown};
    `}
`;

const ButtonGroup = styled.div`
  display: flex;
  .modal-cancel-button {
  }
  .modal-confirm-button {
    margin-left: 0.625rem;
  }
`;

Modal.defaultProps = {
  confirmText: '확인',
  cancelText: '취소',
  confirmColor: 'black',
  cancelColor: 'black',
};

export default Modal;
