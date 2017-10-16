/* eslint-disable react/jsx-sort-props */

/**
 * @flow
 */

import React from 'react';
import { View } from 'bappo-components';
import {
  storiesOf,
} from '../../ui-explorer';
import GithubUsers from './examples/GithubUsers';
import Multiselect from './examples/Multiselect';
import States from './examples/States';

const SelectScreen = () => (
  <View style={{ overflow: 'visible' }}>
    <States />
    <Multiselect />
    <GithubUsers />
  </View>
);

storiesOf('Components', module).add('Select', SelectScreen);
