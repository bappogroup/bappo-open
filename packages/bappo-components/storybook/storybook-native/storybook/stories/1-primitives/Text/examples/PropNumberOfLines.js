import { Text, View } from 'bappo-components';
import React from 'react';

const TextNumberOfLinesExample = () => (
  <View style={{ maxWidth: 400 }}>
    <Text style={{ fontWeight: 'bold' }}>numberOfLines=1</Text>
    <Text numberOfLines={1} style={{ marginBottom: 20 }}>
      Maximum of one line
    </Text>

    <Text style={{ fontWeight: 'bold' }}>numberOfLines=1</Text>
    <Text numberOfLines={1} style={{ marginBottom: 20 }}>
      Maximum of two line without an ellipsis, no matter how much I write here.
      If I keep writing, it will just truncate after one line and end with three
      dots.To be, or not to be: that is the question: Whether ’tis nobler in the
      mind to suffer The slings and arrows of outrageous fortune, Or to take
      arms against a sea of troubles, And by opposing end them? To die: to
      sleep; No more; and by a sleep to say we end The heart-ache and the
      thousand natural shocks That flesh is heir to, ’tis a consummation
      Devoutly to be wish’d.
    </Text>

    <Text style={{ fontWeight: 'bold' }}>numberOfLines=2</Text>
    <Text numberOfLines={2} style={{ marginBottom: 20 }}>
      Maximum of two line without an ellipsis,
      <Text numberOfLines={2}>
        no matter how much I write here. If I keep writing, it will just
        truncate after one line and end with three dots.To be, or not to be:
        that is the question: Whether ’tis nobler in the mind to suffer The
        slings and arrows of outrageous fortune, Or to take arms against a sea
        of troubles, And by opposing end them? To die: to sleep; No more; and by
        a sleep to say we end The heart-ache and the thousand natural shocks
        That flesh is heir to, ’tis a consummation Devoutly to be wish’d.
      </Text>
    </Text>

    <Text style={{ fontWeight: 'bold' }}>numberOfLines is not specified</Text>
    <Text style={{ marginBottom: 20 }}>
      No maximum lines specified, no matter how much I write here. If I keep
      writing, it will just keep going and going.To be, or not to be: that is
      the question: Whether ’tis nobler in the mind to suffer The slings and
      arrows of outrageous fortune, Or to take arms against a sea of troubles,
      And by opposing end them? To die: to sleep; No more; and by a sleep to say
      we end The heart-ache and the thousand natural shocks That flesh is heir
      to, ’tis a consummation Devoutly to be wish’d.
    </Text>
  </View>
);

export default TextNumberOfLinesExample;
