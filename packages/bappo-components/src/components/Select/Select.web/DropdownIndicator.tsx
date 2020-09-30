import React from 'react';
import { IndicatorProps } from 'react-select';

import { styled } from '../../../apis/Style';
import Icon from '../../Icon';

export function DropdownIndicator(props: IndicatorProps<any>) {
  const {
    getStyles,
    innerProps: { ref, ...restInnerProps },
    selectProps: { renderDropdownIcon },
  } = props;
  return (
    <div
      {...restInnerProps}
      ref={ref}
      style={getStyles('clearIndicator', props)}
    >
      {renderDropdownIcon ? (
        renderDropdownIcon()
      ) : (
        <StyledIcon name="arrow-drop-down" />
      )}
    </div>
  );
}

const StyledIcon = styled(Icon)`
  font-size: 24px;
`;
