import React from 'react';
import AppText from '../AppText';

const WebLink = ({ href, text }) => (
  <a href={href}>
    <AppText>{text}</AppText>
  </a>
);

export default WebLink;
