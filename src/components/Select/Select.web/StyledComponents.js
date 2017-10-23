// @flow

import styled, { css, keyframes } from 'styled-components';
import TextInputAutoSize from './TextInputAutoSize';

const spin = keyframes`
to {
  transform: rotate(1turn);
}
`;

export const Arrow = styled.span`
  border-color: #999 transparent transparent;
  border-style: solid;
  border-width: 5px 5px 2.5px;
  display: inline-block;
  height: 0;
  width: 0;
  position: relative;

  ${props => props.isOpen && `
    top: -2px;
    border-color: transparent transparent #999;
    border-width: 0 5px 5px;
  `}
`;

export const ArrowZone = styled.span`
  cursor: pointer;
  display: table-cell;
  position: relative;
  text-align: center;
  vertical-align: middle;
  width: 25px;

  &:hover {
    ${Arrow} {
      border-top-color: #666;
    }
  }

  ${props => props.isDisabled && `
    cursor: default;
    pointer-events: none;
    opacity: 0.35;
  `}
`;

export const Clear = styled.span`
  display: inline-block;
  font-size: 1.15em;
  line-height: 1;
`;

export const ClearZone = styled.span`
  color: #999;
  cursor: pointer;
  display: table-cell;
  position: relative;
  text-align: center;
  vertical-align: middle;
  width: 17px;

  &:hover {
    color: #D0021B;
  }
`;

export const Container = styled.div`
  font-size: 14px;
  position: relative;
`;

export const Control = styled.div`
  cursor: default;
  display: table;
  outline: none;
  overflow: hidden;
  position: relative;
  width: 100%;

  &:focus {
    outline: none;
  }

  ${props => props.isDisabled && `
    background-color: #f9f9f9;
  `}

  ${({ isOpen }) => isOpen && `
    background: #fff;
  `}

  ${({ isFocused, isOpen, isSearchable }) => isSearchable && (isOpen || isFocused) && `
    cursor: text;
  `}
`;

const inputStyle = css`
  margin-left: 5px;
  padding-right: 10px;
  vertical-align: middle;
  &:focus {
    outline: none;
  }
`;

export const FakeInput = styled.div`
  ${inputStyle}
  border: 0;
  width: 1px;
  display: inline-block;
`;

export const Input = styled(TextInputAutoSize)`
  input {
    width: 100%;
    background: none transparent;
    border: 0 none;
    box-shadow: none;
    cursor: ${({ isFocused }) => (isFocused ? 'text' : 'default')};
    display: inline-block;
    font-family: inherit;
    font-size: inherit;
    margin: 0;
    outline: none;
    padding: 0;
    appearance: none;
    ${({ hasValue, isPseudoFocused }) => hasValue && isPseudoFocused && `
      opacity: 0;
    `}
  }
  ${inputStyle}
`;

export const Loading = styled.span`
  animation: ${spin} 400ms infinite linear;
  width: 16px;
  height: 16px;
  box-sizing: border-box;
  border-radius: 50%;
  border: 2px solid #ccc;
  border-right-color: #333;
  display: inline-block;
  position: relative;
  vertical-align: middle;
`;

export const LoadingZone = styled.span`
  cursor: pointer;
  display: table-cell;
  position: relative;
  text-align: center;
  vertical-align: middle;
  width: 16px;
`;

export const MenuInner = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 198px;
`;

export const MenuOuter = styled.div`
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-top-color: #e6e6e6;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
  margin-top: -1px;
  max-height: 200px;
  position: absolute;
  top: 100%;
  width: 100%;
  z-index: 1;
  -webkit-overflow-scrolling: touch;
`;

export const MultiValueWrapper = styled.div`
  ${props => props.isMulti && `
    display: inline-block;
  `}
`;

export const NoResults = styled.div`
  color: #999;
  cursor: default;
  display: block;
  padding: 8px 10px;
`;

export const Placeholder = styled.div`
  bottom: 0;
  color: #aaa;
  left: 0;
  padding-left: 5px;
  padding-right: 10px;
  position: absolute;
  right: 0;
  top: 0;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: flex;
  align-items: center;
`;
