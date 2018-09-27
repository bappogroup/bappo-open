// @flow

import invariant from 'fbjs/lib/invariant';
import isPlainObject from 'lodash/isPlainObject';

export const validateOptions = (options: any) => {
  invariant(!!options, 'Alert: options is required');
  invariant(
    !options.actions || isPlainObject(options.actions),
    'Alert: options.actions must be an object with confirm, cancel and neutral buttons.',
  );
};
