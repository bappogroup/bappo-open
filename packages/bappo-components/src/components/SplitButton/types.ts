export type SplitButtonProps = {
  children?: React.ReactNode;
  onButtonPress?: () => void;
  style?: React.CSSProperties;
  testID?: string;
  text: string;
  icon?: string;
  type?: 'primary' | 'secondary' | 'tertiary' | 'destructive';
};
