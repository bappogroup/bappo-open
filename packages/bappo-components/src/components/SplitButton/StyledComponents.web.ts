import styled from 'styled-components';

import Button from '../Button';

export const MainButton = styled(Button)`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  flex: 1;
`;

export const MenuButton = styled(Button)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;

export const Separator = styled.div`
  background-color: white;
  width: 1px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
`;
