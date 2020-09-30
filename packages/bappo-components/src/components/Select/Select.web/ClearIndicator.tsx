import React from 'react';
import { IndicatorProps } from 'react-select';

import Icon from '../../Icon';

export function ClearIndicator(props: IndicatorProps<any>) {
  const {
    getStyles,
    innerProps: { ref, ...restInnerProps },
  } = props;
  return (
    <div
      {...restInnerProps}
      ref={ref}
      style={getStyles('clearIndicator', props)}
    >
      <Icon name="clear" />
    </div>
  );
}
