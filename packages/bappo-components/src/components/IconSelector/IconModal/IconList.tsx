import React from 'react';
import styled from 'styled-components';

import FlatList from '../../../primitives/FlatList';
import View from '../../../primitives/View';
import IconButton from '../../IconButton';

const NUMBER_OF_COLUMNS = 23;

export function IconList({
  onSelect,
  selectedIcons,
}: {
  onSelect: (selectedIcon: string) => void;
  selectedIcons: string[];
}) {
  return (
    <StyledFlatList
      data={selectedIcons}
      initialNumToRender={6 * NUMBER_OF_COLUMNS}
      keyExtractor={(icon: string) => icon}
      numColumns={NUMBER_OF_COLUMNS}
      renderItem={({ item: icon }: { item: string }) => (
        <FlatListRow>
          <IconButton
            key={icon}
            name={icon}
            onPress={() => onSelect(icon)}
            tooltip={icon}
          />
        </FlatListRow>
      )}
    />
  );
}

const StyledFlatList = styled(FlatList)`
  flex: none;
  height: 145px;
`;

const FlatListRow = styled(View)`
  flex-direction: row;
`;
