import { init } from 'lodash/fp';
import React from 'react';

import { styled } from '../../apis/Style';
import Text from '../../primitives/Text';
import View from '../../primitives/View';
import Button from '../Button';
import Modal from '../Modal';
import SubmitButton from '../SubmitButton';
import { BodyContainer, footerStyle, headingStyle } from './styles';
import { ModalWizardProps, ModalWizardState } from './types';

export default function ModalWizard({
  startFromStep,
  onFinish,
  onRequestClose,
  screens,
  submitButtonText,
  canSubmit = true,
  placement,
  visible = true,
  testID,
}: ModalWizardProps) {
  const [state, setState] = React.useState<ModalWizardState>({
    step: startFromStep || 0,
    submitting: false,
    formValues: {},
  });

  const isLastStep = state.step + 1 === screens.length;

  const handleSubmit = async () => {
    setState({ ...state, submitting: true });

    if (typeof onFinish === 'function') await onFinish();
    onRequestClose();
  };

  const renderCommonFooterButtons = () => (
    <React.Fragment>
      {state.step > 0 && (
        <FooterButton
          type="tertiary"
          text="Back"
          onPress={() => setState(({ step }) => ({ ...state, step: step - 1 }))}
        />
      )}
      <FooterButton type="tertiary" text="Cancel" onPress={onRequestClose} />
    </React.Fragment>
  );

  const renderForm = () => {
    const currentScreen = screens[state.step];

    // Make the form aware/controllable of steps
    const FormElement = currentScreen.render();

    const initialValues = state.formValues[state.step];

    return (
      <FormElement.type
        style={{ flex: 1 }}
        initialValues={initialValues}
        {...FormElement.props}
        onSubmit={async (filledFormValues) => {
          // save in state
          setState(({ formValues, step }) => {
            const updatedFormValues = { ...formValues };
            updatedFormValues[state.step] = filledFormValues;

            return {
              ...state,
              formValues: updatedFormValues,
              step: isLastStep ? step : step + 1,
            };
          });

          // invoke user's onSubmit callback
          await FormElement.props.onSubmit(filledFormValues);

          // handling steps
          if (isLastStep) {
            handleSubmit();
          }
        }}
      >
        {(formState) => {
          return (
            <React.Fragment>
              <BodyContainer>
                {typeof FormElement.props.children === 'function'
                  ? FormElement.props.children(formState)
                  : FormElement.props.children}
              </BodyContainer>
              <Footer>
                {renderCommonFooterButtons()}
                {isLastStep ? (
                  <FormSubmitButton
                    text={submitButtonText || 'Submit'}
                    type="primary"
                  />
                ) : (
                  <FormSubmitButton text="Next" type="tertiary" />
                )}
              </Footer>
            </React.Fragment>
          );
        }}
      </FormElement.type>
    );
  };

  const renderNonForm = () => (
    <React.Fragment>
      <BodyContainer>{screens[state.step].render()}</BodyContainer>
      <Footer>
        {renderCommonFooterButtons()}
        {isLastStep ? (
          <FooterButton
            type="primary"
            text={submitButtonText || 'Submit'}
            onPress={handleSubmit}
            loading={state.submitting}
            disabled={!canSubmit}
          />
        ) : (
          <FooterButton
            type="tertiary"
            text="Next"
            onPress={() =>
              setState(({ step }) => ({ ...state, step: step + 1 }))
            }
          />
        )}
      </Footer>
    </React.Fragment>
  );

  const currentScreen = screens[state.step];

  return (
    <Modal
      visible={visible}
      onRequestClose={onRequestClose}
      placement={placement}
      hideHeader={true}
      data-testid={testID}
    >
      <HeadingContainer>
        <Heading>{currentScreen.title || 'Wizard'}</Heading>
      </HeadingContainer>
      {currentScreen.isForm ? renderForm() : renderNonForm()}
    </Modal>
  );
}

const HeadingContainer = styled(View)`
  align-items: center;
  justify-content: center;
  ${headingStyle};
`;

const Heading = styled(Text)`
  font-size: 18px;
`;

const Footer = styled(View)`
  background-color: #fafafa;
  align-items: center;
  flex-direction: row;
  justify-content: flex-end;
  ${footerStyle};
`;

const FooterButton = styled(Button)`
  margin-left: 16px;
`;

const FormSubmitButton = styled(SubmitButton)`
  margin-left: 16px;
`;
