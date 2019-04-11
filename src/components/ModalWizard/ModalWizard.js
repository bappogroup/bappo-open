import React from 'react';
import { styled } from '../../apis/Style';
import Modal from '../Modal';
import Button from '../Button';
import View from '../../primitives/View';
import Text from '../../primitives/Text';
import { Form } from '../../primitives/Form';
import createButton from '../Button/createButton';
import { BodyContainer, headingStyle, footerStyle } from './styles';

class ModalWizard extends React.Component {
  state = {
    step: this.props.startFromStep || 0,
    submitting: false,
    /**
     * Form values: local cache of form values - used when jumping between steps
     * step-to-values map
     */
    formValues: {},
  };

  handleSubmit = async () => {
    this.setState({ submitting: true });

    const { onFinish, onRequestClose } = this.props;
    if (typeof onFinish === 'function') await this.props.onFinish();
    onRequestClose();
  };

  renderCommonFooterButtons = () => (
    <React.Fragment>
      {this.state.step > 0 && (
        <FooterButton
          type="tertiary"
          text="Back"
          onPress={() => this.setState(({ step }) => ({ step: step - 1 }))}
        />
      )}
      <FooterButton
        type="tertiary"
        text="Cancel"
        onPress={this.props.onRequestClose}
      />
    </React.Fragment>
  );

  renderForm = () => {
    const { screens, submitButtonText } = this.props;
    const currentScreen = screens[this.state.step];
    const isLastStep = this.state.step + 1 === screens.length;

    // Make the form aware/controllable of steps
    const FormElement = currentScreen.render();

    const initialValues = this.state.formValues[this.state.step];

    return (
      <FormElement.type
        style={{ flex: 1 }}
        initialValues={initialValues}
        {...FormElement.props}
        onSubmit={async filledFormValues => {
          // save in state
          this.setState(({ formValues }) => {
            const updatedFormValues = { ...formValues };
            updatedFormValues[this.state.step] = filledFormValues;
            return { formValues: updatedFormValues };
          });

          // invoke user's onSubmit callback
          await FormElement.props.onSubmit(filledFormValues);

          // handling steps
          if (isLastStep) {
            this.handleSubmit();
          } else {
            this.setState(({ step }) => ({ step: step + 1 }));
          }
        }}
      >
        <BodyContainer>{FormElement.props.children}</BodyContainer>
        <Footer>
          {this.renderCommonFooterButtons()}
          {isLastStep ? (
            <FormSubmitButton
              text={submitButtonText || 'Submit'}
              type="primary"
            />
          ) : (
            <FormSubmitButton text="Next" type="tertiary" />
          )}
        </Footer>
      </FormElement.type>
    );
  };

  renderNonForm = () => {
    const { screens, submitButtonText } = this.props;
    const isLastStep = this.state.step + 1 === screens.length;

    return (
      <React.Fragment>
        <BodyContainer>{screens[this.state.step].render()}</BodyContainer>
        <Footer>
          {this.renderCommonFooterButtons()}
          {isLastStep ? (
            <FooterButton
              type="primary"
              text={submitButtonText || 'Submit'}
              onPress={this.handleSubmit}
              loading={this.state.submitting}
            />
          ) : (
            <FooterButton
              type="tertiary"
              text="Next"
              onPress={() => this.setState(({ step }) => ({ step: step + 1 }))}
            />
          )}
        </Footer>
      </React.Fragment>
    );
  };

  render() {
    const { screens, onRequestClose } = this.props;
    const currentScreen = screens[this.state.step];

    return (
      <Modal visible onRequestClose={onRequestClose}>
        <HeadingContainer>
          <Heading>{currentScreen.title || 'Wizard'}</Heading>
        </HeadingContainer>
        {currentScreen.isForm ? this.renderForm() : this.renderNonForm()}
      </Modal>
    );
  }
}

export default ModalWizard;

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

const FormSubmitButton = styled(createButton(Form.SubmitButton))`
  margin-left: 16px;
`;
