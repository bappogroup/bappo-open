export type PopoverProps = {
  anchorEl: HTMLElement | null;
  children?: React.ReactNode;
  onContentMouseDown?: (event: React.MouseEvent) => void;
  onRequestClose: () => void;
  /**
   * **Note**: please make sure you wrap a `React.useCallback` if you pass an
   * inline function.
   *
   * **Note**: This prop has no effect when screen size is large phone or phone
   * as we will display a full screen popup.
   *
   * Callack function to customize the position of the popup. It is called with
   * the position of the anchor element and the popup content and must return
   * the top and left of the popup, relative to the window. If the popup is
   * obscured by a screen edge, it is then repositioned to align the the screen
   * edge.
   *
   * Default placement is top = anchorRect.top and left = anchorRect.left (the
   * left edge of the popup aligns with the left edge of the anchor and the top
   * edge of the popup aligns with the top edge of the anchor).
   */
  placement?: GetPopupPosition;
  visible?: boolean;
};

export type GetPopupPosition = (
  anchorRect: DOMRect,
  popupContentRect: DOMRect,
) => {
  top: number;
  left: number;
};
