import React from 'react';
import styled from 'styled-components/native';
import {
  ListItemFragmentDoc,
  ListItemFragment,
  VoteIndexFragmentDoc,
} from 'generated/graphql';
import { VotesIndex } from 'components/ListItem/components/VoteIndex';
import { filter } from 'graphql-anywhere';

const Container = styled.View`
  flex-direction: row;
`;

const TextContainer = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const Title = styled.Text`
  font-size: 17px;
  color: ${({ theme }) => theme.colors.primaryText};
`;

const Subline = styled.Text`
  padding-top: 8px;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.secondaryText};
`;

const SideContainer = styled.View`
  align-items: flex-end;
  min-width: 50px;
  justify-content: space-between;
`;

interface Props extends ListItemFragment {
  isIntro?: boolean;
}

export const ListItem: React.FC<Props> = ({
  isIntro,
  title,
  sessionTOPHeading,
  voted,
  votes,
}) => {
  return (
    <Container>
      <TextContainer>
        <Title numberOfLines={isIntro ? undefined : 3}>{title}</Title>
        {!!sessionTOPHeading && (
          <Subline numberOfLines={isIntro ? undefined : 2}>
            {sessionTOPHeading}
          </Subline>
        )}
      </TextContainer>
      <SideContainer>
        <VotesIndex {...filter(VoteIndexFragmentDoc, { voted, votes })} />
      </SideContainer>
    </Container>
  );
};

export { ListItemFragmentDoc };
