import React from 'react';
import { Alert, Button } from 'bappo-components';

const AlertMinimalExample = () => {
  return (
    <Button
      type="primary"
      text="Show Alert"
      onPress={() =>
        Alert.alert({
          title: 'Alert Title',
          message: 'My Alert Msg',
          actions: {
            neutral: {
              text: 'Ask me later',
              onPress: () => console.log('Ask me later Pressed'),
            },
            cancel: {
              text: 'Abort!',
            },
            confirm: {
              text: 'Destroy',
              onPress: () => console.log('Destroyed'),
              destructive: true,
            },
          },
        })
      }
    />
  );
};

export default AlertMinimalExample;
