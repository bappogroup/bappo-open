import React, { useState } from 'react';

import IconButton from '../../components/IconButton';
import Text from '../../primitives/Text';
import View from '../../primitives/View';
import IconModal from './IconModal';

interface IconSelectorProps {
  size?: number;
  name?: string;
  color?: string;
}

const IconSelector: React.FC<IconSelectorProps> = ({ size, name, color }) => {
  const [modalVisable, setModalVisable] = useState(false);
  const [iconName, setIconName] = useState(name);
  const closeModal = () => setModalVisable(false);
  return (
    <View>
      <IconButton
        name={iconName}
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
          setIconName={setIconName}
        />
      ) : null}
    </View>
  );
};

IconSelector.defaultProps = {
  name: 'style',
};

export default IconSelector;
