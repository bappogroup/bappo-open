import { css } from 'styled-components';

export const ButtonCSS = ({ $isSelected }) => {
  if ($isSelected) {
    return css`
      &:hover {
        opacity: 0.8;
      }
    `;
  }

  return css`
    &:hover {
      background-color: #eee;
    }
  `;
};
