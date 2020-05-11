import React from 'react';
interface IconModalProps {
    modalVisable: boolean;
    setModalVisable: (visable: boolean) => void;
    setIconName: (value: string) => void;
}
declare const IconModal: React.FC<IconModalProps>;
export default IconModal;
