import React from 'react';

import { styled } from '../../../apis/Style';
import FlatList from '../../../primitives/FlatList';
import Text from '../../../primitives/Text';
import View from '../../../primitives/View';
import Icon from '../../Icon';
import { Option, SelectProps, renderOptionType } from '../types';
import OptionContainer from './OptionContainer';
import SearchBar from './SearchBar';

type Props = {
  focusedOption: Option;
  focusedOptionRef?: (ref: HTMLDivElement, isFocused: boolean) => void;
  getItemLayout?: SelectProps['getDropdownItemLayout'];
  isSearchable?: boolean;
  labelKey: string;
  listRef?: React.Ref<typeof FlatList>;
  noResults: React.ReactNode;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
  onInputBlur: (event: any) => void;
  onInputChange: (searchText: string) => void;
  onItemFocus?: (
    option: Option,
    event: React.SyntheticEvent<HTMLDivElement>,
    index: number,
  ) => void;
  onItemSelect: (
    option: Option,
    event: React.SyntheticEvent<HTMLDivElement>,
    index: number,
  ) => void;
  options: Array<Option>;
  renderOption?: renderOptionType;
  searchText: string;
  selectedOptions: Array<Option>;
  valueKey: string;
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
  isSearchable,
  listRef,
  labelKey,
  noResults,
  onEndReached,
  onEndReachedThreshold,
  onInputBlur,
  onInputChange,
  onItemFocus,
  onItemSelect,
  options,
  renderOption,
  searchText,
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
    option: Option;
    isSelected: boolean;
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
    item: Option;
    index: number;
  }) => {
    const finalRenderOption: renderOptionType =
      renderOption || _defaultRenderOption;

    const isFocused = option === focusedOption;
    const isSelected = selectedOptions.indexOf(option) > -1;

    return (
      <OptionContainer
        innerRef={(ref) => focusedOptionRef?.(ref, isFocused)}
        isDisabled={option.disabled}
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
    <React.Fragment>
      {isSearchable ? (
        <SearchBar
          autoFocus
          onInputBlur={onInputBlur}
          onInputChange={onInputChange}
          searchText={searchText}
        />
      ) : null}
      {options.length > 0 ? (
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
      ) : (
        noResults
      )}
    </React.Fragment>
  );
}

export default Menu;

const StyledFlatList = styled(FlatList)`
  border-radius: inherit;
  max-height: 198px;
`;

const Label = styled(Text)<{
  $isDisabled?: boolean;
}>`
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

const SelectedIcon = styled(Icon)<{
  $show?: boolean;
}>`
  opacity: ${(props) => (props.$show ? '1' : '0')};
`;
