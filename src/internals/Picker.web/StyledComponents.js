// @flow

import styled from 'styled-components';
import ViewBase from '../web/ViewBase';

export const Arrow = styled.span`
  border-color: #999 transparent transparent;
  border-style: solid;
  border-width: 5px 5px 2.5px;
  height: 0;
  width: 0;
  position: relative;

  ${props =>
    props.isOpen &&
    `
    top: -2px;
    border-color: transparent transparent #999;
    border-width: 0 5px 5px;
  `};
`;

export const ArrowZone = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding-top: 2px;
  position: relative;
  width: 25px;

  &:hover {
    ${Arrow} {
      border-top-color: #666;
    }
  }

  ${props =>
    props.isDisabled &&
    `
    cursor: default;
    pointer-events: none;
    opacity: 0.35;
  `};
`;

export const Clear = styled.span`
  font-size: 1.15em;
  line-height: 1;
`;

export const ClearZone = styled.div`
  align-items: center;
  color: #999;
  cursor: pointer;
  display: flex;
  justify-content: center;
  position: relative;
  width: 17px;

  &:hover {
    color: #c3c3c3;
  }
`;

export const Container = styled(ViewBase)`
  font-size: 14px;
`;

export const Control = styled.div`
  align-items: center;
  cursor: default;
  display: flex;
  overflow: hidden;
  position: relative;
  width: 100%;
`;

export const FakeInput = styled.div`
  min-height: 16px;
  width: 0;
  &:focus {
    outline: none;
  }
`;

export const PopoverContainer = styled(ViewBase)`
  background-color: #fff;
  border: 1px solid #ccc;
  border-top-color: #e6e6e6;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);
  margin-top: -1px;
  position: absolute;
  top: 100%;
  z-index: 1;
  -webkit-overflow-scrolling: touch;
`;

export const ValueContainer = styled(ViewBase)`
  flex: 1;
`;
