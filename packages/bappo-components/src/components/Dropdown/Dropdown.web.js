// @flow

import * as React from 'react';

import Icon from '../Icon';
// Note that this is not the Modal we export. It has a slide animation on native.
import Modal from './Modal';
import {
  ActionRow,
  BackLink,
  Label,
  WebContainer,
} from './StyledComponents.web.js';

type RequiredProps = {
  actions: any,
  icon: string,
};

type OptionalProps = {
  align: string,
  width: number,
  children: any,
  iconColor: string,
};

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
    const {
      actions,
      icon = 'more-vert',
      iconColor = 'black',
      align,
      children,
    } = this.props;
    const dims = this.el.getBoundingClientRect();
    const width = this.props.width || 300;

    let left = Math.max(dims.left, 5);
    let right = Math.max(window.innerWidth - (dims.left + dims.width), 5);
    const _align = align || (left < right * 2 ? 'left' : 'right');

    if (_align === 'left') {
      right = null;
      if (left + width > window.innerWidth) {
        // the left position cannot be too high, it should not push the dropdown over the edge of the screen
        left = window.innerWidth - (width + 5);
      }
    } else {
      left = null;
      if (right + width > window.innerWidth) {
        // the right position cannot be too high, it should not push the dropdown over the edge of the screen
        right = window.innerWidth - (width + 5);
      }
    }

    let top = dims.bottom + 3;
    const height = actions.length * 40;

    if (top + height + 10 > window.innerHeight) {
      top = window.innerHeight - height - 10;
    }

    const placement = {
      type: 'dropdown',
      top,
      height,
      width,
      align: _align,
      left,
      right,
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
          ref={(el) => {
            this.el = el;
          }}
        >
          {children || <Icon name={icon} color={iconColor} />}
        </div>
        {this.state.active ? (
          <Modal
            onRequestClose={this._close}
            placement={placement}
            visible
            hideHeader={true}
          >
            <BackButton onPress={this._close} />
            {actions.map(this._renderAction)}
          </Modal>
        ) : null}
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
