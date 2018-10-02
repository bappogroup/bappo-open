// @flow

import * as React from 'react';
import styled from 'styled-components';
import type { Option } from '../types.js.flow';

type Props = {
  hasValue?: ?boolean,
  isDisabled?: ?boolean,
  isMulti?: ?boolean,
  labelKey: string,
  onRemove?: (option: Option) => void,
  option: Option,
};

class SelectedOption extends React.Component<Props> {
  render() {
    const { labelKey, onRemove, option, ...props } = this.props;
    return (
      <Container {...props}>
        {this._renderRemoveIcon()}
        {this._renderLabel()}
      </Container>
    );
  }

  _dragging: ?boolean;

  _onRemoveButtonClick = (event: SyntheticEvent<>) => {
    event.preventDefault();
    event.stopPropagation();

    const { onRemove, option } = this.props;
    onRemove && onRemove(option);
  };

  _onRemoveButtonTouchEnd = (event: SyntheticTouchEvent<>) => {
    // Check if the view is being dragged, In this case
    // we don't want to fire the click event (because the user only wants to scroll)
    if (this._dragging) return;

    // Fire the mouse events
    this._onRemoveButtonClick(event);
  };

  _onRemoveButtonTouchMove = () => {
    // Set a flag that the view is being dragged
    this._dragging = true;
  };

  _onRemoveButtonTouchStart = () => {
    // Set a flag that the view is not being dragged
    this._dragging = false;
  };

  _renderLabel = () => {
    const { labelKey, onRemove, option, ...props } = this.props;
    return (
      <Label {...props} aria-selected="true" role="option">
        {option[labelKey]}
        {!!props.isMulti && <AriaOnly>&nbsp;</AriaOnly>}
      </Label>
    );
  };

  _renderRemoveIcon = () => {
    const { isDisabled, onRemove } = this.props;
    if (isDisabled || !onRemove) return null;
    return (
      <Icon
        aria-hidden="true"
        onClick={this._onRemoveButtonClick}
        onTouchEnd={this._onRemoveButtonTouchEnd}
        onTouchMove={this._onRemoveButtonTouchMove}
        onTouchStart={this._onRemoveButtonTouchStart}
      >
        &times;
      </Icon>
    );
  };
}

export default SelectedOption;

export const AriaOnly = styled.span`
  display: inline-block;
  height: 1px;
  width: 1px;
  margin: -1px;
  clip: rect(0, 0, 0, 0);
  overflow: hidden;
  float: left;
`;

const Container = styled.div`
  &:not(:first-of-type) {
    margin-left: 5px;
  }

  ${({ isDisabled, isMulti }) =>
    isMulti
      ? `
    background-color: #ebf5ff;
    border-radius: 2px;
    border: 1px solid #c2e0ff;
    color: #007eff;
    display: inline-block;
    font-size: 0.85em;
    vertical-align: top;
    ${isDisabled &&
      `
      background-color: #fcfcfc;
      border: 1px solid #e3e3e3;
      color: #333;
    `}
  `
      : `
    display: flex;
    align-items: center;
    bottom: 0;
    color: #aaa;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `};
`;

const Icon = styled.span`
  display: inline-block;
  cursor: pointer;
  border-bottom-left-radius: 2px;
  border-top-left-radius: 2px;
  border-right: 1px solid #c2e0ff;
  padding: 0 5px;

  &:focus &:hover {
    background-color: #d8eafd;
    color: #0071e6;
  }

  &:active {
    :active {
      background-color: #c2e0ff;
    }
  }
`;

const Label = styled.span`
  ${({ hasValue, isSingle }) =>
    hasValue &&
    isSingle &&
    `
    color: #333;
  `} ${({ isMulti }) =>
    isMulti &&
    `
    display: inline-block;
    vertical-align: middle;
    border-bottom-right-radius: 2px;
    border-top-right-radius: 2px;
    cursor: default;
    padding: 0 5px;
  `};
`;
