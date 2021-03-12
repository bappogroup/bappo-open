import React from 'react';

export interface ModalProps {
  onRequestClose: () => void;
  children?: React.ReactNode;
  hideHeader?: boolean;
  onOverlayPress?: () => void;
  renderFooter?: () => React.ReactNode;
  title?: string;
  visible?: boolean;
  placement?:
    | {
        type: 'dropdown';
        align: 'left';
        top: number;
        left: number;
        height: number;
        width: number;
      }
    | {
        type: 'dropdown';
        align: 'right';
        top: number;
        right: number;
        height: number;
        width: number;
      }
    | {
        type: 'fullscreen';
      }
    | {
        type: 'custom';
        top?: number;
        left?: number;
        height?: number;
        width?: number;
      };
}
