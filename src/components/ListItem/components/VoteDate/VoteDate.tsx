import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import m from 'moment';
import { VoteDateFragment } from 'generated/graphql';

interface Props extends VoteDateFragment {
  long?: boolean;
}

const DateText = styled.Text<Pick<Props, 'voteDate'> & { running: boolean }>`
  color: ${({ voteDate, running }) => {
    if (running) {
      return '#f5a623';
    } else if (new Date(voteDate) > new Date()) {
      return '#20a736';
    }
    return 'red';
  }};
  font-size: 12;
`;

const formatDate = ({ voteDate, voteEnd, long }: Props) => {
  if (voteDate) {
    // Laufende Abstimmung
    if (
      voteEnd &&
      new Date(voteDate) <= new Date() &&
      new Date(voteEnd) >= new Date()
    ) {
      if (long) {
        return 'Abstimmung läuft derzeit';
      }
      return 'läuft';
    }

    // Vergangene Abstimmung
    if (new Date(voteDate) <= new Date()) {
      return m(voteDate).format('DD.MM.YY');
    }

    const daysDate = m(voteDate).endOf('day');
    const days = Math.floor(m.duration(daysDate.diff(m())).asDays());

    if (days > 1) {
      if (long) {
        return `Abstimmung in ${days} Tagen`;
      }
      return `${days} Tage`;
    } else if (days === 1) {
      if (long) {
        return 'Abstimmung morgen';
      }
      return 'morgen';
    }

    const hours = Math.floor(
      m.duration(m(voteDate).diff(m())).asMinutes() / 60,
    );
    const minutes = `${Math.floor(
      ((m.duration(m(voteDate).diff(m())).asMinutes() / 60) % 1) * 60,
    )}`.padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  return null;
};

export const VoteDate: React.FC<Props> = ({ voteDate, voteEnd, long }) => {
  const [timeLeft, setTimeLeft] = useState(
    formatDate({ voteDate, voteEnd, long }),
  );

  useEffect(() => {
    // TODO check this interval function (should run only on feature procedures)
    if ((voteEnd && voteEnd > new Date()) || voteDate < new Date()) {
      const intervalId = setInterval(() => {
        if (intervalId) {
          setTimeLeft(formatDate({ voteDate, voteEnd, long }));
        }
      }, 10000);
      return () => {
        clearInterval(intervalId);
      };
    }
  });

  return (
    <DateText
      voteDate={voteDate}
      running={timeLeft === 'läuft' || timeLeft === 'Abstimmung läuft derzeit'}>
      {timeLeft}
    </DateText>
  );
};
