import styled from 'styled-components';
import { bodyContainerStyle } from './common-styles';
import ScrollView from '../../primitives/ScrollView';

export const BodyContainer = styled(ScrollView)`
  flex: 1;
  background-color: #fff;
  padding: 16px 32px;
  ${bodyContainerStyle}
`;

export const footerStyle = `
  background-color: #fafafa;
  padding: 16px
`;

export const headingStyle = `
  padding: 16px;
`;
