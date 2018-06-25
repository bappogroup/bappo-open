// @flow

import * as React from 'react';
import styled from 'styled-components';
import FlexButton from '../../internals/web/FlexButton';
import { buttonContainerStyle, buttonTextStyle } from '../../NewButton/styles';
import Text from '../../Text';
import { FormStateConsumer } from '../FormState';

type Props = {
  submittingText?: string,
  text?: string,
};

const SubmitButton = ({ submittingText, text }: Props) => {
  return (
    <FormStateConsumer>
      {({ submitting }) => {
        const buttonText = submitting ? submittingText : text;
        return (
          <StyledButton text={buttonText} type="submit">
            <SubmitButtonText>{buttonText}</SubmitButtonText>
          </StyledButton>
        );
      }}
    </FormStateConsumer>
  );
};

SubmitButton.defaultProps = {
  submittingText: 'Submitting...',
  text: 'Submit',
};

export default SubmitButton;

const StyledButton = styled(FlexButton).attrs({
  type: 'primary',
})`
  ${buttonContainerStyle};
`;

const SubmitButtonText = styled(Text).attrs({
  type: 'primary',
})`
  ${buttonTextStyle};
`;
