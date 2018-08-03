// @flow

import invariant from 'fbjs/lib/invariant';
import { isPlainObject } from 'lodash';

export const validateOptions = (options: any) => {
  invariant(!!options, 'Alert: options is required');
  invariant(
    !options.actions || isPlainObject(options.actions),
    'Alert: options.actions must be an array with up to 3 elements',
  );
};
