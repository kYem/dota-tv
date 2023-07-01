import React from 'react'
import './PlayerTable.scss'
import PlayerRow from './PlayerRow'
import { Player } from '../../models/LiveMatchData'

const PlayerTable = ({ players }: { players: Player[] }) => (

  <div className={'table-responsive mb-3'}>
    <table className="table player-match-table table-striped table-hover mb-0">
      <thead className="table-dark">
      <tr>
        <th>Player</th>
        <th>Level</th>
        <th>K/D/A</th>
        <th>LH/DN</th>
        <th>Gold</th>
      </tr>
      </thead>
      <tbody>
      <tr />
      </tbody>
      <tbody>
      {players.map(player => (<PlayerRow key={player.account_id} {...player} />))}
      </tbody>
    </table>
  </div>
)

export default PlayerTable
