import React from 'react';
import { Select, View } from 'bappo-components';
import createClass from 'create-react-class';
import STATES from '../../../../data/states';

const checkboxListStyle = {
  marginTop: 14,
  overflow: 'hidden',
};

const checkboxStyle = {
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
  switchCountry(e) {
    const newCountry = e.target.value;
    console.log('Country changed to ' + newCountry);
    this.setState({
      country: newCountry,
      selectValue: null,
    });
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
  toggleCheckbox(e) {
    const newState = {};
    newState[e.target.name] = e.target.checked;
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
          style={{ padding: 10 }}
          value={this.state.selectValue}
        />
        <div style={checkboxListStyle}>
          <button
            type="button"
            onClick={this.focusStateSelect}
          >
            Focus Select
          </button>
          <label style={checkboxStyle}>
            <input
              type="checkbox"
              name="searchable"
              checked={this.state.searchable}
              onChange={this.toggleCheckbox}
            />
            <span>Searchable</span>
          </label>
          <label style={checkboxStyle}>
            <input
              type="checkbox"
              name="disabled"
              checked={this.state.disabled}
              onChange={this.toggleCheckbox}
            />
            <span>Disabled</span>
          </label>
          <label style={checkboxStyle}>
            <input
              type="checkbox"
              name="clearable"
              checked={this.state.clearable}
              onChange={this.toggleCheckbox}
            />
            <span>Clearable</span>
          </label>
        </div>
      </View>
    );
  },
});

export default SelectStatesExample;
