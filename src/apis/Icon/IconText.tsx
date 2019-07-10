import styled from 'styled-components';
import Text from '../../primitives/Text';

const IconText = styled(Text)<{
  fontFamilyValue: string;
}>`
  font-family: ${props => props.fontFamilyValue};
  font-size: 16px;
  text-align: center;
`;

export default IconText;
