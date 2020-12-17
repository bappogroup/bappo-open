import ColorPicker from 'src/internals/ColorPicker';

import { Color } from '../../internals/ColorPicker/types';

export type ColorPickerProps = {
  hex: string;
  onClose?: (color: Color) => void;
  colors?: string[];
  className?: string;
  testID?: string;
};
