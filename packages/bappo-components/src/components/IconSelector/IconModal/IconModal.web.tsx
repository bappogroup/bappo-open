import React, { useMemo, useState } from 'react';
import styled from 'styled-components';

import MateriIcon from '../../../../glyphmaps/MaterialIcons.json';
import TextField from '../../../components/input-fields/TextField';
import FlatList from '../../../primitives/FlatList';
import ScrollView from '../../../primitives/ScrollView';
import Text from '../../../primitives/Text';
import TextInput from '../../../primitives/TextInput';
import View from '../../../primitives/View';
import IconButton from '../../IconButton';
import Modal from '../../Modal';

interface IconModalProps {
  modalVisable: boolean;
  setModalVisable: () => void;
  setIconName: () => void;
}

const IconModal: React.FC = ({
  modalVisable,
  setModalVisable,
  setIconName,
}) => {
  //Init the Iconlist from JSON file.useMemo can save
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

  const [value, setValue] = useState('');

  // When there is a change in Textinput, filter the list and generate new 2D array.
  const handleChange = input => {
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
      <View style={{ padding: '0px 8px' }}>
        <TextField
          value={value}
          onValueChange={value => handleChange(value)}
          placeholder="Type to search Icon"
          reserveErrorSpace={false}
        />
        <View style={{ height: 210 }}>
          <FlatList
            horizontal={false}
            data={resultArray}
            renderItem={({ item }) => (
              <View key={item[0]} style={{ flexDirection: 'row' }}>
                {item.map(icon => {
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
              </View>
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

export default IconModal;
