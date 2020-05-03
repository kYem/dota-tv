import React from 'react'
import PropTypes from 'prop-types'
import './TopLiveMatches.scss'
import { getKnownPlayers } from '../../actions/matchProcessing'
import MatchScore from './MatchScore'
import IconTwitchGlitch from '../icons/IconTwitchGlitch'
import RankBadge from '../player/RankBadge'

export default class TopLiveMatches extends React.PureComponent {
  static propTypes = {
    team_name_radiant: PropTypes.string,
    team_name_dire: PropTypes.string,
    average_mmr: PropTypes.number.isRequired,
    building_state: PropTypes.number.isRequired,
    deactivate_time: PropTypes.number.isRequired,
    dire_score: PropTypes.number.isRequired,
    game_time: PropTypes.number.isRequired,
    last_update_time: PropTypes.number.isRequired,
    players: PropTypes.arrayOf(PropTypes.shape({
      account_id: PropTypes.number.isRequired,
      hero_id: PropTypes.number.isRequired,
    }).isRequired),
    radiant_lead: PropTypes.number.isRequired,
    radiant_score: PropTypes.number.isRequired,
    server_steam_id: PropTypes.string.isRequired,
    spectators: PropTypes.number.isRequired,
    active: PropTypes.string.isRequired
  }

  static defaultProps = {
    active: '',
    game_time: 0,
    updated: 0,
    team_name_radiant: 'Radiant',
    team_name_dire: 'Dire',
    average_mmr: 0,
    players: []
  };

  changeLiveMatch = (e) => {
    e.preventDefault()
    this.props.setLiveMatchId(this.props.server_steam_id)
  }

  renderStreamInfo(player) {

    const { id, viewer_count, user_name } = player.stream

    if (!id) {
      return ''
    }

    return (
      <div className='stream-info'>
        <div className=''>
          <IconTwitchGlitch />
        </div>
        <div className='ml-1' title={user_name}>{viewer_count}</div>
      </div>
    )
  }

  render() {
    const knownPlayers = getKnownPlayers(this.props.players)
    return (
      <div className='top-match col-12 shadow-sm p-2'>
        <h5 className={'header'}  onClick={this.changeLiveMatch}>
            {MatchScore(this.props)}
        </h5>

        <div className='game-info'>
          <div className='game-info-row'>
            <span className='material-icons md-18 mr-2'>show_chart</span>
            <span>{this.props.average_mmr || ''}</span>
          </div>
          <div className='game-info-row'>
            <i className='material-icons text-danger md-18 mr-2'>remove_red_eye</i>
            <span>
              {this.props.spectators}
            </span>
          </div>
        </div>

        <div className='live-match'>
          {knownPlayers.map(player => (
            <div className='player align-items-center d-flex mt-2 mb-2' key={player.account_id}>
              <img
                src={player.hero?.image}
                alt={player.hero?.name}
                className='rounded hero-image'
              />
              <div className='d-flex flex-grow-1 align-items-center ellipsis'>
                <a
                  href={`https://www.dotabuff.com/players/${player.account_id}`}
                  target='_blank'
                  rel="noopener noreferrer"
                  className='ml-1 ellipsis flex-grow-1'
                >
                <span>
                  {player.name || player.personaname || (player.stream && player.stream.user_name)}
                </span>
                </a>
                <div>{this.renderStreamInfo(player)}</div>
                {player.seasonLeaderboardRank &&
                <span className='rank'>
                  {RankBadge(player.seasonLeaderboardRank)}
                </span>
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

