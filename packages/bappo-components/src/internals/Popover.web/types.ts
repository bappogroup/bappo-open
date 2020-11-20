export type PopoverProps = {
  anchorEl: HTMLElement | null;
  children?: React.ReactNode;
  onContentMouseDown?: (event: React.MouseEvent) => void;
  onRequestClose: () => void;
  visible?: boolean;
};
