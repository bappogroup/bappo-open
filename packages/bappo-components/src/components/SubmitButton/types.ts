import { ButtonProps } from '../Button/types';

export type SubmitButtonProps = Pick<
  ButtonProps,
  | 'disabled'
  | 'icon'
  | 'iconStyle'
  | 'style'
  | 'testID'
  | 'text'
  | 'textStyle'
  | 'tooltip'
  | 'type'
>;
