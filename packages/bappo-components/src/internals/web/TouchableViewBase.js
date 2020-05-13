// @flow
import Tooltip from '@reach/tooltip';
import * as React from 'react';
import styled, { injectGlobal } from 'styled-components';

import { buttonDefaultStyle } from './styles';
// $FlowFixMe typescript
import { createViewBase } from './ViewBase';

injectGlobal`
:root {
  --reach-tooltip: 1;
}

[data-reach-tooltip] {
  z-index: 1;
  pointer-events: none;
  position: absolute;
  padding: 0.5em 1em;
  box-shadow: 2px 2px 10px hsla(0, 0%, 0%, 0.1);
  white-space: nowrap;
  font-size: 85%;
  background: hsla(0, 0%, 0%, 0.75);
  color: white;
  border: none;
  borderRadius: 4px;
}
`;

export function createTouchableViewBase(component) {
  const ViewBase = createViewBase(component);
  const StyledViewBase = styled(ViewBase)`
    ${buttonDefaultStyle};
  `;
  const StyledViewBaseWithForwardRef = React.forwardRef((props, ref) => {
    return <StyledViewBase {...props} innerRef={ref} />;
  });

  // $FlowFixMe: forwardRef not supported yet
  return React.forwardRef((props, ref) => {
    return props.tooltip ? (
      <Tooltip label={props.tooltip}>
        <StyledViewBaseWithForwardRef {...props} ref={ref} />
      </Tooltip>
    ) : (
      <StyledViewBase {...props} innerRef={ref} />
    );
  });
}

export const DivTouchableViewBase = createTouchableViewBase('div');
