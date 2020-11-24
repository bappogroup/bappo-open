export type MenuProps = {
  icon: string;
  children?: any;
  iconColor?: string;
  testID?: string;
  trigger?: React.ReactNode | ((isActive: boolean) => React.ReactNode);
};

export type MenuContext = {
  close: () => void;
  active: boolean;
};

export type MenuItemProps = {
  label: string;
  icon?: string;
  onPress: () => any;
  numberOfLines?: number;
};
