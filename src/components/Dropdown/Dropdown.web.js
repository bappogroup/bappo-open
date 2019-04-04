// @flow

import * as React from 'react';
// Note that this is not the Modal we export. It has a slide animation on native.
import Modal from './Modal';
import Icon from '../Icon';
import {
  ActionRow,
  WebContainer,
  Label,
  BackLink,
} from './StyledComponents.web.js';

type RequiredProps = {
  actions: any,
  icon: string,
};
type OptionalProps = {};
type Props = RequiredProps & OptionalProps;

type State = {
  active: boolean,
};

class Dropdown extends React.Component<Props, State> {
  state = {
    active: false,
  };

  el: any = {
    getBoundingClientRect: () => ({}),
  };

  render() {
    const { actions, icon = 'more-vert' } = this.props;
    const dims = this.el.getBoundingClientRect();
    const left = dims.left;
    const right = window.innerWidth - (dims.left + dims.width);
    let top = dims.bottom + 3;
    const height = actions.length * 40;

    if (top + height + 10 > window.innerHeight) {
      top = window.innerHeight - height - 10;
    }

    const placement = {
      type: 'dropdown',
      top,
      height,
      width: 300,
      left: left < right ? left : null,
      right: left < right ? null : right,
    };

    return (
      <WebContainer>
        <div
          style={{
            display: 'inline-block',
            cursor: 'pointer',
            padding: '0px 5px',
          }}
          onClick={() => this.setState({ active: true })}
          ref={el => {
            this.el = el;
          }}
        >
          <Icon name={icon} />
        </div>
        <Modal
          onRequestClose={this._close}
          placement={placement}
          visible={this.state.active}
        >
          <BackButton onPress={this._close} />
          {actions.map(this._renderAction)}
        </Modal>
      </WebContainer>
    );
  }

  _renderAction = (action: any) => (
    <ActionRow
      key={action.label}
      onPress={() => {
        this._close();
        action.onPress();
      }}
    >
      {action.icon && <Icon name={action.icon} />}
      <Label>{action.label}</Label>
    </ActionRow>
  );

  _close = () => this.setState({ active: false });
}

export default Dropdown;

const BackButton = ({ onPress }) => (
  <BackLink onPress={onPress}>
    <Icon name="arrow-back-ios" />
  </BackLink>
);
