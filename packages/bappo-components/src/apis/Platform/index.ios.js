// @flow

const Platform = {
  OS: 'ios',
  select: (obj: Object) => ('ios' in obj ? obj.ios : obj.default),
};

export default Platform;
