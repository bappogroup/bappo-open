import React from 'react';
import { Button, Select, Text, View } from 'bappo-components';
import createClass from 'create-react-class';
import { Switch } from 'react-native';
import STATES from '../data/states';

const checkboxListStyle = {
  flexDirection: 'row',
  marginTop: 14,
};

const checkboxStyle = {
  flexDirection: 'row',
  marginLeft: 10,
};

const SelectStatesExample = createClass({
  getDefaultProps() {
    return {
      label: 'States:',
      searchable: true,
    };
  },
  getInitialState() {
    return {
      country: 'AU',
      disabled: false,
      searchable: this.props.searchable,
      selectValue: 'new-south-wales',
      clearable: true,
    };
  },
  updateValue(newValue) {
    console.log('State changed to ' + newValue);
    this.setState({
      selectValue: newValue,
    });
  },
  focusStateSelect() {
    this.stateSelect.focus();
  },
  toggleCheckbox(name, value) {
    const newState = {};
    newState[name] = value;
    this.setState(newState);
  },
  render() {
    const options = STATES[this.state.country];
    return (
      <View style={{ overflow: 'visible' }}>
        <Select
          clearable={this.state.clearable}
          disabled={this.state.disabled}
          onValueChange={this.updateValue}
          options={options}
          ref={(ref) => { this.stateSelect = ref; }}
          searchable={this.state.searchable}
          value={this.state.selectValue}
        />
        <View style={checkboxListStyle}>
          <Button
            onPress={this.focusStateSelect}
            title="Focus Select"
          />
          <View style={checkboxStyle}>
            <Switch
              value={this.state.searchable}
              onValueChange={value => this.toggleCheckbox('searchable', value)}
            />
            <Text>Searchable</Text>
          </View>
          <View style={checkboxStyle}>
            <Switch
              value={this.state.disabled}
              onValueChange={value => this.toggleCheckbox('disabled', value)}
            />
            <Text>Disabled</Text>
          </View>
          <View style={checkboxStyle}>
            <Switch
              value={this.state.clearable}
              onValueChange={value => this.toggleCheckbox('clearable', value)}
            />
            <Text>Clearable</Text>
          </View>
        </View>
      </View>
    );
  },
});

export default SelectStatesExample;
