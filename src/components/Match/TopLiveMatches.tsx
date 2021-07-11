import React from 'react'
import './TopLiveMatches.scss'
import { getKnownPlayers } from '../../actions/matchProcessing'
import MatchScore from './MatchScore'
import IconTwitchGlitch from '../icons/IconTwitchGlitch'
import RankBadge from '../player/RankBadge'
import { Match, PlayerWithStream } from '../../models/TopLiveGames';
import { ExpandedPlayer } from '../../models/Player';

interface TopLiveMatchesProps extends Match {
  active: string;
  setLiveMatchId: (id: string) => void;
}

export default class TopLiveMatches extends React.PureComponent<TopLiveMatchesProps> {

  static defaultProps = {
    active: '',
    game_time: 0,
    updated: 0,
    team_name_radiant: 'Radiant',
    team_name_dire: 'Dire',
    average_mmr: 0,
    players: []
  };

  changeLiveMatch = (e: React.MouseEvent) => {
    e.preventDefault()
    this.props.setLiveMatchId(this.props.server_steam_id)
  }

  renderStreamInfo(player: PlayerWithStream) {

    const { id, viewer_count, user_name } = player.stream

    if (!id) {
      return ''
    }

    return (
      <div className='stream-info'>
        <div className=''>
          <IconTwitchGlitch />
        </div>
        <div className='mx-1' title={user_name}>{viewer_count}</div>
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
                  className='mx-2 ellipsis flex-grow-1'
                >
                <span>
                  {this.getPlayerName(player)}
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

  private getPlayerName(player: ExpandedPlayer|PlayerWithStream) {
    if ("name" in player && player.name) {
      return player.name
    }

    if ("personaname" in player && player.personaname) {
      return player.personaname
    }

    return player.stream && player.stream.user_name;
  }
}

