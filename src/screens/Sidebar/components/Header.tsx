import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { HeadLogo } from './HeadLogo';
import { ActivityIndicator } from 'react-native';
import { ConstituencyContext } from '../../../context/constituency';
import constituencies from '../../../assets/svgs/constituencies';

const Container = styled.TouchableOpacity`
  flex-direction: row;
  padding-top: 16px;
  padding-left: 16px;
  padding-bottom: 8px;
`;

const HeadTextWrapper = styled.View`
  justify-content: center;
`;

const HeadText = styled.Text`
  color: #fff;
  font-size: 17px;
  padding-left: 16px;
`;

interface Props {}

export const Header: React.FC<Props> = ({}) => {
  const onPress = () => {};
  const label: string = true ? 'label' : 'label-false';
  const { constituency } = useContext(ConstituencyContext);

  const getConstituency = (wk: string) => {
    const DynComp = constituencies(wk);
    return (
      <DynComp.default
        width={60}
        height={50}
        childProps={{ fill: '#fff', stroke: '#4494d344', strokeWidth: '2%' }}
      />
    );
  };
  return (
    <Container onPress={onPress}>
      {!constituency && label !== 'verbindet…' && <HeadLogo />}
      {!constituency && label === 'verbindet…' && (
        <ActivityIndicator size="large" />
      )}
      {!!constituency && getConstituency(constituency)}
      <HeadTextWrapper>
        <HeadText>{label}</HeadText>
        {!!constituency && <HeadText>Wahlkreis {constituency}</HeadText>}
      </HeadTextWrapper>
    </Container>
  );
};
