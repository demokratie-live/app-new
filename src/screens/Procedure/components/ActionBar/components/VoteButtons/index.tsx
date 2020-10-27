import React from 'react';
import styled from 'styled-components/native';
import VoteButton from './VoteButton';

const Container = styled.View`
  padding-vertical: ${({ theme }) => theme.paddings.outer};
  flex-direction: row;
  justify-content: space-around;
`;

const VoteButtonWrapper = styled.View`
  align-items: center;
`;

const VoteButtonLabel = styled.Text`
  padding-top: ${({ theme }) => theme.paddings.outer};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.secondaryText};
`;

interface Props {}

export const VoteButtons: React.FC<Props> = ({}) => {
  return (
    <Container>
      <VoteButtonWrapper>
        <VoteButton
          voted={false}
          selection="YES"
          voteSelection={'YES'}
          onPress={() => {
            // navigation.navigate('Voting', {
            //   selection: VoteSelection.YES,
            //   procedureId,
            //   procedureObjId,
            //   title,
            // });
          }}
        />
        <VoteButtonLabel>{true ? 'Zustimmen' : 'Zugestimmt'}</VoteButtonLabel>
      </VoteButtonWrapper>

      <VoteButtonWrapper>
        <VoteButton
          voted={false}
          selection="ABSTINATION"
          voteSelection={'ABSTINATION'}
          onPress={() => {
            // navigation.navigate('Voting', {
            //   selection: VoteSelection.YES,
            //   procedureId,
            //   procedureObjId,
            //   title,
            // });
          }}
        />
        <VoteButtonLabel>{true ? 'Zustimmen' : 'Zugestimmt'}</VoteButtonLabel>
      </VoteButtonWrapper>

      <VoteButtonWrapper>
        <VoteButton
          voted={false}
          selection="NO"
          voteSelection={'NO'}
          onPress={() => {
            // navigation.navigate('Voting', {
            //   selection: VoteSelection.YES,
            //   procedureId,
            //   procedureObjId,
            //   title,
            // });
          }}
        />
        <VoteButtonLabel>{true ? 'Zustimmen' : 'Zugestimmt'}</VoteButtonLabel>
      </VoteButtonWrapper>
    </Container>
  );
};
