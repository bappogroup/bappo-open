import React from 'react';
import { Select, Text, View } from 'bappo-components';
import createClass from 'create-react-class';
import { Switch } from 'react-native';
import { styles } from '../helpers';

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
  flexDirection: 'row',
  marginTop: 14,
};

const checkboxStyle = {
  flexDirection: 'row',
  marginLeft: 10,
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
  toggleCheckbox(name, value) {
    const newState = {};
    newState[name] = value;
    this.setState(newState);
  },
  render() {
    const options = this.state.crazy ? WHY_WOULD_YOU : FLAVOURS;
    return (
      <View style={{ overflow: 'visible' }}>
        <Text>{this.props.label}</Text>
        <Select
          disabled={this.state.disabled}
          multi
          onValueChange={this.handleSelectChange}
          options={options}
          placeholder="Select your favourite(s)"
          style={styles.select}
          value={this.state.value}
        />

        <View style={checkboxListStyle}>
          <View style={checkboxStyle}>
            <Switch
              value={this.state.disabled}
              onValueChange={value => this.toggleCheckbox('disabled', value)}
            />
            <Text>Disable the control</Text>
          </View>
          <View style={checkboxStyle}>
            <Switch
              value={this.state.crazy}
              onValueChange={value => this.toggleCheckbox('crazy', value)}
            />
            <Text>I don't like Chocolate (disabled the option)</Text>
          </View>
        </View>
      </View>
    );
  },
});

export default SelectMultiselectExample;
