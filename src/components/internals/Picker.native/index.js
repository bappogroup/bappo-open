// @flow

import * as React from 'react';
import {
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import Popup from './Popup';
import {
  Container,
  Control,
  IconText,
  IconTextContainer,
  OKText,
  PopupContentContainer,
  PopupText,
  PopupTopBar,
  ValueContainer,
} from './StyledComponents';

type Props = {
  accessibilityLabel?: string,
  autoFocus: ?boolean,
  clearable: ?boolean,
  clearValueText: string,
  onBlur?: ?() => void,
  onClear?: ?() => void,
  onConfirm?: ?() => void,
  onFocus?: ?() => void,
  readOnly: ?boolean,
  renderDropdownIcon?: ?(state: State) => ?React.Element<any>,
  renderPopup?: ?() => ?React.Element<any>,
  renderValue?: ?(state: State) => ?React.Element<any>,
  style?: any,
  testID?: string,
};

type State = {
  isOpen: boolean,
};

class PickerNative extends React.Component<Props, State> {
  static defaultProps = {
    autoFocus: false,
    clearable: true,
    clearValueText: 'Clear value',
    readOnly: false,
  };

  props: Props;

  blur = () => {
    const {
      onBlur,
    } = this.props;

    onBlur && onBlur();

    this._closePopup();
  };

  focus = () => {
    const {
      onFocus,
      readOnly,
    } = this.props;

    if (readOnly) return;

    onFocus && onFocus();

    this.setState({
      isOpen: true,
    });
  };

  state: State = {
    isOpen: false,
  };

  componentDidMount() {
    if (this.props.autoFocus) {
      this.focus();
    }
  }

  render() {
    const {
      accessibilityLabel,
      readOnly,
      style,
      testID,
    } = this.props;

    const styleProps = {
      style,
    };

    return (
      <Container
        {...styleProps}
        accessibilityLabel={accessibilityLabel}
        testID={testID}
      >
        <Control
          onPress={this._onControlPress}
        >
          {this._renderValue()}
          {this._renderDropdownIcon()}
        </Control>
        {Platform.OS === 'ios' && !readOnly && this._renderPopup()}
      </Container>
    );
  }

  _closePopup = () => this.setState({ isOpen: false });

  _onControlPress = (event: SyntheticEvent<>) => {
    if (this.props.readOnly) {
      return;
    }

    // prevent default event handlers
    event.stopPropagation();
    event.preventDefault();

    this.focus();
  };

  _renderClear = () => {
    const {
      clearable,
      clearValueText,
      onClear,
      readOnly,
    } = this.props;
    if (!clearable || readOnly) {
      return null;
    }

    return (
      <TouchableOpacity
        onPress={onClear}
      >
        <PopupText>{clearValueText}</PopupText>
      </TouchableOpacity>
    );
  };

  _renderConfirmButton = () => {
    return (
      <TouchableOpacity
        onPress={this.props.onConfirm}
      >
        <OKText>Done</OKText>
      </TouchableOpacity>
    );
  };

  _renderDropdownIcon = () => {
    const {
      renderDropdownIcon,
    } = this.props;

    return renderDropdownIcon ? renderDropdownIcon(this.state) : (
      <IconTextContainer>
        <IconText>⌄</IconText>
      </IconTextContainer>
    );
  };

  _renderPopup = () => {
    const {
      renderPopup,
    } = this.props;

    return (
      <Popup
        onRequestClose={this._closePopup}
        show={this.state.isOpen}
      >
        <PopupContentContainer>
          <PopupTopBar>
            <TouchableOpacity
              onPress={this.blur}
            >
              <PopupText>Cancel</PopupText>
            </TouchableOpacity>
            <View style={{ flex: 1 }} />
            {this._renderClear()}
            {this._renderConfirmButton()}
          </PopupTopBar>
          {renderPopup && renderPopup()}
        </PopupContentContainer>
      </Popup>
    );
  };

  _renderValue = () => {
    const {
      renderValue,
    } = this.props;

    return (
      <ValueContainer>
        {renderValue && renderValue(this.state)}
      </ValueContainer>
    );
  };
}

export default PickerNative;
