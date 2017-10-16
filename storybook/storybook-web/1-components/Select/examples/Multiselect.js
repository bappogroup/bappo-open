import React from 'react';
import { Select, View } from 'bappo-components';
import createClass from 'create-react-class';

const FLAVOURS = [
  { label: 'Chocolate', value: 'chocolate' },
  { label: 'Vanilla', value: 'vanilla' },
  { label: 'Strawberry', value: 'strawberry' },
  { label: 'Caramel', value: 'caramel' },
  { label: 'Cookies and Cream', value: 'cookiescream' },
  { label: 'Peppermint', value: 'peppermint' },
];

const WHY_WOULD_YOU = [
  { label: 'Chocolate (are you crazy?)', value: 'chocolate', disabled: true },
].concat(FLAVOURS.slice(1));

const checkboxListStyle = {
  marginTop: 14,
  overflow: 'hidden',
};

const checkboxStyle = {
  clear: 'left',
  float: 'left',
  marginTop: 14,
};

const SelectMultiselectExample = createClass({
  getInitialState() {
    return {
      disabled: false,
      crazy: false,
      value: [],
    };
  },
  handleSelectChange(value) {
    console.log('You\'ve selected:', value);
    this.setState({ value });
  },
  toggleCheckbox(e) {
    const newState = {};
    newState[e.target.name] = e.target.checked;
    this.setState(newState);
  },
  render() {
    const { crazy, disabled, value } = this.state;
    const options = crazy ? WHY_WOULD_YOU : FLAVOURS;
    return (
      <View style={{ overflow: 'visible' }}>
        <h3>{this.props.label}</h3>
        <Select
          disabled={disabled}
          multi
          onValueChange={this.handleSelectChange}
          options={options}
          placeholder="Select your favourite(s)"
          value={value}
        />

        <div style={checkboxListStyle}>
          <label style={checkboxStyle}>
            <input
              type="checkbox"
              name="disabled"
              checked={disabled}
              onChange={this.toggleCheckbox}
            />
            <span>Disable the control</span>
          </label>
          <label style={checkboxStyle}>
            <input
              type="checkbox"
              name="crazy"
              checked={crazy}
              onChange={this.toggleCheckbox}
            />
            <span>I don't like Chocolate (disabled the option)</span>
          </label>
        </div>
      </View>
    );
  },
});

export default SelectMultiselectExample;
