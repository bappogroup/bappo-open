import React from 'react';
import axios from 'axios';
import { AsyncSelect, View } from 'bappo-components';
import createClass from 'create-react-class';

const checkboxListStyle = {
  marginTop: 14,
  overflow: 'hidden',
};

const checkboxStyle = {
  clear: 'left',
  float: 'left',
  marginTop: 14,
};

const AsyncSelectGithubUsersExample = createClass({
  getInitialState() {
    return {
      multi: false,
      options: [],
    };
  },
  onChange(value) {
    this.setState({
      value,
    });
  },
  switchToMulti() {
    this.setState(prevState => ({
      multi: true,
      value: prevState.value ? [prevState.value] : [],
    }));
  },
  switchToSingle() {
    this.setState(prevState => ({
      multi: false,
      value: prevState.value ? prevState.value[0] : null,
    }));
  },
  getUsers(input) {
    return axios(`https://api.github.com/search/users?q=${input}`)
      .then((res) => {
        this.setState({
          options: res.data.items,
        });
      });
  },
  render() {
    return (
      <View style={{ overflow: 'visible' }}>
        <h3>{this.props.label}</h3>
        <AsyncSelect
          multi={this.state.multi}
          value={this.state.value}
          onValueChange={this.onChange}
          options={this.state.options}
          valueKey="id"
          labelKey="login"
          loadOptions={this.getUsers}
        />
        <div style={checkboxListStyle}>
          <label style={checkboxStyle}>
            <input
              type="radio"
              checked={this.state.multi}
              onChange={this.switchToMulti}
            />
            <span>Multiselect</span>
          </label>
          <label style={checkboxStyle}>
            <input
              type="radio"
              checked={!this.state.multi}
              onChange={this.switchToSingle}
            />
            <span>Single Value</span>
          </label>
        </div>
      </View>
    );
  },
});

export default AsyncSelectGithubUsersExample;
