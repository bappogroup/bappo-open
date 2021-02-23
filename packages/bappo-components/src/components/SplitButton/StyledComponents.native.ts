import styled from 'styled-components';

import View from '../../primitives/View';
// import Colors from '../../apis/Colors';
import Button from '../Button';

export const MainButton = styled(Button)`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`;

export const MenuButton = styled(Button)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;

export const Separator = styled(View)`
  background-color: white;
  width: 1px;
`;

export const Container = styled(View)`
  display: flex;
  flex-direction: row;
`;

// export const Container = styled(View)`
//   display: flex;
//   flex-direction: row;
//   align-items: stretch;
//   background-color: ${Colors.ORANGE};
//   border-radius: 4px;
//   height: 32px;
// `;

// export const MainButton = styled(Button)`
//   flex: 1;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   min-height: 0;
// `;

// export const Separator = styled(View)`
//   background-color: white;
//   width: 1px;
// `;

// export const IconContainer = styled(View)`
//   flex: 1;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   min-height: 0;
//   width: 24px;
// `;
