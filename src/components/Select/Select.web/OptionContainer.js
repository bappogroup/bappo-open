// @flow

import * as React from 'react';
import styled from 'styled-components';
import type { Option as OptionType } from '../types.js.flow';

type Props = {
  children?: React.Node,
  innerRef?: ?(ref: ?HTMLDivElement) => void,
  isDisabled?: ?boolean,
  isFocused?: ?boolean,
  isSelected?: ?boolean,
  onFocus: (option: OptionType, event: SyntheticEvent<>) => void,
  onSelect: (option: OptionType, event: SyntheticEvent<>) => void,
  option: OptionType,
};

const blockEvent = (event: SyntheticEvent<>) => {
  event.preventDefault();
  event.stopPropagation();
};

class Option extends React.Component<Props> {
  props: Props;

  render() {
    const {
      children,
      innerRef,
      isDisabled,
      isFocused,
      isSelected,
    } = this.props;

    return isDisabled ? (
      <Container
        isDisabled={isDisabled}
        onMouseDown={blockEvent}
        onClick={blockEvent}
      >
        {children}
      </Container>
    ) : (
      <Container
        innerRef={innerRef}
        isFocused={isFocused}
        isSelected={isSelected}
        onClick={this._onClick}
        onMouseEnter={this._onMouseEnter}
        onMouseMove={this._onMouseMove}
        onTouchEnd={this._onTouchEnd}
        onTouchStart={this._onTouchStart}
        onTouchMove={this._onTouchMove}
        role="option"
      >
        {children}
      </Container>
    );
  }

  _dragging: ?boolean;

  _onClick = (event: SyntheticEvent<>) => {
    event.preventDefault();
    event.stopPropagation();

    const { onSelect, option } = this.props;
    onSelect(option, event);
  };

  _onFocus = (event: SyntheticEvent<>) => {
    const { isFocused, onFocus, option } = this.props;
    if (!isFocused) {
      onFocus(option, event);
    }
  };

  _onMouseEnter = (event: SyntheticMouseEvent<>) => {
    this._onFocus(event);
  };

  _onMouseMove = (event: SyntheticMouseEvent<>) => {
    this._onFocus(event);
  };

  _onTouchEnd = (event: SyntheticTouchEvent<>) => {
    // Check if the view is being dragged, In this case
    // we don't want to fire the click event (because the user only wants to scroll)
    if (this._dragging) return;

    this._onClick(event);
  };

  _onTouchMove = () => {
    // Set a flag that the view is being dragged
    this._dragging = true;
  };

  _onTouchStart = () => {
    // Set a flag that the view is not being dragged
    this._dragging = false;
  };
}

export default Option;

const Container = styled.div`
  box-sizing: border-box;
  background-color: #fff;
  color: #666;
  cursor: pointer;
  display: block;
  padding: 8px 10px;

  &:last-child {
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  ${props => props.isSelected && `
    background-color: #f5faff;
    color: #333;
  `}

  ${props => props.isFocused && `
    background-color: #ebf5ff;
    color: #333;
  `}

  ${props => props.isDisabled && `
    color: #ccc;
    cursor: default;
  `}
`;
