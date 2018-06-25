import styled from 'styled-components';

const FlexButton = styled.button`
  align-items: stretch;
  background-color: transparent;
  border-color: transparent;
  border-width: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  flow-shrink: 0;
  min-height: 0;
  min-width: 0;
  position: relative;
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
