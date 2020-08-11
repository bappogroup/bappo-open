import React from 'react';
import RN from 'react-native';

const Modal = (props) => {
  return <RN.Modal animationType="slide" {...props} />;
};

export default Modal;
