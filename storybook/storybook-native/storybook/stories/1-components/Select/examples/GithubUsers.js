import React from 'react';
import axios from 'axios';
import { AsyncSelect, Text, View } from 'bappo-components';
import createClass from 'create-react-class';
import { Switch } from 'react-native';
import { styles } from '../helpers';

const checkboxListStyle = {
  flexDirection: 'row',
  marginTop: 14,
};

const checkboxStyle = {
  flexDirection: 'row',
  marginLeft: 10,
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
  getUsers(input) {
    return axios(`https://api.github.com/search/users?q=${input}`)
      .then((res) => {
        this.setState({
          options: res.data.items,
        });
      });
  },
  toggleMulti(multi) {
    this.setState((prevState) => {
      let value;
      if (multi) {
        value = prevState.value ? [prevState.value] : [];
      } else {
        value = prevState.value ? prevState.value[0] : null;
      }
      return {
        multi,
        value,
      };
    });
  },
  render() {
    return (
      <View style={{ overflow: 'visible' }}>
        <Text>{this.props.label}</Text>
        <AsyncSelect
          multi={this.state.multi}
          value={this.state.value}
          onValueChange={this.onChange}
          options={this.state.options}
          valueKey="id"
          labelKey="login"
          loadOptions={this.getUsers}
          style={styles.select}
        />
        <View style={checkboxListStyle}>
          <View style={checkboxStyle}>
            <Switch
              value={this.state.multi}
              onValueChange={this.toggleMulti}
            />
            <Text>Multiselect</Text>
          </View>
        </View>
      </View>
    );
  },
});

export default AsyncSelectGithubUsersExample;
