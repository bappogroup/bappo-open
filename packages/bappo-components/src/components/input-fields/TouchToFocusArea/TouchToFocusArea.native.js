// @flow

import styled from 'styled-components';

const TouchToFocusArea = styled.TouchableOpacity.attrs(props => ({
  activeOpacity: 1,
}))`
  margin: 2px 0;
`;

export default TouchToFocusArea;
