import styled from 'styled-components';
import { flex } from './styles';

const FlexButton = styled.button`
  ${flex};
  background-color: transparent;
  border-color: transparent;
  border-width: 0;
  padding: 0;
  text-align: left;

  ${({ disabled }) =>
    disabled
      ? `
        color: inherit;
        cursor: not-allowed;
      `
      : `
        cursor: pointer;
      `};
`;

export default FlexButton;
