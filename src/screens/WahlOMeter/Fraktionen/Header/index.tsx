import { LocalVotesContext } from 'context/LocalVotes';
import React, { useContext } from 'react';
import { WomFractionChart } from './WomFractionChart';

export const WomPartyHeader: React.FC = () => {
  const { localVotes } = useContext(LocalVotesContext);
  const localDecisions = localVotes.map(({ procedureId, selection }) => ({
    procedureId,
    selection,
  }));

  return <WomFractionChart localVotes={localDecisions} />;
};
