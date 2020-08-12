/* eslint-disable react/prop-types */

import { Text, styled } from 'bappo-components';
import { bool } from 'prop-types';
import React from 'react';

class AppText extends React.PureComponent {
  static contextTypes = {
    isParentAText: bool,
  };

  render() {
    const { isParentAText } = this.context;
    return (
      <BaseText {...this.props} isParentAText={isParentAText} selectable />
    );
  }
}

export default AppText;

const BaseText = styled(Text)`
  ${({ isParentAText }) =>
    !isParentAText &&
    `
    font-size: 16px;
  `}
`;
