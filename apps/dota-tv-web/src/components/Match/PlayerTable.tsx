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
    if (aValue === undefined) aValue = typeof b[sortBy as keyof Player] === 'string' ? '' : 0;
    if (bValue === undefined) bValue = typeof a[sortBy as keyof Player] === 'string' ? '' : 0;

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
      <span className="sort-icon" aria-hidden="true">
        {sortDirection === 'asc' ? '▲' : '▼'}
      </span>
    );
  };

  const getAriaSort = (column: string) => {
    if (sortBy !== column) return 'none';
    return sortDirection === 'asc' ? 'ascending' : 'descending';
  };

  return (
    <div className={'table-responsive mb-3'}>
      <table className="table player-match-table table-striped table-hover mb-0">
        <thead className="table-dark">
          <tr>
            <th 
              onClick={() => handleSort('name')}
              role="button"
              aria-sort={getAriaSort('name')}
              tabIndex={0}
            >
              Player {renderSortIcon('name')}
            </th>
            <th 
              onClick={() => handleSort('level')}
              role="button"
              aria-sort={getAriaSort('level')}
              tabIndex={0}
            >
              Level {renderSortIcon('level')}
            </th>
            <th 
              onClick={() => handleSort('kill_count')}
              role="button"
              aria-sort={getAriaSort('kill_count')}
              tabIndex={0}
            >
              K/D/A {renderSortIcon('kill_count')}
            </th>
            <th 
              onClick={() => handleSort('lh_count')}
              role="button"
              aria-sort={getAriaSort('lh_count')}
              tabIndex={0}
            >
              LH/DN {renderSortIcon('lh_count')}
            </th>
            <th 
              onClick={() => handleSort('gold')}
              role="button"
              aria-sort={getAriaSort('gold')}
              tabIndex={0}
            >
              Gold {renderSortIcon('gold')}
            </th>
            <th 
              onClick={() => handleSort('net_worth')}
              role="button"
              aria-sort={getAriaSort('net_worth')}
              tabIndex={0}
            >
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
