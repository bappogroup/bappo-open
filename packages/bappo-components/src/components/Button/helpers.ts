import Colors from '../../apis/Colors';
import { ButtonContainerStyleProps } from './types';

export const getFocusedBackgroundColor = ({
  type,
}: Pick<ButtonContainerStyleProps, 'type'>) => {
  switch (type) {
    case 'primary':
      return '#FF9333';
    case 'secondary':
      return '#F2F1F1';
    case 'tertiary':
      return 'white';
    case 'destructive':
      return Colors.RED;
    default:
      return '#FF9333';
  }
};

export const getBackgroundColor = ({
  hasDisabledStyle,
  loading,
  type,
}: Pick<
  ButtonContainerStyleProps,
  'hasDisabledStyle' | 'loading' | 'type'
>) => {
  if (hasDisabledStyle) {
    return '#B3B3B3';
  }
  if (loading) {
    return getFocusedBackgroundColor({ type });
  }
  switch (type) {
    case 'primary':
      return Colors.ORANGE;
    case 'secondary':
      return 'transparent';
    case 'tertiary':
      return 'transparent';
    case 'destructive':
      return 'transparent';
    default:
      return Colors.ORANGE;
  }
};

export const getFocusedBorderColor = ({
  type,
}: Pick<ButtonContainerStyleProps, 'type'>) => {
  switch (type) {
    case 'primary':
      return getFocusedBackgroundColor({ type });
    case 'secondary':
      return getFocusedBackgroundColor({ type });
    case 'tertiary':
      return '#DDDBDA';
    case 'destructive':
      return getFocusedBackgroundColor({ type });
    default:
      return getFocusedBackgroundColor({ type });
  }
};

export const getBorderColor = ({
  hasDisabledStyle,
  loading,
  type,
}: Pick<
  ButtonContainerStyleProps,
  'hasDisabledStyle' | 'loading' | 'type'
>) => {
  if (hasDisabledStyle) {
    return '#B3B3B3';
  }
  if (loading) {
    return getFocusedBorderColor({ type });
  }
  switch (type) {
    case 'primary':
      return getBackgroundColor({ type });
    case 'secondary':
      return '#DDDBDA';
    case 'tertiary':
      return getBackgroundColor({ type });
    case 'destructive':
      return Colors.RED;
    default:
      return getBackgroundColor({ type });
  }
};

export const getTextColor = ({
  hasDisabledStyle,
  type,
}: Pick<ButtonContainerStyleProps, 'hasDisabledStyle' | 'type'>) => {
  if (hasDisabledStyle) {
    return 'white';
  }
  switch (type) {
    case 'primary':
      return 'white';
    case 'secondary':
      return Colors.BLUE;
    case 'tertiary':
      return Colors.BLUE;
    case 'destructive':
      return Colors.RED;
    default:
      return 'white';
  }
};

export const getFocusedTextColor = ({
  hasDisabledStyle,
  type,
}: Pick<ButtonContainerStyleProps, 'hasDisabledStyle' | 'type'>) => {
  if (hasDisabledStyle) {
    return 'white';
  }
  switch (type) {
    case 'primary':
      return 'white';
    case 'secondary':
      return Colors.BLUE;
    case 'tertiary':
      return Colors.BLUE;
    case 'destructive':
      return 'white';
    default:
      return 'white';
  }
};

export const getActiveBackgroundColor = ({
  type,
}: Pick<ButtonContainerStyleProps, 'type'>) => {
  switch (type) {
    case 'primary':
      return '#E36A00';
    case 'secondary':
      return Colors.BLUE;
    case 'tertiary':
      return Colors.BLUE;
    case 'destructive':
      return getFocusedBackgroundColor({ type });
    default:
      return '#E36A00';
  }
};

export const getActiveBorderColor = ({
  type,
}: Pick<ButtonContainerStyleProps, 'type'>) => {
  switch (type) {
    case 'primary':
      return getActiveBackgroundColor({ type });
    case 'secondary':
      return '#0031AC';
    case 'tertiary':
      return '#0031AC';
    case 'destructive':
      return getFocusedBorderColor({ type });
    default:
      return getActiveBackgroundColor({ type });
  }
};

export const getActiveTextColor = ({
  type,
}: Pick<ButtonContainerStyleProps, 'type'>) => {
  return 'white';
};
