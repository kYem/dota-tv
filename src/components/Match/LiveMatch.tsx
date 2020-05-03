import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './LiveMatch.scss'
import PlayerTable from './PlayerTable'
import { gameTime } from '../../actions/matchProcessing'
import LiveValue from './LiveValue'
import Progress from '../Progress'
import Minimap from '../Minimap/Minimap'
import MatchScore from './MatchScore'
import Advantage from '../chart/Advantage'
import { RootState } from '../../store/rootReducer';
import { subscribeToLiveMatch } from '../../features/live/liveSlice';

interface LiveMatchProps {
 server_steam_id: string
}

export const LiveMatch = ({ server_steam_id }: LiveMatchProps) => {

  const dispatch = useDispatch();
  const { isLoading, data } = useSelector((state: RootState) => state.live)

  useEffect(() => {
    if (server_steam_id) {
      dispatch(subscribeToLiveMatch(server_steam_id))
    }
  }, [dispatch, server_steam_id])

  if (isLoading || !server_steam_id || !data) {
    return <Progress />
  }

  const {  match, teams, graph_data } = data;

  const [radiant, dire] = teams
  if (!radiant || !dire) {
    return <h1>Match have ended</h1>
  }
  const graphGold = graph_data.graph_gold
  const lastAdvantageTick = graphGold[graphGold.length - 1]
  const teamAdvantage = <LiveValue shouldResetStyle={false} value={Math.abs(lastAdvantageTick)} />
  return (
    <div className='liveMatch'>
      <header>
        <div className='title d-flex justify-content-center align-items-center'>
            <span className='advantage-score'>
              { lastAdvantageTick > 0 ? teamAdvantage : ''}
            </span>
          <div className='match-score-container'>
            {MatchScore({
              team_name_radiant: radiant.team_name || 'Radiant',
              radiant_score: radiant.score,
              team_name_dire: dire.team_name || 'Dire',
              dire_score: dire.score,
            })}
          </div>
          <span className='advantage-score'>
              {lastAdvantageTick < 0 ? teamAdvantage : ''}
            </span>
        </div>

        <div className='game-info-row justify-content-center'>
          <span className='material-icons md-18 mr-2'>timelapse</span>
          <span>{gameTime(match.game_time)}</span>
        </div>
      </header>
      <hr />
      <h6>Radiant</h6>
      <PlayerTable players={radiant.players} />
      <h6>Dire</h6>
      <PlayerTable players={dire.players} />
      <br />
      <Minimap radiant={radiant.players} dire={dire.players} />

      <Advantage data={graph_data.graph_gold.map(d => ({ name: 'a', value : d }))} />

    </div>
  )
}
