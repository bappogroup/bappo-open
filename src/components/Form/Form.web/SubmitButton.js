// @flow

import * as React from 'react';
import styled from 'styled-components';
import FlexButton from '../../internals/web/FlexButton';
import ActivityIndicator from '../../ActivityIndicator';
import { buttonContainerStyle } from '../../NewButton/styles';
import { FormStateConsumer } from '../FormState';
import { SubmitButtonText } from '../StyledComponents';

type Props = {
  text?: string,
};

const SubmitButton = ({ text }: Props) => {
  return (
    <FormStateConsumer>
      {({ submitting }) => {
        return (
          <StyledButton type="submit" text={text}>
            {submitting ? (
              <ActivityIndicator />
            ) : (
              <SubmitButtonText>{text}</SubmitButtonText>
            )}
          </StyledButton>
        );
      }}
    </FormStateConsumer>
  );
};

SubmitButton.defaultProps = {
  text: 'Submit',
};

export default SubmitButton;

const StyledButton = styled(FlexButton).attrs({
  type: 'primary',
})`
  ${buttonContainerStyle};
`;
