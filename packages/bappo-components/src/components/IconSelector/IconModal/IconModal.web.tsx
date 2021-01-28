import React, { useMemo, useState } from 'react';
import styled from 'styled-components';

import MateriIcon from '../../../../glyphmaps/MaterialIcons.json';
import { useDebouncedInputProps } from '../../../internals/hooks/useDebouncedInputProps';
import View from '../../../primitives/View';
import TextField from '../../input-fields/TextField';
import Modal from '../../Modal';
import { IconList } from './IconList';

interface IconModalProps {
  modalVisable: boolean;
  setModalVisable: (visable: boolean) => void;
  setIconName: (value: string) => void;
}

const iconList = Object.keys(MateriIcon);

const IconModal: React.FC<IconModalProps> = ({
  modalVisable,
  setModalVisable,
  setIconName,
}) => {
  const [input, setInput] = useState('');

  const selectedIcons = useMemo(
    () => iconList.filter((icon) => (input ? icon.includes(input) : true)),
    [input],
  );

  const textFieldProps = useDebouncedInputProps({
    onValueChange: setInput,
    value: input,
  });

  return (
    <Modal
      onRequestClose={() => setModalVisable(false)}
      visible={modalVisable}
      title="Please choose your Icon"
    >
      <IconsContainer>
        <TextField
          {...textFieldProps}
          placeholder="Type to search Icons"
          reserveErrorSpace={false}
        />
        <IconList
          onSelect={(icon: string) => {
            setIconName(icon);
            setModalVisable(false);
          }}
          selectedIcons={selectedIcons}
        />
      </IconsContainer>
    </Modal>
  );
};

const IconsContainer = styled(View)`
  padding: 0px 8px;
`;

export default IconModal;
