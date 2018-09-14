import Colors from '../../apis/Colors';

export const getBackgroundColor = ({ disabled, type }) => {
  if (disabled) {
    return '#B3B3B3';
  }
  switch (type) {
    case 'primary':
      return Colors.ORANGE;
    case 'secondary':
      return 'white';
    case 'tertiary':
      return 'transparent';
    case 'destructive':
      return 'white';
    default:
      return Colors.ORANGE;
  }
};

export const getTextColor = ({ disabled, type }) => {
  if (disabled) {
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
