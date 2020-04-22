import React, { useState } from 'react';

import IconButton from '../../components/IconButton';
import View from '../../primitives/View';
import TextField from '../input-fields/TextField';
import IconModal from './IconModal';

interface IconSelectorProps {
  size?: number;
  color?: string;
  value?: string;
  onValueChange: (value: string) => void;
}

const IconSelector: React.FC<IconSelectorProps> = ({
  size,
  color,
  value,
  onValueChange,
}) => {
  const [modalVisable, setModalVisable] = useState(false);
  const closeModal = () => setModalVisable(false);
  return (
    <View>
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
    </View>
  );
};

export default IconSelector;
