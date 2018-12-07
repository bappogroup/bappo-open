import React from 'react';
import AppText from '../AppText';

const WebLink = ({ href, text }) => (
  <a href={href} target="_blank" style={{ marginTop: 16, marginBottom: 16 }}>
    <AppText>{text}</AppText>
  </a>
);

export default WebLink;
