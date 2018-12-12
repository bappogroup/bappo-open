import React from 'react';
import { TextField, View } from 'bappo-components';

class TextInputTypeExample extends React.Component {
  state = {
    email: '',
    password: '',
  };

  render() {
    return (
      <View>
        <TextField
          label="Email"
          placeholder="Your email"
          type="email"
          value={this.state.email}
          onValueChange={email => this.setState({ email })}
        />
        <TextField
          label="Password"
          placeholder="Your password"
          type="password"
          value={this.state.password}
          onValueChange={password => this.setState({ password })}
        />
      </View>
    );
  }
}

export default TextInputTypeExample;
