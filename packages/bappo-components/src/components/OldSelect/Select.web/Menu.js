// @flow

import * as React from 'react';

import { styled } from '../../../apis/Style';
import FlatList from '../../../primitives/FlatList';
import Text from '../../../primitives/Text';
import View from '../../../primitives/View';
import Icon from '../../Icon';
import type { Option, renderOptionType } from '../types.js.flow';
import OptionContainer from './OptionContainer';

type Props = {
  focusedOption: ?Option,
  focusedOptionRef?: ?(ref: ?HTMLDivElement, isFocused: boolean) => void,
  getItemLayout?: (
    item: Option,
    index: number,
  ) => {
    length: number,
    offset: number,
    index: number,
  },
  labelKey: string,
  listRef: (ref: ?React.ElementRef<typeof FlatList>) => void,
  onEndReached?: ?() => void,
  onEndReachedThreshold?: ?number,
  onItemFocus?: ?(option: Option) => void,
  onItemSelect: (option: Option) => void,
  options: Array<Option>,
  renderOption?: ?renderOptionType,
  selectedOptions: Array<Option>,
  valueKey: string,
};

const ROW_HEIGHT = 35;

const _defaultGetItemLayout = (item: Option, index: number) => ({
  length: ROW_HEIGHT,
  offset: ROW_HEIGHT * index,
  index,
});

function Menu({
  focusedOption,
  focusedOptionRef,
  getItemLayout,
  listRef,
  labelKey,
  onEndReached,
  onEndReachedThreshold,
  onItemFocus,
  onItemSelect,
  options,
  renderOption,
  selectedOptions,
  valueKey,
}: Props) {
  const extraData = React.useMemo(() => {
    return {
      focusedOption,
      selectedOptions,
    };
  }, [focusedOption, selectedOptions]);

  const _defaultRenderOption = ({
    option,
    isSelected,
  }: {
    option: Option,
    isSelected: boolean,
  }) => (
    <Row>
      <Label numberOfLines={2} $isDisabled={option.disabled}>
        {option[labelKey]}
      </Label>
      <SelectedIcon name="check" $show={isSelected} />
    </Row>
  );

  const _keyExtractor = (option: Option) => option[valueKey];

  const _renderItem = ({
    item: option,
    index,
  }: {
    item: Option,
    index: number,
  }) => {
    const finalRenderOption = renderOption || _defaultRenderOption;

    const isFocused = option === focusedOption;
    const isSelected = selectedOptions.indexOf(option) > -1;

    return (
      <OptionContainer
        innerRef={(ref) => focusedOptionRef?.(ref, isFocused)}
        $isDisabled={option.disabled}
        index={index}
        isFocused={isFocused}
        isSelected={isSelected}
        onFocus={onItemFocus}
        onSelect={onItemSelect}
        option={option}
      >
        {finalRenderOption({ option, index, isSelected })}
      </OptionContainer>
    );
  };

  return (
    <StyledFlatList
      data={options}
      extraData={extraData}
      getItemLayout={getItemLayout || _defaultGetItemLayout}
      ref={listRef}
      keyExtractor={_keyExtractor}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      renderItem={_renderItem}
    />
  );
}

export default Menu;

const StyledFlatList = styled(FlatList)`
  flex: none;
  max-height: 198px;
`;

const Label = styled(Text)`
  flex: 1;
  ${({ $isDisabled }) =>
    $isDisabled &&
    `
    color: #ccc;
  `};
`;

const Row = styled(View)`
  align-items: center;
  flex-direction: row;
  height: ${ROW_HEIGHT}px;
  padding: 0 5px;
`;

const SelectedIcon = styled(Icon)`
  opacity: ${(props) => (props.$show ? '1' : '0')};
`;
