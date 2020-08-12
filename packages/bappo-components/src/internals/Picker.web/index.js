// @flow

import * as React from 'react';

import {
  Arrow,
  ArrowZone,
  Clear,
  ClearZone,
  Container,
  Control,
  FakeInput,
  PopoverContainer,
  ValueContainer,
} from './StyledComponents';

type State = {
  isOpen: boolean,
};

type Props = {
  accessibilityLabel?: string,
  autoFocus: ?boolean,
  className?: string,
  clearable: ?boolean,
  clearValueText: string,
  onBlur?: ?() => void,
  onFocus?: ?() => void,
  onValueChange?: ?(value: string | null) => void,
  readOnly: boolean,
  renderDropdownIcon?: ?(state: State) => ?React.Element<any>,
  renderPopover?: ?() => ?React.Element<any>,
  renderValue?: ?(state: State) => ?React.Element<any>,
  style?: any,
  testID?: string,
};

class PickerWeb extends React.Component<Props, State> {
  static defaultProps = {
    clearable: true,
    clearValueText: 'Clear value',
    readOnly: false,
  };

  static displayName = 'PickerWeb';

  blur() {
    this._input && this._input.blur();
  }

  focus() {
    this._input && this._input.focus();
  }

  state: State = {
    isOpen: false,
  };

  componentDidMount() {
    if (this.props.autoFocus) {
      this.focus();
    }
  }

  render() {
    const { accessibilityLabel, className, style, testID } = this.props;

    const styleProps = {
      className,
      style,
    };

    return (
      <Container
        {...styleProps}
        accessibilityLabel={accessibilityLabel}
        testID={testID}
      >
        <Control
          onClick={this._onControlClick}
          onMouseDown={this._onControlMouseDown}
        >
          {this._renderInput()}
          {this._renderValue()}
          {this._renderClear()}
          {this._renderDropdownIcon()}
        </Control>
        {!!this.state.isOpen && this._renderPopover()}
      </Container>
    );
  }

  _input: any;

  _clearValue = () => {
    const { onValueChange } = this.props;

    onValueChange && onValueChange(null);
  };

  _closePopover = () => this.setState({ isOpen: false });

  _onClearButtonClick = (event: SyntheticEvent<>) => {
    event.stopPropagation();
    event.preventDefault();
    this._clearValue();
  };

  _onControlClick = (event: SyntheticEvent<>) => {
    // if the event was triggered by a click and not the primary button, or if the component is
    // read-only, ignore it.
    // $FlowFixMe
    if (this.props.readOnly || (event.type === 'click' && event.button !== 0)) {
      return;
    }

    // prevent default event handlers
    event.stopPropagation();
    event.preventDefault();

    if (this.state.isOpen) {
      this.blur();
    } else {
      this.focus();
    }
  };

  _onControlMouseDown = (event: SyntheticEvent<>) => {
    event.stopPropagation();
    event.preventDefault();
  };

  _onDropdownIconClick = (event: SyntheticEvent<>) => {
    // if the event was triggered by a click and not the primary
    // button, or if the component is read-only, ignore it.
    // $FlowFixMe
    if (this.props.readOnly || (event.type === 'click' && event.button !== 0)) {
      return;
    }

    // If the menu isn't open, let the event bubble to _onControlClick
    if (!this.state.isOpen) {
      return;
    }

    // prevent default event handlers
    event.stopPropagation();
    event.preventDefault();

    // close the menu
    this.blur();
  };

  _onInputBlur = () => {
    const { onBlur } = this.props;

    onBlur && onBlur();

    this._closePopover();
  };

  _onInputFocus = () => {
    const { onFocus, readOnly } = this.props;

    if (readOnly) return;
    onFocus && onFocus();

    this.setState({
      isOpen: true,
    });
  };

  _onPopoverMouseDown = (event: SyntheticEvent<>) => {
    // if the event was triggered by a mousedown and not the primary
    // button, or if the component is read-only, ignore it.
    if (
      this.props.readOnly ||
      // $FlowFixMe
      (event.type === 'mousedown' && event.button !== 0)
    ) {
      return;
    }
    event.stopPropagation();
    event.preventDefault();

    this.focus();
  };

  _renderClear = () => {
    const { clearable, clearValueText, readOnly } = this.props;
    if (!clearable || readOnly) {
      return null;
    }

    return (
      <ClearZone
        aria-label={clearValueText}
        onClick={this._onClearButtonClick}
        title={clearValueText}
      >
        <Clear>&times;</Clear>
      </ClearZone>
    );
  };

  _renderDropdownIcon = () => {
    const { readOnly, renderDropdownIcon } = this.props;

    return (
      <ArrowZone onClick={this._onDropdownIconClick} $isDisabled={readOnly}>
        {renderDropdownIcon ? (
          renderDropdownIcon(this.state)
        ) : (
          <Arrow $isOpen={this.state.isOpen} />
        )}
      </ArrowZone>
    );
  };

  _renderInput = () => {
    return (
      <FakeInput
        ref={(ref) => {
          this._input = ref;
        }}
        onBlur={this._onInputBlur}
        onFocus={this._onInputFocus}
        tabIndex={0}
      />
    );
  };

  _renderPopover = () => {
    const { renderPopover } = this.props;

    return (
      <PopoverContainer onMouseDown={this._onPopoverMouseDown}>
        {renderPopover && renderPopover()}
      </PopoverContainer>
    );
  };

  _renderValue = () => {
    const { renderValue } = this.props;

    return (
      <ValueContainer>{renderValue && renderValue(this.state)}</ValueContainer>
    );
  };
}

export default PickerWeb;
