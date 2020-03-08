import React from 'react'
import PropTypes from 'prop-types'
import LiveValue from './LiveValue'
import './PlayerRow.scss'

class PlayerRow extends React.Component {
  static propTypes = {
    account_id: PropTypes.number.isRequired,
    avatar: PropTypes.string,
    avatarfull: PropTypes.string,
    avatarmedium: PropTypes.string,
    hero_id: PropTypes.number.isRequired,
    hero_image: PropTypes.string.isRequired,
    hero_name: PropTypes.string.isRequired,
    name: PropTypes.string,
    personaname: PropTypes.string,
    team_tag: PropTypes.string,
    level: PropTypes.number,
    kill_count: PropTypes.number,
    death_count: PropTypes.number,
    assists_count: PropTypes.number,
    denies_count: PropTypes.number,
    lh_count: PropTypes.number,
    gold: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number
  }
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
    return (
      <tr className='player-row'>
        <td className='player-name'>
          <img src={this.props.hero_image} alt={this.props.hero_name} className='rounded image hero-image' />
          <span className='ml-1'>
            {this.props.team_tag}
            <a
              href={`https://www.dotabuff.com/players/${this.props.account_id}`}
              target='_blank'
              rel="noopener noreferrer"
            > {this.props.name}</a>
          </span>
        </td>
        <td>{this.props.level}</td>
        <td>
          <LiveValue value={this.props.kill_count} />/<LiveValue value={this.props.death_count} positiveClass={'down'} negativeClass={'up'} />/
          <LiveValue value={this.props.assists_count} />
        </td>
        <td><LiveValue value={this.props.lh_count} />/{this.props.denies_count}</td>
        <td><LiveValue includeSymbol={true} highlightClass={''} value={this.props.gold} /></td>
      </tr>
    )
  }
}

export default PlayerRow
