// @flow

import * as React from 'react';
import Paragraph from '../../Paragraph';
import type { InputField, InputFieldProps } from '../types.js.flow';
import FieldContainer from '../FieldContainer';
import {
  FieldInputContainer,
  FieldLabel,
  FieldLabelContainer,
} from '../StyledComponents';
import type { Option, Value } from './types.js.flow';
import Select from './Select';

type Props = InputFieldProps & {
  /**
   * If `true`, focuses the input on `componentDidMount`. The default value is `false`.
   */
  autoFocus?: ?boolean,
  /**
   * If `true`, the input value can be cleared by pressing a button. The default value is `true`.
   */
  clearable?: ?boolean,
  /**
   * If `true`, a spinner is displayed. The default value is `false`.
   */
  isLoading?: ?boolean,
  /**
   * If `true`, the input becomes a multi-select. The default value is `false`.
   */
  multi?: ?boolean,
  /**
   * Text to show when there are no search results.
   */
  noResultsText?: string,
  /**
   * Called once when the scroll position gets within `onDropdownEndReachedThreshold` of the
   * rendered content of the dropdown.
   */
  onDropdownEndReached?: ?() => void,
  /**
   * How far from the end (in units of visible length of the list) the bottom edge of the
   * list must be from the end of the content to trigger the `onDropdownEndReached` callback.
   */
  onDropdownEndReachedThreshold?: ?number,
  /**
   * An array of options.
   */
  options?: ?(Option[]),
  /**
   * The string that will be rendered when there is no value.
   */
  placeholder?: string,
  /**
   * If `true`, the input is not editable. The default value is `false`.
   */
  readOnly?: ?boolean,
  /**
   * If `true`, user can use the text input to filter options. The default value is `true`.
   */
  searchable?: ?boolean,
  /**
   * The value of the select input.
   */
  value?: Value,
};

class SelectField extends React.Component<Props> implements InputField {
  static displayName = 'SelectField';

  blur() {
    this._selectRef.current && this._selectRef.current.blur();
  }

  focus() {
    this._selectRef.current && this._selectRef.current.focus();
  }

  render() {
    const {
      error,
      label,
      onBlur,
      onFocus,
      onValueChange,
      value,
      ...rest
    } = this.props;
    return (
      <FieldContainer onPress={() => this.focus()}>
        {label && (
          <FieldLabelContainer>
            <FieldLabel>{label}</FieldLabel>
          </FieldLabelContainer>
        )}
        <FieldInputContainer>
          <Select
            {...rest}
            ref={this._selectRef}
            onBlur={onBlur}
            onFocus={onFocus}
            onValueChange={onValueChange}
            value={value}
          />
        </FieldInputContainer>
        <Paragraph type="error">{error}</Paragraph>
      </FieldContainer>
    );
  }

  _selectRef = React.createRef();
}

export default SelectField;
