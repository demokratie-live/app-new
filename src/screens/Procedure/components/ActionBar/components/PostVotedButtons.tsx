import React from 'react';
import styled from 'styled-components/native';

const VerificationTouch = styled.View`
  height: 200px;
  width: 100%;
  background-color: tan;
`;

interface Props {}

export const PostVotedButtons: React.FC<Props> = ({}) => {
  return <VerificationTouch />;
};
