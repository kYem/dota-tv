import React from 'react'
import LiveValue from './LiveValue'
import './PlayerRow.scss'
import { Player } from '../../models/LiveMatchData';

interface PlayerRowProps extends Player {
  team_tag?: string;
}

class PlayerRow extends React.Component<PlayerRowProps> {

  static defaultProps = {
    kill_count: 0,
    death_count: 0,
    assists_count: 0,
    denies_count: 0,
    lh_count: 0,
    gold: 0,
    level: 0,
    x: 0,
    y: 0
  }

  render() {
    const {
      lh_count,
      team_tag,
      hero,
      kill_count,
      account_id,
      name,
      denies_count,
      death_count,
      level,
      assists_count,
      gold,
    } = this.props;

    return (
      <tr className='player-row'>
        <td className='player-name'>
          <img src={hero?.image} alt={hero?.name} className='rounded image hero-image' />
          <span className='ml-1'>
            {team_tag}
            <a
              href={`https://www.dotabuff.com/players/${account_id}`}
              target='_blank'
              rel="noopener noreferrer"
            > {name}</a>
          </span>
        </td>
        <td>{level}</td>
        <td>
          <LiveValue value={kill_count} />/<LiveValue value={death_count} positiveClass={'down'} negativeClass={'up'} />/
          <LiveValue value={assists_count} />
        </td>
        <td><LiveValue value={lh_count} />/{denies_count}</td>
        <td><LiveValue includeSymbol={true} highlightClass={''} value={gold} /></td>
      </tr>
    )
  }
}

export default PlayerRow
