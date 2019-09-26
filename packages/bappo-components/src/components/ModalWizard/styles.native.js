import styled from 'styled-components';
import { bodyContainerStyle } from './common-styles';
import View from '../../primitives/View';

export const BodyContainer = styled(View)`
  flex: 1;
  background-color: #fafafa;
  padding: 16px;
  ${bodyContainerStyle}
`;

export const footerStyle = `
  background-color: #fff;
  padding: 8px 16px;
`;

export const headingStyle = `
  padding: 8px 16px;
`;
