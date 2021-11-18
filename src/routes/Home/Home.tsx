import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loadLiveMatch, setLiveMatchId } from './homeSlice'
import './HomeView.scss'
import TopLiveMatches from '../../components/Match/TopLiveMatches'
import { LiveMatch } from '../../components/Match/LiveMatch'
import Progress from '../../components/Progress'


export const Home = () => {

  const dispatch = useAppDispatch();
  const { matches, serverId } = useAppSelector((state) => state.home)

  useEffect(() => {
    dispatch(loadLiveMatch())
    const interval = setInterval(() => dispatch(loadLiveMatch()), 6000)
    return () => clearInterval(interval);
  }, [dispatch])

  return (
    <div className={'row'}>
      <div className={'col-md-4 col-lg-3'}>
        {matches.length === 0 ? <Progress /> : matches.map(match => (
          <TopLiveMatches
            setLiveMatchId={(id) => dispatch(setLiveMatchId(id))}
            active={serverId === match.server_steam_id ? 'active' : 'inactive'}
            key={match.server_steam_id}
            {...match}
          />))
        }
      </div>
      <div className={'col-md-8 col-lg-9'}>
        <LiveMatch serverId={serverId} />
      </div>
    </div>
  )
}
