// @flow

const Platform = {
  OS: 'android',
  select: (obj: Object) => ('android' in obj ? obj.android : obj.default),
};

export default Platform;
