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
          actions: [
            {
              text: 'Ask me later',
              onPress: () => console.log('Ask me later Pressed'),
            },
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'Destroy',
              onPress: () => console.log('Destroyed'),
              style: 'destructive',
            },
          ],
        })
      }
    />
  );
};

export default AlertMinimalExample;
