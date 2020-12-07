import { styled } from '../../apis/Style';
import Text from '../../primitives/Text';
import { ParagraphProps } from './types';

export const StyledText = styled(Text)<{ $type: ParagraphProps['type'] }>`
  margin-bottom: 8px;
  line-height: 22px;

  ${({ $type }) => {
    switch ($type) {
      case 'bold':
        return `
          font-weight: bold;
        `;
      case 'small':
        return `
          font-size: 12px;
          color: #2B2826;
          min-height: 15px;
          line-height: 15px;
        `;
      case 'error':
        return `
          font-size: 12px;
          color: #C23934;
          min-height: 20px;
          line-height: 20px;
        `;
      case 'success':
        return `
          color: #04844B;
          text-transform: uppercase;
        `;
      case 'white':
        return `
          color: white;
        `;
      default:
        break;
    }
  }};
`;
