/* eslint-disable react/prop-types */

import React from 'react';
import { SwitchField, View } from 'bappo-components';

class SwitchMinimalExample extends React.Component {
  state = {
    value: false,
  };

  toggle = value => this.setState({ value });

  render() {
    return (
      <View>
        <SwitchField
          label="Enabled"
          onValueChange={this.toggle}
          value={this.state.value}
          reserveErrorSpace={false}
        />
      </View>
    );
  }
}

export default SwitchMinimalExample;
