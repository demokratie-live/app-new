import { LocalVotesContext } from 'context/LocalVotes';
import React, { useContext } from 'react';
import { WomBundestagPieChart } from './PieChart';

export const WomBundestagHeader: React.FC = () => {
  const { localVotes } = useContext(LocalVotesContext);
  const localDecisions = localVotes.map(({ procedureId, selection }) => ({
    procedureId,
    selection,
  }));

  return <WomBundestagPieChart localVotes={localDecisions} />;
};
