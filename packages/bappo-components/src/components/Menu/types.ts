export type MenuProps = {
  children?: React.ReactNode;
  icon?: string;
  iconColor?: string;
  testID?: string;
  trigger?:
    | React.ReactNode
    | ((
        open: () => void,
        close: () => void,
        isActive: boolean,
      ) => React.ReactNode);
  triggerStyle?: React.CSSProperties;
};

export type MenuItemProps = {
  children?: React.ReactNode;
  icon?: string;
  numberOfLines?: number;
  onPress?: () => any;
};
