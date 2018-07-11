// @flow

import invariant from 'fbjs/lib/invariant';

export const validateOptions = (options: any) => {
  invariant(!!options, 'Alert: options is required');
  invariant(
    !options.actions ||
      (Array.isArray(options.actions) && options.actions.length <= 3),
    'Alert: options.actions must be an array with up to 3 elements',
  );
};
