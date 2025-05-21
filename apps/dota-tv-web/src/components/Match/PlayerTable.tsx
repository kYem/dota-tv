import React, { useState } from 'react'
import './PlayerTable.scss'
import PlayerRow from './PlayerRow'
import { Player } from '../../models/LiveMatchData'

interface PlayerTableProps {
  players: Player[];
}

const PlayerTable = ({ players }: PlayerTableProps) => {
  const [sortBy, setSortBy] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('desc');
    }
  };

  const sortedPlayers = [...players].sort((a, b) => {
    if (!sortBy) return 0;

    let aValue: any = a[sortBy as keyof Player];
    let bValue: any = b[sortBy as keyof Player];

    // Handle undefined values
    if (aValue === undefined) aValue = 0;
    if (bValue === undefined) bValue = 0;

    // For numeric values
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }

    // For string values
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    }

    return 0;
  });

  const renderSortIcon = (column: string) => {
    if (sortBy !== column) return null;
    return (
      <span className="sort-icon">
        {sortDirection === 'asc' ? '▲' : '▼'}
      </span>
    );
  };

  return (
    <div className={'table-responsive mb-3'}>
      <table className="table player-match-table table-striped table-hover mb-0">
        <thead className="table-dark">
          <tr>
            <th onClick={() => handleSort('name')}>
              Player {renderSortIcon('name')}
            </th>
            <th onClick={() => handleSort('level')}>
              Level {renderSortIcon('level')}
            </th>
            <th onClick={() => handleSort('kill_count')}>
              K/D/A {renderSortIcon('kill_count')}
            </th>
            <th onClick={() => handleSort('lh_count')}>
              LH/DN {renderSortIcon('lh_count')}
            </th>
            <th onClick={() => handleSort('gold')}>
              Gold {renderSortIcon('gold')}
            </th>
            <th onClick={() => handleSort('net_worth')}>
              Net Worth {renderSortIcon('net_worth')}
            </th>
            <th>Abilities</th>
          </tr>
        </thead>
        <tbody>
          <tr />
        </tbody>
        <tbody>
          {sortedPlayers.map(player => (<PlayerRow key={player.account_id} {...player} />))}
        </tbody>
      </table>
    </div>
  )
}

export default PlayerTable
