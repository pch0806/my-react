import React, { useCallback, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

import { ReactComponent as DownArrowIcon } from '../assets/images/common/icon-chevron-down.svg';
import { ReactComponent as UpArrowIcon } from '../assets/images/common/icon-chevron-up.svg';

import ClickOutside from '../components/ClickOutside';

const SelectInput = ({
  defaultTitle = '',
  selectedValue,
  optionList,
  size,
  onSelectChange,
  disabled,
  isValidate,
  className,
  up,
  displayOptionCnt
}) => {
  const [isShow, setIsShow] = useState(false);

  const ContainerRef = useRef(null);

  const closeSelectInput = useCallback(() => {
    if (isShow) {
      setIsShow(false);
    }
  }, [isShow]);

  const getSelectedTitle = useCallback(value => {
    const findItem = optionList?.find(option =>
      option.value === value ? option : false,
    );
    return findItem ? findItem.title : defaultTitle;
  }, [optionList, defaultTitle]);

  const handleChangeOption = useCallback(option => {
    onSelectChange(option.value);
    setIsShow(false);
  }, [onSelectChange]);

  return (
    <ClickOutside onClickOutside={closeSelectInput}>
      <Container
        ref={ContainerRef}
        size={size}
        className={className}
        isValidate={isValidate}
        disabled={disabled}
        isShow={isShow}
      >
        <SelectBtn onClick={() => setIsShow(!isShow)}>
          <SelectTitle isSelect={selectedValue ? true : false} disabled={disabled}>
            {getSelectedTitle(selectedValue)}
          </SelectTitle>
          {isShow ? <UpArrowIcon /> : <DownArrowIcon />}
        </SelectBtn>
        <OptionWrapper
          style={isShow ? { display: 'block' } : { display: 'none' }}
          height={ContainerRef.current?.offsetHeight}
          up={up}
          displayOptionCnt={displayOptionCnt}
        >
          <OptionList>
            {optionList?.map((option, index) => (
              <OptionItem
                key={`option-${index}`}
                onClick={() => onSelectChange && handleChangeOption(option)}
                className={selectedValue === option.value && 'active'}
                height={ContainerRef.current?.offsetHeight}
                index={index}
              >
                <span>
                  {option.title}
                </span>
              </OptionItem>
            ))}
          </OptionList>
        </OptionWrapper>
      </Container>
    </ClickOutside>
  );
};

const Container = styled.div`
  flex: 1;
  position: relative;
  box-sizing: border-box;
  border-radius: ${({ isShow }) => isShow ? '0.3125rem 0.3125rem 0 0' : '0.3125rem'};
  border: 0.0625rem solid
    ${({ isValidate }) => 
      isValidate === undefined || isValidate ? '#CCCCCC' : '#F05B5B'};
  background: ${({ disabled, theme }) => disabled ? theme.disabled : '#FFFFFF'};
  width: 200px;
  height: 2.375rem;

  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
    `}
`;

const SelectBtn = styled.button`
  width: 100%;
  height: inherit;
  position: relative;
  display: flex;
  align-items: center;
  min-width: 0;
  background: transparent;

  padding: 0 10px 0 15px;
  outline: 0;
  & > svg {
    margin-left: auto;
  }
`;

const SelectTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: inherit;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  font-weight: 500;
  font-size: 0.8125rem;
  color: ${({ isSelect, disabled, theme }) => disabled ? theme.gray700 : isSelect ? '#111111' : '#999999'} ;
`;

const OptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden overlay;
  position: absolute;
  left: -1px;
  top: ${({ height }) => (height ? height - 2 : 36)}px;
  background: #ffffff;
  width: inherit;
  max-height: ${({ height, displayOptionCnt }) => (height ? height * displayOptionCnt + 2 : 192)}px;
  border-radius: 0 0 5px 5px;
  border: 1px solid #CFCFCF;
  z-index: 1;

  ${({ up }) => up && css`
    top: ${({ height }) => (height ? -(height * 5 + 2 - height): -154)}px;
    border-radius: 5px 5px 0 0;
  `}

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #cccccc;
    border-radius: 2.5px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #aaaaaa;
  }
`;

const OptionList = styled.ul`
  display: flex;
  flex-direction: column;
`;

const OptionItem = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-width: 0;
  height: ${({ height }) => (height ? height : 38)}px;
  padding: 0 10px 0 15px;
  font-size: 0.8125rem;
  cursor: pointer;

  & > span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &:not(:first-child) {
    border-top: 0.0625rem solid #EEEEEE;
  }

  &:hover {
    background: #F9F9F9;
    color: #333333;
  }

  background: #FFFFFF;
  color: #555555;

  &.active {
    color: #2A91DF;
    background: #F1F9FF;
  }
`;

SelectInput.defaultProps = {
  displayOptionCnt: 10
};

export default React.memo(SelectInput);
