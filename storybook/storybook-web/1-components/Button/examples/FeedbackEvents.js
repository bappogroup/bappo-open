import React, { PureComponent } from 'react';
import { Button, Text, View } from 'bappo-components';
import styled from 'styled-components';

export default class ButtonFeedbackEvents extends PureComponent {
  state = { eventLog: [] };

  render() {
    return (
      <View>
        <View>
          <StyledButton
            onLongPress={this._createPressHandler('longPress')}
            onPress={this._createPressHandler('press')}
            onPressIn={this._createPressHandler('pressIn')}
            onPressOut={this._createPressHandler('pressOut')}
          >
            <TouchableText>Press Me</TouchableText>
          </StyledButton>
        </View>
        <EventLogBox>
          {this.state.eventLog.map((e, ii) => <Text key={ii}>{e}</Text>)}
        </EventLogBox>
      </View>
    );
  }

  _createPressHandler = (eventName) => {
    return () => {
      const limit = 6;
      this.setState((state) => {
        const eventLog = state.eventLog.slice(0, limit - 1);
        eventLog.unshift(eventName);
        return { eventLog };
      });
    };
  };
}

const StyledButton = styled(Button)`
  border: 1px solid black;
  border-radius: 8px;
  padding: 5px;
`;

const TouchableText = styled(Text)`
  color: #007AFF;
  text-align: center;
`;

const EventLogBox = styled(View)`
  padding: 10px;
  margin-top: 10px;
  height: 120px;
  border-width: 1px;
  border-color: #f0f0f0;
  background-color: #f9f9f9;
`;
