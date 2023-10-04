import React from 'react';
import { View } from 'react-native';

type Props = {
  height?: number;
  width?: number;
};

const Spacer = ({ height, width }: Props) => {
  return (
    <View testID={'spacer'} style={{ height, width }} />
  );
};

Spacer.defaultProps = {
  height: 0,
  width: 0,
};

export default Spacer;
