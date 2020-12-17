export type Color = {
  r?: number;
  g?: number;
  b?: number;
  a?: number;
  hex?: string;
};

export type ColorPickerProps = {
  color: Color;
  onChange: (color: Color) => void;
  colors?: string[];
};

export type SwatchProps = {
  color: Color;
  style?: any;
  onClick?: (color: Color, event: any) => void;
  title?: string;
  active?: boolean;
};

export type SwatchCollectionProps = {
  colors: Color[];
  style?: any;
  onClick?: (color: Color, event: any) => void;
  activeColor?: Color;
  className?: string;
};
