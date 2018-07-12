// @flow

import * as React from 'react';
import ExecutionEnvironment from 'exenv';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import OverlayContainer from '../../../primitives/Overlay/Overlay.web/OverlayContainer';
import type { AlertOptions } from '../types.js.flow';
import { validateOptions } from '../helpers';
import AlertDialog from './AlertDialog';

class Alert {
  static alert(options: AlertOptions) {
    if (!ExecutionEnvironment.canUseDOM) {
      return;
    }

    validateOptions(options);

    const el = document.createElement('div');
    document.body && document.body.appendChild(el);

    ReactDOM.render(
      <StyledOverlayContainer>
        <AlertDialog
          {...options}
          onDismiss={() => document.body && document.body.removeChild(el)}
        />
      </StyledOverlayContainer>,
      el,
    );
  }
}

export default Alert;

const StyledOverlayContainer = styled(OverlayContainer)`
  display: flex;
  align-items: center;
  justify-content: center;
`;
