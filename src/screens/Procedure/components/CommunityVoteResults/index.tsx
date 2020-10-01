import Folding from 'components/Folding';
import { ConstituencyContext } from 'context/constituency';
import { useCommunityVoteResultsQuery } from 'generated/graphql';
import React, { useContext } from 'react';
import { Text } from 'react-native';

interface Props {
  procedureId: string;
}

export const CommuntiyVoteResults: React.FC<Props> = ({ procedureId }) => {
  const { constituency } = useContext(ConstituencyContext);
  const { data } = useCommunityVoteResultsQuery({
    variables: {
      procedureId,
      constituencies: constituency ? [constituency] : [],
    },
  });

  if (!data) {
    return null;
  }
  return (
    <Folding title="Community-Ergebnisse" opened>
      <Text>{JSON.stringify(data, null, 2)}</Text>
    </Folding>
  );
};
