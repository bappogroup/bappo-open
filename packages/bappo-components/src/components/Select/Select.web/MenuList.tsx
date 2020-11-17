import React from 'react';
import { MenuListComponentProps } from 'react-select';

import Menu from '../../OldSelect/Select.web/Menu';
import { NoResults } from '../../OldSelect/Select.web/StyledComponents';

export function MenuList({
  children,
  options,
  selectOption,
  selectProps: {
    filterOption,
    getDropdownItemLayout,
    inputValue,
    noOptionsMessage,
    onBlur,
    onDropdownEndReached,
    onDropdownEndReachedThreshold,
    onInputChange,
    renderOption,
    searchable,
    selectRef,
    testID = 'bappo-select',
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
      isSearchable={false}
      labelKey="label"
      noResults={
        <NoResults>
          {noOptionsMessage!({
            inputValue: inputValue!,
          })}
        </NoResults>
      }
      onEndReached={onDropdownEndReached}
      onEndReachedThreshold={onDropdownEndReachedThreshold}
      onInputBlur={() => {
        // @ts-ignore
        // react-select wants an `onBlur` function that is called with an event
        // but we don't need it. See `SelectProps`.
        onBlur?.();
        onInputChange?.('', {
          action: 'input-blur',
        });
        selectRef.current?.onMenuClose();
      }}
      onInputChange={(newValue) => {
        onInputChange?.(newValue, {
          action: 'input-change',
        });
      }}
      onItemFocus={(option, event, index) =>
        (children as any)[index]?.props?.innerProps?.onMouseOver()
      }
      onItemSelect={selectOption}
      options={visibleOptions}
      renderOption={renderOption}
      searchText={inputValue ?? ''}
      selectedOptions={selectedOptions}
      testID={`${testID}-menu`}
      valueKey="value"
    />
  );
}
