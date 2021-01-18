import debounce from 'lodash/debounce';
import React from 'react';

export function useDebouncedInputProps({
  onValueChange,
  value,
}: {
  onValueChange?: (value: string) => void;
  value?: string;
}) {
  const [rawInput, setRawInput] = React.useState(value);
  const [prevValue, setPrevValue] = React.useState(value);

  // Sync input with passed-in value in case it was modified from outside
  if (value !== prevValue) {
    if (value !== rawInput) {
      setRawInput(value);
    }
    setPrevValue(value);
  }

  const debouncedOnValueChange = React.useMemo(() => {
    return onValueChange && debounce(onValueChange, 500);
  }, [onValueChange]);
  // clear timeout
  React.useEffect(() => {
    return () => {
      if (debouncedOnValueChange) {
        debouncedOnValueChange.cancel();
      }
    };
  }, [debouncedOnValueChange]);

  return {
    onValueChange: (newValue: string) => {
      setRawInput(newValue);
      debouncedOnValueChange?.(newValue);
    },
    value: rawInput,
  };
}
