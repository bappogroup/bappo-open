import React from 'react';
import { Alert, Button, View, Text } from 'bappo-components';

class AlertMinimalExample extends React.Component {
  state = {
    result: '',
  };

  onPress = async () => {
    const result = await Alert.alert({
      title: 'Alert Title',
      message: 'My Alert Msg',
      actions: {
        neutral: {
          text: 'Ask me later',
        },
        cancel: {
          text: 'Abort!',
        },
        confirm: {
          text: 'Destroy',
          destructive: true,
        },
      },
    });

    if (result === 'confirm') {
      // Do something...
    }

    this.setState({
      result,
    });
  };

  onPress2 = async () => {
    await Alert.alert('Simple alert message');
  };

  render() {
    return (
      <View>
        <Button
          type="primary"
          text="Show Minimal Alert"
          onPress={() => this.onPress2()}
        />

        <View style={{ margin: 5 }} />

        <Button
          type="primary"
          text="Show Alert"
          onPress={() => this.onPress()}
        />
        <View style={{ marginTop: 20 }}>
          <Text> Result: {this.state.result}</Text>
        </View>
      </View>
    );
  }
}

export default AlertMinimalExample;
