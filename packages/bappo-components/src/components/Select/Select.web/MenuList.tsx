import React from 'react';
import { MenuListComponentProps } from 'react-select';

import Menu from '../../OldSelect/Select.web/Menu';

export function MenuList({
  children,
  options,
  selectOption,
  selectProps: {
    filterOption,
    getDropdownItemLayout,
    inputValue,
    onDropdownEndReached,
    onDropdownEndReachedThreshold,
    renderOption,
  },
}: MenuListComponentProps<any>) {
  const visibleOptions = React.useMemo(
    () =>
      options.filter((option) =>
        // A default value for `filterOption` must have been set because we set
        // it in the top-level Select component.
        // `inputValue` must have been set because we control it in the
        // top-level Select component.
        filterOption!(option, inputValue!),
      ),
    [filterOption, inputValue, options],
  );
  const focusedOption = React.useMemo(
    () =>
      visibleOptions.find(
        (option, index) => (children as any)[index]?.props?.isFocused,
      ),
    [children, visibleOptions],
  );
  const selectedOptions = React.useMemo(
    () =>
      visibleOptions.filter(
        (option, index) => (children as any)[index]?.props?.isSelected,
      ),
    [children, visibleOptions],
  );
  return (
    <Menu
      focusedOption={focusedOption}
      getItemLayout={getDropdownItemLayout}
      labelKey="label"
      onEndReached={onDropdownEndReached}
      onEndReachedThreshold={onDropdownEndReachedThreshold}
      onItemFocus={(option, event, index) =>
        (children as any)[index]?.props?.innerProps?.onMouseOver()
      }
      onItemSelect={selectOption}
      options={visibleOptions}
      renderOption={renderOption}
      selectedOptions={selectedOptions}
      valueKey="value"
    />
  );
}
