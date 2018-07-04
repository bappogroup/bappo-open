// @flow

const valuePropertyDescriptor = {
  configurable: false,
  writable: false,
  enumerable: true,
};

const colors = {
  BLUE: '#57A6FF',
  GREEN: '#0CD185',
  YELLOW: '#FFBA5C',
  BROWN: '#B8977E',
  ORANGE: '#FF9052',
  RED: '#F95F62',
  PINK: '#F77FB3',
  PURPLE: '#976DD0',
  BLACK: '#343F4B',
  GREY: '#969FAA',
};

const colorValues = Object.values(colors);

const Colors = {};

Object.defineProperties(Colors, {
  BLUE: {
    ...valuePropertyDescriptor,
    value: colors.BLUE,
  },
  GREEN: {
    ...valuePropertyDescriptor,
    value: colors.GREEN,
  },
  YELLOW: {
    ...valuePropertyDescriptor,
    value: colors.YELLOW,
  },
  BROWN: {
    ...valuePropertyDescriptor,
    value: colors.BROWN,
  },
  ORANGE: {
    ...valuePropertyDescriptor,
    value: colors.ORANGE,
  },
  RED: {
    ...valuePropertyDescriptor,
    value: colors.RED,
  },
  PINK: {
    ...valuePropertyDescriptor,
    value: colors.PINK,
  },
  PURPLE: {
    ...valuePropertyDescriptor,
    value: colors.PURPLE,
  },
  BLACK: {
    ...valuePropertyDescriptor,
    value: colors.BLACK,
  },
  GREY: {
    ...valuePropertyDescriptor,
    value: colors.GREY,
  },
  values: {
    configurable: false,
    writable: false,
    enumerable: false,
    value: () => colorValues,
  },
});

export default Colors;
