// @flow

import * as React from 'react';
import moment from 'moment';
import { DatePickerIOS } from 'react-native';
import PickerNative from '../../../internals/Picker.native';
import {
  DEFAULT_TIME_DISPLAY_FORMAT,
  DEFAULT_TIME_VALUE_FORMAT,
} from '../constants';
import { PlaceholderText, ValueText } from './StyledComponents';

type Props = {
  /**
   * Overrides the text that's read by the screen reader when the user interacts with the element.
   */
  accessibilityLabel?: string,
  /**
   * If `true`, focuses the input on `componentDidMount`. The default value is `false`.
   */
  autoFocus: ?boolean,
  /**
   * If `true`, the input value can be cleared by pressing a button. The default value is `true`.
   */
  clearable: ?boolean,
  clearValueText: string,
  /**
   * Date format of the displayed value.
   */
  displayFormat: string,
  /**
   * Callback that is called when the input is blurred.
   */
  onBlur?: ?() => void,
  /**
   * Callback that is called when the input is focused.
   */
  onFocus?: ?() => void,
  /**
   * Callback that is called when the input value changes.
   */
  onValueChange?: ?(value: string | null) => void,
  /**
   * The string that will be rendered when there is no value.
   */
  placeholder: string,
  /**
   * If `true`, the input is not editable. The default value is `false`.
   */
  readOnly: boolean,
  /**
   * Function to render the dropdown icon.
   */
  renderDropdownIcon?: ?() => ?React.Element<any>,
  // TODO
  style?: any,
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string,
  /**
   * The value of the time input.
   */
  value?: ?string,
  /**
   * Date format of the input value.
   */
  valueFormat: string,
};

type State = {
  selectedTime: Date | null,
};

const getDefaultTime = (): Date =>
  moment()
    .startOf('minute')
    .toDate();

class TimePicker extends React.Component<Props, State> {
  static defaultProps = {
    clearable: true,
    clearValueText: 'Clear value',
    displayFormat: DEFAULT_TIME_DISPLAY_FORMAT,
    readOnly: false,
    valueFormat: DEFAULT_TIME_VALUE_FORMAT,
  };

  static displayName = 'TimePicker';

  props: Props;

  blur() {
    this._picker && this._picker.blur();
  }

  focus() {
    this._picker && this._picker.focus();
  }

  constructor(props: Props) {
    super(props);

    const { value, valueFormat } = this.props;

    let initialTime = moment(value || '', valueFormat);
    if (!initialTime.isValid()) {
      initialTime = moment();
    }

    this.state = {
      selectedTime: initialTime.toDate(),
    };
  }

  render() {
    const {
      accessibilityLabel,
      autoFocus,
      clearable,
      clearValueText,
      onBlur,
      onFocus,
      readOnly,
      renderDropdownIcon,
      style,
      testID,
    } = this.props;

    const styleProps = {
      style,
    };

    const props = {
      accessibilityLabel,
      autoFocus,
      clearable,
      clearValueText,
      onBlur,
      onClear: () => this._selectTime(null),
      onConfirm: () =>
        this._selectTime(this.state.selectedTime || getDefaultTime()),
      onFocus,
      readOnly,
      ref: this._capturePickerRef,
      renderDropdownIcon,
      renderPopup: this._renderPopup,
      renderValue: this._renderValue,
      testID,
    };

    return <PickerNative {...styleProps} {...props} />;
  }

  _picker: ?React.ElementRef<typeof PickerNative>;

  _capturePickerRef = (ref: ?React.ElementRef<typeof PickerNative>) => {
    this._picker = ref;
  };

  _onTimeChange = (time: Date) => {
    this.setState({ selectedTime: time });
  };

  _renderPopup = () => {
    return (
      <DatePickerIOS
        date={this.state.selectedTime || getDefaultTime()}
        mode="time"
        onDateChange={this._onTimeChange}
      />
    );
  };

  _renderValue = () => {
    const { displayFormat, placeholder, value, valueFormat } = this.props;

    const time = moment(value || '', valueFormat);
    const timeStr = time.isValid() ? time.format(displayFormat) : '';

    if (!timeStr) {
      return <PlaceholderText>{placeholder}</PlaceholderText>;
    }

    return <ValueText>{timeStr}</ValueText>;
  };

  _selectTime = (time: Date | null) => {
    const { onValueChange, valueFormat } = this.props;

    this.blur();

    this.setState({
      selectedTime: time,
    });

    if (onValueChange) {
      const timeMoment = moment(time);
      if (timeMoment.isValid()) {
        onValueChange(timeMoment.format(valueFormat));
      } else {
        onValueChange(null);
      }
    }
  };
}

export default TimePicker;
