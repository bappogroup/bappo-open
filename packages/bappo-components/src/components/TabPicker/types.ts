export type TabPickerProps = {
  options: Array<any>;
  selected: Array<any>;
  optionToString: (any) => string;
  onChange: (value: Array<any> | any) => void;
  multi?: boolean;
  testID?: string;
};
