// @flow

import ExecutionEnvironment from 'exenv';
import * as React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import OverlayContainer from '../../../primitives/Overlay/Overlay.web/OverlayContainer';
import { convertOptions, validateOptions } from '../helpers';
import type { AlertOptions } from '../types.js.flow';
import AlertDialog from './AlertDialog';

class Alert {
  static async alert(_options: AlertOptions) {
    if (!ExecutionEnvironment.canUseDOM) {
      return;
    }

    const options = convertOptions(_options);
    validateOptions(options);
    const el = document.createElement('div');
    document.body && document.body.appendChild(el);

    return new Promise(resolve => {
      ReactDOM.render(
        <StyledOverlayContainer>
          <AlertDialog
            {...(options || defaultOptions)}
            onDismiss={result => {
              document.body && document.body.removeChild(el);
              resolve(result);
            }}
          />
        </StyledOverlayContainer>,
        el,
      );
    });
  }
}

export default Alert;

const StyledOverlayContainer = styled(OverlayContainer)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const defaultOptions = {
  confirm: {
    text: 'OK',
  },
};
