// @flow

import { styled } from '../../apis/Style';
import IconMaterial from './IconMaterial';

const Icon = styled(IconMaterial)`
  flex: none;
  align-items: center;
  height: 24px;
  line-height: 24px;
  width: 24px;
  color: ${props => props.color};
`;
Icon.displayName = 'Icon';

export default Icon;
