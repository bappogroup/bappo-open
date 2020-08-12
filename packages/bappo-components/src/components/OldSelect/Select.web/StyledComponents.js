// @flow

import styled, { css, keyframes } from 'styled-components';

import Text from '../../../primitives/Text';
import TextInputAutoSize from './TextInputAutoSize';

const spin = keyframes`
to {
  transform: rotate(1turn);
}
`;
const spinRule = css`
  ${spin} 400ms infinite linear;
`;
export const Arrow = styled.span`
  border-color: #999 transparent transparent;
  border-style: solid;
  border-width: 5px 5px 2.5px;
  display: inline-block;
  height: 0;
  width: 0;
  position: relative;

  ${(props) =>
    props.$isOpen &&
    `
    top: -2px;
    border-color: transparent transparent #999;
    border-width: 0 5px 5px;
  `};
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

  ${(props) =>
    props.isDisabled &&
    `
    cursor: default;
    pointer-events: none;
    opacity: 0.35;
  `};
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
    color: #d0021b;
  }
`;

export const Container = styled.div`
  font-size: 14px;
  position: relative;
`;

export const Control = styled.div`
  cursor: default;
  display: table;
  height: 100%;
  outline: none;
  overflow: hidden;
  position: relative;
  width: 100%;

  &:focus {
    outline: none;
  }

  ${({ isOpen }) =>
    isOpen &&
    `
    background: #fff;
  `} ${({ isFocused, isOpen, isSearchable }) =>
    isSearchable &&
    (isOpen || isFocused) &&
    `
    cursor: text;
  `};
`;

const inputStyle = css`
  height: 100%;
  padding-right: 10px;
  &:focus {
    outline: none;
  }
`;

export const FakeInput = styled.div`
  ${inputStyle} border: 0;
  width: 1px;
  display: inline-block;
`;

export const Input = styled(TextInputAutoSize)`
  input {
    min-height: 26px;
    width: 100%;
    cursor: ${({ isFocused }) => (isFocused ? 'text' : 'default')};
    font-size: inherit;
    ${({ hasValue, isPseudoFocused }) =>
      hasValue &&
      isPseudoFocused &&
      `
      opacity: 0;
    `};
  }
  ${inputStyle};
`;

export const Loading = styled.span`
  animation: ${spinRule};
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
  background-color: #fff;
  border: 1px solid #ccc;
  box-sizing: border-box;
  margin-top: -1px;
  max-height: 200px;
  position: absolute;
  top: 100%;
  width: 100%;
  z-index: 1;
  -webkit-overflow-scrolling: touch;
`;

export const MultiValueWrapperOuter = styled.div`
  height: 100%;
`;

export const ValueWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const MultiValueWrapper = styled(ValueWrapper)`
  flex-wrap: wrap;
  padding: 6px 0;
`;

export const NoResults = styled(Text)`
  color: #999;
  cursor: default;
  display: block;
  padding: 8px 10px;
`;

export const Placeholder = styled(Text)`
  bottom: 0;
  color: #aaa;
  height: 100%;
  left: 0;
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
