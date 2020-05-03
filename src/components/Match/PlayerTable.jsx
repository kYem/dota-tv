import React from 'react'
import './PlayerTable.scss'
import PlayerRow from './PlayerRow'

const PlayerTable = ({ players }) => (

  <table className='ui table player-match-table table-striped'>
    <thead className='thead-dark'>
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
)

export default PlayerTable
