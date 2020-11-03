import SvgLock from 'assets/svgs/icons/Lock';
import { LocalVotesContext } from 'context/LocalVotes';
import React, { useContext } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import ActionButton from './VoteButtons/components/ActionButton';
import VoteButton from './VoteButtons/VoteButton';

const Container = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding-top: ${({ theme }) => theme.paddings.outer};
`;

const VoteButtonWrapper = styled.View`
  align-items: center;
`;

const VoteButtonLabel = styled.Text`
  padding-top: ${({ theme }) => theme.paddings.outer};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.secondaryText};
`;

const LockIconWrapper = styled.View`
  position: absolute;
  top: -3px;
  right: -3px;
  background-color: rgba(255, 255, 255, 0.9);
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  border-width: 1px;
  border-style: dashed;
  border-color: rgba(0, 0, 0, 0.3);
`;

interface Props {
  procedureId: string;
}

export const PostVotedButtons: React.FC<Props> = ({ procedureId }) => {
  const { getLocalVoteSelection } = useContext(LocalVotesContext);
  const localVoteSelection = getLocalVoteSelection(procedureId);
  console.log({ localVoteSelection });
  let voteButtonLabel = 'Abgestimmt';
  switch (localVoteSelection) {
    case 'YES':
      voteButtonLabel = 'Zugestimmt';
      break;
    case 'ABSTINATION':
      voteButtonLabel = 'Enthalten';
      break;
    case 'NO':
      voteButtonLabel = 'Abgelehnt';
      break;
    default:
      voteButtonLabel = 'Abgestimmt';
      break;
  }

  const showUnknownVoteNotification = () => {
    Alert.alert(
      'Deine Stimme ist lokal verlorengegangen',
      'Für weitere Informationen schaue bitte ins FAQ',
    );
    // TODO link to FAQ
  };

  return (
    <Container>
      <VoteButtonWrapper>
        {localVoteSelection ? (
          <>
            <VoteButton selection={localVoteSelection} />

            <LockIconWrapper>
              <SvgLock width={18} height={18} color="#bbb" />
            </LockIconWrapper>
          </>
        ) : (
          <>
            <ActionButton
              selection="UNKNOWN"
              onPress={showUnknownVoteNotification}
            />
            <LockIconWrapper>
              <SvgLock width={18} height={18} color="#bbb" />
            </LockIconWrapper>
          </>
        )}
        <VoteButtonLabel>{voteButtonLabel}</VoteButtonLabel>
      </VoteButtonWrapper>
      <ActionButton selection="NOTIFY" onPress={showUnknownVoteNotification} />
      <ActionButton selection="SHARE" onPress={showUnknownVoteNotification} />
    </Container>
  );
};
