import React from 'react';
import { ScrollView } from 'bappo-components';

export default (renderStory) => {
  return <ScrollView>{renderStory()}</ScrollView>;
};
