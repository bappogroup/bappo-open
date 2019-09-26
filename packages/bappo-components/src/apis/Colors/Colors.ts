const valuePropertyDescriptor = {
  configurable: false,
  writable: false,
  enumerable: true,
};

const colors = {
  BLUE: '#0070D2',
  GREEN: '#04844B',
  YELLOW: '#FFB75D',
  BROWN: '#B8977E',
  ORANGE: '#FF7800',
  RED: '#C23934',
  PINK: '#F77FB3',
  PURPLE: '#976DD0',
  BLACK: '#191E26',
  DARKGREY: '#5E6167',
  GREY: '#BABBBD',
  LIGHTGREY: '#D8D8D8',
};

const colorValues = Object.values(colors);

const Colors: {
  [name: string]: string;
} = {};

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
