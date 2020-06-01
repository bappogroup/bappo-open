import { styled } from '../../apis/Style';
import Text from '../../primitives/Text';

export const PlaceholderText = styled(Text)`
  color: #aaa;
`;

export const ValueText = styled(Text)`
  ${({ textColor }) => textColor && `color: ${textColor}`}
`;
