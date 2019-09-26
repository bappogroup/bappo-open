import React from 'react';
import { Switch, View } from 'bappo-components';

class SwitchMinimalExample extends React.Component {
  state = {
    value: false,
  };

  toggle = value => this.setState({ value });

  render() {
    return (
      <View>
        <Switch onValueChange={this.toggle} value={this.state.value} />
      </View>
    );
  }
}

export default SwitchMinimalExample;
