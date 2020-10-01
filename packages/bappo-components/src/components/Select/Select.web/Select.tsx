import React from 'react';
import ReactSelect, {
  Props as ReactSelectProps,
  StylesConfig,
  createFilter,
} from 'react-select';

import FontContext from '../../../primitives/Font/FontContext';
import { SelectProps } from '../types';
import { ClearIndicator } from './ClearIndicator';
import { DropdownIndicator } from './DropdownIndicator';
import { MenuList } from './MenuList';

type Props = SelectProps & {
  className?: string;
};

const Select = React.forwardRef(function Select(
  {
    accessibilityLabel,
    autoFocus,
    className,
    clearable,
    filterOption,
    getDropdownItemLayout,
    isLoading,
    multi,
    noResultsText,
    onBlur,
    onDropdownEndReached,
    onDropdownEndReachedThreshold,
    onFocus,
    onInputChange,
    onValueChange,
    options,
    pageSize,
    placeholder,
    readOnly,
    renderDropdownIcon,
    renderOption,
    searchable,
    style,
    testID,
    value,
  }: Props,
  ref: React.Ref<ReactSelect>,
) {
  const { fontFamily, fontSize } = React.useContext(FontContext);

  // control input value as we need it to filter options in the custom MenuList
  const [inputValue, setInputValue] = React.useState('');
  const handleInputChange: NonNullable<ReactSelectProps['onInputChange']> = (
    newValue,
    actionMeta,
  ) => {
    setInputValue(newValue);
    onInputChange?.(newValue, actionMeta.action === 'input-change');
  };

  const selectRef = React.useRef<ReactSelect | null>(null);

  const selectedOption = multi
    ? ((value as (string | number)[]) ?? [])
        .map((val) => options?.find((op) => op.value === val))
        .filter(Boolean)
    : options?.find((op) => op.value === value) ?? null;

  return (
    <ReactSelect
      ref={(select) => {
        selectRef.current = select;
        if (ref) {
          if (typeof ref === 'function') {
            ref(select);
          } else {
            (ref as typeof selectRef).current = select;
          }
        }
      }}
      aria-label={accessibilityLabel}
      autoFocus={autoFocus}
      className={className}
      components={{
        ClearIndicator,
        DropdownIndicator,
        MenuList,
      }}
      data-testid={testID}
      filterOption={filterOption ?? createFilter({})}
      formatOptionLabel={renderOption}
      getDropdownItemLayout={getDropdownItemLayout}
      inputValue={inputValue}
      isClearable={clearable ?? true}
      isDisabled={readOnly}
      isLoading={isLoading}
      isMulti={multi}
      isSearchable={searchable}
      menuPortalTarget={document.body}
      noOptionsMessage={noResultsText ? () => noResultsText : undefined}
      onBlur={onBlur ?? undefined}
      onChange={(option) => {
        if (multi) {
          onValueChange?.(option.map((op) => op.value));
        } else {
          onValueChange?.(option?.value ?? null);
        }
      }}
      onDropdownEndReached={onDropdownEndReached}
      onDropdownEndReachedThreshold={onDropdownEndReachedThreshold}
      onFocus={onFocus ?? undefined}
      onInputChange={handleInputChange}
      options={options}
      pageSize={pageSize}
      placeholder={placeholder ?? ''}
      renderDropdownIcon={renderDropdownIcon}
      selectRef={selectRef}
      styles={{
        ...styles,
        container: () => ({
          fontFamily,
          fontSize,
          ...style,
        }),
      }}
      value={selectedOption}
    />
  );
});

export default Select;

const styles: StylesConfig = {
  clearIndicator: (provided) => {
    return {
      ...provided,
      padding: 0,
    };
  },
  control: (provided) => {
    return {
      ...provided,
      borderWidth: 0,
      boxShadow: 'none',
      minHeight: 0,
    };
  },
  dropdownIndicator: (provided) => {
    return {
      ...provided,
      padding: 0,
    };
  },
  indicatorsContainer: (provided) => {
    return {
      ...provided,
      paddingLeft: 0,
      paddingRight: 0,
    };
  },
  indicatorSeparator: (provided) => {
    return {
      ...provided,
      backgroundColor: 'transparent',
    };
  },
  input: (provided) => {
    return {
      ...provided,
      visibility: 'hidden',
    };
  },
  noOptionsMessage: (provided) => {
    return {
      ...provided,
      color: '#999',
    };
  },
  placeholder: (provided) => {
    return {
      ...provided,
      color: '#aaa',
    };
  },
  valueContainer: (provided) => {
    return {
      ...provided,
      paddingLeft: 0,
      paddingRight: 0,
    };
  },
};
