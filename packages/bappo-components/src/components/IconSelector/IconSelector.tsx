import React, { useState } from 'react';

import IconButton from '../../components/IconButton';
import { IconProps } from '../Icon/Icon';
import IconModal from './IconModal';

type IconSelectorProps = Pick<IconProps, 'color' | 'size'> & {
  onValueChange: (value: string) => void;
  value: string;
};

const IconSelector: React.FC<IconSelectorProps> = ({
  size,
  color,
  value,
  onValueChange,
}) => {
  const [modalVisable, setModalVisable] = useState(false);
  return (
    <React.Fragment>
      <IconButton
        name={value}
        onPress={() => {
          setModalVisable(!modalVisable);
        }}
        size={size}
        color={color}
      />
      {modalVisable ? (
        <IconModal
          modalVisable={modalVisable}
          setModalVisable={setModalVisable}
          setIconName={onValueChange}
        />
      ) : null}
    </React.Fragment>
  );
};

export default IconSelector;
