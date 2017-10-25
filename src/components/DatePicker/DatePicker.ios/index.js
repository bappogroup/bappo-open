// @flow

import * as React from 'react';
import moment from 'moment';
import {
  DatePickerIOS,
} from 'react-native';
import PickerNative from '../../internals/Picker.native';
import { DEFAULT_DATE_DISPLAY_FORMAT, DEFAULT_DATE_VALUE_FORMAT } from '../constants';
import {
  PlaceholderText,
  ValueText,
} from './StyledComponents';

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
   * The value of the date input.
   */
  value?: ?string,
  /**
   * Date format of the input value.
   */
  valueFormat: string,
};

type State = {
  selectedDate: Date | null,
};

const getDefaultDate = (): Date => new Date();

class DatePicker extends React.Component<Props, State> {
  static defaultProps = {
    clearable: true,
    clearValueText: 'Clear value',
    displayFormat: DEFAULT_DATE_DISPLAY_FORMAT,
    readOnly: false,
    valueFormat: DEFAULT_DATE_VALUE_FORMAT,
  };

  static displayName = 'DatePicker';

  props: Props;

  blur() {
    this._picker && this._picker.blur();
  }

  focus() {
    this._picker && this._picker.focus();
  }

  constructor(props: Props) {
    super(props);

    const {
      value,
      valueFormat,
    } = this.props;

    let initialDate = moment(value || '', valueFormat);
    if (!initialDate.isValid()) {
      initialDate = moment();
    }

    this.state = {
      selectedDate: initialDate.toDate(),
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
      onClear: () => this._selectDate(null),
      onConfirm: () => this._selectDate(this.state.selectedDate || getDefaultDate()),
      onFocus,
      readOnly,
      ref: this._capturePickerRef,
      renderDropdownIcon,
      renderPopup: this._renderPopup,
      renderValue: this._renderValue,
      testID,
    };

    return (
      <PickerNative
        {...styleProps}
        {...props}
      />
    );
  }

  _picker: ?React.ElementRef<typeof PickerNative>;

  _capturePickerRef = (ref: ?React.ElementRef<typeof PickerNative>) => {
    this._picker = ref;
  };

  _onDateChange = (date: Date) => {
    this.setState({ selectedDate: date });
  };

  _renderPopup = () => {
    return (
      <DatePickerIOS
        date={this.state.selectedDate || getDefaultDate()}
        mode="date"
        onDateChange={this._onDateChange}
      />
    );
  };

  _renderValue = () => {
    const {
      displayFormat,
      placeholder,
      value,
      valueFormat,
    } = this.props;

    const date = moment(value || '', valueFormat);
    const dateStr = date.isValid()
      ? date.format(displayFormat)
      : '';

    if (!dateStr) {
      return (
        <PlaceholderText>
          {placeholder}
        </PlaceholderText>
      );
    }

    return (
      <ValueText>
        {dateStr}
      </ValueText>
    );
  };

  _selectDate = (date: Date | null) => {
    const {
      onValueChange,
      valueFormat,
    } = this.props;

    this.blur();

    this.setState({
      selectedDate: date,
    });

    if (onValueChange) {
      const dateMoment = moment(date);
      if (dateMoment.isValid()) {
        onValueChange(dateMoment.format(valueFormat));
      } else {
        onValueChange(null);
      }
    }
  };
}

export default DatePicker;
