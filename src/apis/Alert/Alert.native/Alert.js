// @flow

import RN from 'react-native';
import type { AlertOptions } from '../types.js.flow';
import { validateOptions } from '../helpers';

class Alert {
  static alert(options: AlertOptions) {
    validateOptions(options);

    RN.Alert.alert(options.title, options.message, options.actions, {
      cancelable: false,
    });
  }
}

export default Alert;
