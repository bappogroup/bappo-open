// @flow

import * as React from 'react';

import { styled } from '../../../apis/Style';
// $FlowFixMe typescript
import { DivViewBase } from '../../../internals/web/ViewBase';
import type { Option } from '../types.js.flow';

type Props = {
  children?: React.Node,
  innerRef?: ?(ref: ?HTMLDivElement) => void,
  isDisabled?: ?boolean,
  isFocused?: ?boolean,
  isSelected?: ?boolean,
  onFocus: (option: Option, event: SyntheticEvent<>) => void,
  onSelect: (option: Option, event: SyntheticEvent<>) => void,
  option: Option,
};

const blockEvent = (event: SyntheticEvent<>) => {
  event.preventDefault();
  event.stopPropagation();
};

class OptionContainer extends React.Component<Props> {
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
        $isSelected={isSelected}
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

export default OptionContainer;

const Container = styled(DivViewBase)`
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
