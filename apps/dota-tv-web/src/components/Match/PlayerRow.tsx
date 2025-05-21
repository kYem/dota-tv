import React from 'react'
import LiveValue from './LiveValue'
import './PlayerRow.scss'
import { Player } from '../../models/LiveMatchData';
import { PlayerItem, PlayerAbility } from '../../models/PlayerItem';

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
    y: 0,
    is_alive: true,
    respawn_timer: 0,
    has_buyback: true,
    items: [],
    abilities: []
  }

  renderPlayerStatus() {
    const { is_alive, respawn_timer, has_buyback } = this.props;
    
    if (is_alive) {
      return <span className="player-status alive">Alive</span>;
    }
    
    return (
      <span className="player-status dead">
        Dead ({respawn_timer}s)
        {has_buyback && <span className="buyback-status">BB</span>}
      </span>
    );
  }

  renderItems() {
    const { items } = this.props;
    
    if (!items || items.length === 0) {
      return <div className="player-items empty">No items</div>;
    }
    
    return (
      <div className="player-items">
        {items.map((item: PlayerItem, index: number) => (
          <div key={`${item.id}-${index}`} className="player-item" title={item.name}>
            <img src={item.image} alt={item.name} className="item-image" />
            {item.charges && item.charges > 0 && <span className="item-charges">{item.charges}</span>}
            {item.cooldown && item.cooldown > 0 && <span className="item-cooldown">{item.cooldown}</span>}
          </div>
        ))}
      </div>
    );
  }

  renderAbilities() {
    const { abilities, ultimate_state } = this.props;
    
    if (!abilities || abilities.length === 0) {
      return null;
    }
    
    return (
      <div className="player-abilities">
        {abilities.map((ability: PlayerAbility) => (
          <div 
            key={ability.id} 
            className={`player-ability ${ability.cooldown ? 'on-cooldown' : ''} ${ability.is_ultimate ? 'ultimate' : ''}`}
            title={ability.name}
          >
            <img src={ability.image} alt={ability.name} className="ability-image" />
            {ability.level > 0 && <span className="ability-level">{ability.level}</span>}
            {ability.cooldown && ability.cooldown > 0 && <span className="ability-cooldown">{ability.cooldown}</span>}
          </div>
        ))}
        {ultimate_state && (
          <div className={`ultimate-indicator ${ultimate_state.ready ? 'ready' : 'not-ready'}`}>
            {ultimate_state.ready ? 'ULT READY' : `ULT CD: ${ultimate_state.cooldown}s`}
          </div>
        )}
      </div>
    );
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
      net_worth,
      is_alive
    } = this.props;

    return (
      <tr className={`player-row ${!is_alive ? 'player-dead' : ''}`}>
        <td className='player-name'>
          <img src={hero?.image} alt={hero?.name} className='rounded image hero-image' />
          <span className='mx-1'>
            {team_tag}
            <a
              href={`https://www.dotabuff.com/players/${account_id}`}
              target='_blank'
              rel="noopener noreferrer"
            > {name}</a>
          </span>
          {this.renderPlayerStatus()}
        </td>
        <td>{level}</td>
        <td>
          <LiveValue value={kill_count} />/<LiveValue value={death_count} positiveClass={'down'} negativeClass={'up'} />/
          <LiveValue value={assists_count} />
        </td>
        <td><LiveValue value={lh_count} />/{denies_count}</td>
        <td><LiveValue includeSymbol={true} highlightClass={''} value={gold} /></td>
        <td><LiveValue includeSymbol={true} highlightClass={''} value={net_worth || 0} /></td>
        <td className="player-items-cell">
          {this.renderItems()}
        </td>
        <td className="player-abilities-cell">
          {this.renderAbilities()}
        </td>
      </tr>
    )
  }
}

export default PlayerRow
