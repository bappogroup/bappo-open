import { isEqualWith } from 'lodash/fp';

export function isEmpty(value: unknown): boolean {
  return value == null || value === '';
}

export function deepEqual(a: unknown, b: unknown): boolean {
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

export function unwrapChildren(children: any): any {
  return Array.isArray(children) ? children[0] : children;
}
