import RN from 'react-native';

import { convertOptions, validateOptions } from '../helpers';
import type { AlertOptions } from '../types.js.flow';

const defaultAction = {
  text: 'OK',
  response: 'confirm',
};

class Alert {
  static async alert(_options: AlertOptions) {
    const options = convertOptions(_options);
    validateOptions(options);

    let actions = [];

    const { confirm, cancel, neutral } = options.actions || {};

    if (!confirm && !cancel && !neutral) {
      actions = [defaultAction];
    }

    if (neutral) {
      actions.push({
        ...neutral,
        response: 'neutral',
      });
    }

    if (cancel) {
      actions.push({
        ...cancel,
        response: 'cancel',
      });
    }

    if (confirm) {
      actions.push({
        ...confirm,
        response: 'confirm',
      });
    }

    return new Promise(resolve => {
      actions = actions.map(a => {
        const { response, ...action } = a;

        action.onPress = () => {
          resolve(response);
          a.onPress && a.onPress();
        };
        return action;
      });

      RN.Alert.alert(options.title, options.message, actions, {
        cancelable: false,
      });
    });
  }
}

export default Alert;
