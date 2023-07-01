import React, { useEffect } from 'react'
import './LiveMatch.scss'
import PlayerTable from './PlayerTable'
import { gameTime } from '../../actions/matchProcessing'
import LiveValue from './LiveValue'
import Progress from '../Progress'
import Minimap from '../Minimap/Minimap'
import MatchScore from './MatchScore'
import Advantage from '../chart/Advantage'
import { subscribeToLiveMatch } from '../../features/liveSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

interface LiveMatchProps {
  serverId: string
}

export const LiveMatch = ({ serverId }: LiveMatchProps) => {

  const dispatch = useAppDispatch();
  const { isLoading, data } = useAppSelector((state) => state.live)

  useEffect(() => {
    if (serverId) {
      dispatch(subscribeToLiveMatch(serverId))
    }
  }, [dispatch, serverId])

  if (isLoading || !serverId || !data) {
    return <Progress />
  }

  const {  match, teams, graph_data } = data;

  const [radiant, dire] = teams
  if (!radiant || !dire) {
    return <h1>Match have ended</h1>
  }
  const graphGold = graph_data.graph_gold
  const lastAdvantageTick = graphGold[graphGold.length - 1]
  const teamAdvantage =  <span className={'advantage-container'}>
    <img width={'24'} src={'/images/stacked-gold-coins-transparent.png'} alt={'gold'} />
    <LiveValue shouldResetStyle={false} value={Math.abs(lastAdvantageTick)} />
  </span>
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

      <Advantage data={graph_data.graph_gold} />

    </div>
  )
}
