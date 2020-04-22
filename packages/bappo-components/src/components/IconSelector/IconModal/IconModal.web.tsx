import React, { useMemo, useState } from 'react';
import styled from 'styled-components';

import MateriIcon from '../../../../glyphmaps/MaterialIcons.json';
import TextField from '../../../components/input-fields/TextField';
import FlatList from '../../../primitives/FlatList';
import View from '../../../primitives/View';
import IconButton from '../../IconButton';
import Modal from '../../Modal';

interface IconModalProps {
  modalVisable: boolean;
  setModalVisable: (visable: boolean) => void;
  setIconName: (value: string) => void;
}

const IconModal: React.FC<IconModalProps> = ({
  modalVisable,
  setModalVisable,
  setIconName,
}) => {
  //Init the Iconlist from JSON file.useMemo can save resource
  const iconList = useMemo(() => Object.keys(MateriIcon), []);

  //Init the 2D array for flatList
  const ARRAY_SIZE = 23;
  const [resultArray, setResultArray] = useState(() => {
    const initIconArrays = [];
    for (var i = 0; i < iconList.length; i = i + ARRAY_SIZE) {
      initIconArrays.push(iconList.slice(i, i + ARRAY_SIZE));
    }
    return initIconArrays;
  });

  const [value, setValue] = useState<string>('');

  // When there is a change in Textinput, filter the list and generate new 2D array.
  const handleChange = (input: string) => {
    setValue(input);
    const filtedIcons = iconList.filter(icon => icon.includes(input));

    const newResultArray = [];
    for (var i = 0; i < filtedIcons.length; i = i + ARRAY_SIZE) {
      newResultArray.push(filtedIcons.slice(i, i + ARRAY_SIZE));
    }
    setResultArray(newResultArray);
  };

  return (
    <Modal
      onRequestClose={() => setModalVisable(false)}
      visible={modalVisable}
      title="Please choose your Icon"
    >
      <IconsContainer>
        <TextField
          value={value}
          onValueChange={(value: string) => handleChange(value)}
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
