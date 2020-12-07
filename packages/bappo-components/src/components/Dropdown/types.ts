export type ModalFormCancelButtonProps = {
  onPress?: () => void;
  text?: string;
};

export type ModalFormSubmitButtonProps = {
  text?: string;
};

export type DropdownProps = {
  actions: any;
  icon: string;
  children?: any;
  iconColor?: string;
  testID?: string;
};

export type DropdownState = {
  active: boolean;
};
