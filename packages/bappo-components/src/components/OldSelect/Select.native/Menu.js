// @flow

import * as React from 'react';
import { styled } from '../../../apis/Style';
import FlatList from '../../../primitives/FlatList';
import Text from '../../../primitives/Text';
import TouchableView from '../../../primitives/TouchableView';
import View from '../../../primitives/View';
import type { Option, renderOptionType } from '../types.js.flow';

type Props = {
  getItemLayout?: (
    item: Option,
    index: number,
  ) => {
    length: number,
    offset: number,
    index: number,
  },
  labelKey: string,
  onEndReached?: ?() => void,
  onEndReachedThreshold?: ?number,
  onItemSelect: (option: Option) => void,
  options: Array<Option>,
  renderOption?: ?renderOptionType,
  selectedOptions: Array<Option>,
  valueKey: string,
};

const ROW_HEIGHT = 50;

class Menu extends React.Component<Props> {
  render() {
    const {
      getItemLayout,
      onEndReached,
      onEndReachedThreshold,
      options,
    } = this.props;

    return (
      <FlatList
        data={options}
        getItemLayout={getItemLayout || this._defaultGetItemLayout}
        keyExtractor={this._keyExtractor}
        onEndReached={onEndReached}
        onEndReachedThreshold={onEndReachedThreshold}
        renderItem={this._renderItem}
      />
    );
  }

  _defaultGetItemLayout = (item: Option, index: number) => ({
    length: ROW_HEIGHT,
    offset: ROW_HEIGHT * index,
    index,
  });

  _defaultRenderOption = ({
    option,
    isSelected,
  }: {
    option: Option,
    isSelected: boolean,
  }) => {
    const optionLabel = option[this.props.labelKey];
    return (
      <Row testID={`select-option-${optionLabel}`}>
        <Label numberOfLines={2} isDisabled={option.disabled}>
          {optionLabel}
        </Label>
        <SelectedIcon show={isSelected}>✓</SelectedIcon>
      </Row>
    );
  };

  _keyExtractor = (option: Option) => option[this.props.valueKey];

  _renderItem = ({ item: option, index }: { item: Option, index: number }) => {
    const { onItemSelect, selectedOptions } = this.props;
    const renderOption = this.props.renderOption || this._defaultRenderOption;

    const isSelected = selectedOptions.indexOf(option) > -1;

    return (
      <TouchableView
        disabled={option.disabled}
        onPress={() => onItemSelect(option)}
      >
        {renderOption({ option, index, isSelected })}
      </TouchableView>
    );
  };
}

export default Menu;

const Label = styled(Text)`
  flex: 1;
  ${({ isDisabled }) =>
    isDisabled &&
    `
    color: #ccc;
  `};
`;

const Row = styled(View)`
  align-items: center;
  flex-direction: row;
  height: ${ROW_HEIGHT}px;
  padding: 0 10px;
`;

const SelectedIcon = styled(Text)`
  font-size: 20px;
  opacity: ${props => (props.show ? '1' : '0')};
`;
