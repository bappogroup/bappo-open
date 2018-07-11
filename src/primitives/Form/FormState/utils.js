// @flow

import { isEqualWith } from 'lodash/fp';

export function isEmpty(value: mixed): boolean {
  return value == null || value === '';
}

export function deepEqual(a: mixed, b: mixed): boolean {
  return isEqualWith(
    (obj, other) => {
      if (obj === other) return true;

      if (!obj && !other) {
        return isEmpty(obj) === isEmpty(other);
      }
    },
    a,
    b,
  );
}

export function unwrapChildren(children: mixed): mixed {
  return Array.isArray(children) ? children[0] : children;
}
