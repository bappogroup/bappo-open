import React from 'react';

import { styled } from '../../../apis/Style';
import { DivViewBase } from '../../../internals/web/ViewBase';
import { Option } from '../types';

type Props = {
  children?: React.ReactNode;
  index: number;
  innerRef?: (ref: HTMLDivElement) => void;
  isDisabled?: boolean;
  isFocused?: boolean;
  isSelected?: boolean;
  onFocus?: (
    option: Option,
    event: React.SyntheticEvent<HTMLDivElement>,
    index: number,
  ) => void;
  onSelect: (
    option: Option,
    event: React.SyntheticEvent<HTMLDivElement>,
    index: number,
  ) => void;
  option: Option;
};

const blockEvent = (event: React.SyntheticEvent) => {
  event.preventDefault();
  event.stopPropagation();
};

class OptionContainer extends React.Component<Props> {
  render() {
    const { children, innerRef, isDisabled, isFocused } = this.props;

    return isDisabled ? (
      <Container
        $isDisabled={isDisabled}
        onMouseDown={blockEvent}
        onClick={blockEvent}
      >
        {children}
      </Container>
    ) : (
      <Container
        ref={innerRef}
        $isFocused={isFocused}
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

  _dragging: boolean;

  _onClick = (event: React.SyntheticEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const { index, onSelect, option } = this.props;
    onSelect(option, event, index);
  };

  _onFocus = (event: React.MouseEvent<HTMLDivElement>) => {
    const { index, isFocused, onFocus, option } = this.props;
    if (!isFocused && onFocus) {
      onFocus(option, event, index);
    }
  };

  _onMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    this._onFocus(event);
  };

  _onMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    this._onFocus(event);
  };

  _onTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
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

export default OptionContainer;

const Container = styled(DivViewBase)<{
  $isDisabled?: boolean;
  $isFocused?: boolean;
}>`
  background-color: #fff;
  cursor: pointer;

  ${(props) =>
    props.$isFocused &&
    `
    background-color: #f9f9f9;
  `} ${(props) =>
    props.$isDisabled &&
    `
    color: #ccc;
    cursor: default;
  `};
`;
