import chunk from 'lodash/chunk';
import React, { useMemo, useState } from 'react';
import styled from 'styled-components';

import MateriIcon from '../../../../../glyphmaps/MaterialIcons.json';
import TextField from '../../../../components/input-fields/TextField';
import FlatList from '../../../../primitives/FlatList';
import View from '../../../../primitives/View';
import IconButton from '../../../IconButton';
import Modal from '../../../Modal';

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
  const ARRAY_SIZE = 23;
  const [input, setInput] = useState('');
  // filter the list and generate 2D array for flatList
  const resultArray = useMemo(
    () =>
      chunk(
        iconList.filter((icon) => (input ? icon.includes(input) : true)),
        ARRAY_SIZE,
      ),
    [input],
  );

  return (
    <Modal
      onRequestClose={() => setModalVisable(false)}
      visible={modalVisable}
      title="Please choose your Icon"
    >
      <IconsContainer>
        <TextField
          value={input}
          onValueChange={setInput}
          placeholder="Type to search Icon"
          reserveErrorSpace={false}
        />
        <FlatListContainer>
          <FlatList
            horizontal={false}
            data={resultArray}
            renderItem={({ item }: { item: string[] }) => (
              <FlatListRow key={item[0]}>
                {item.map((icon: string) => {
                  return (
                    <IconButton
                      key={icon}
                      name={icon}
                      onPress={() => {
                        setIconName(icon);
                        setModalVisable(false);
                      }}
                      tooltip={icon}
                    />
                  );
                })}
              </FlatListRow>
            )}
          />
        </FlatListContainer>
      </IconsContainer>
    </Modal>
  );
};

const IconsContainer = styled(View)`
  padding: 0px 8px;
`;

const FlatListContainer = styled(View)`
  align-items: center;
  height: 145px;
`;

const FlatListRow = styled(View)`
  flex-direction: row;
`;

export default IconModal;
