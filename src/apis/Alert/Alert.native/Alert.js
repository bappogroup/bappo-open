// @flow

import RN from 'react-native';
import type { AlertOptions } from '../types.js.flow';
import { validateOptions } from '../helpers';

const defaultAction = {
  text: 'OK',
};

class Alert {
  static async alert(options: AlertOptions) {
    validateOptions(options);

    let actions = [defaultAction];

    const { confirm, cancel, neutral } = options.actions;

    if (confirm) {
      actions = [confirm];
    }

    if (confirm && cancel) {
      actions = [cancel, confirm];
    }

    if (confirm && cancel && neutral) {
      actions = [neutral, cancel, confirm];
    }

    return new Promise(resolve => {
      actions = actions.map(action => ({
        ...action,
        onPress: () => {
          resolve();
          action.onPress && action.onPress();
        },
      }));
      RN.Alert.alert(options.title, options.message, actions, {
        cancelable: false,
      });
    });
  }
}

export default Alert;
