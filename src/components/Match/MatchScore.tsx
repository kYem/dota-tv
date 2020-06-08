import React from 'react'
import './MatchScore.scss'
import IconVersus from '../icons/IconVersus'
import IconRadiant from '../icons/IconRadiant'
import IconDire from '../icons/IconDire'

interface MatchScore {
  team_name_radiant: string,
  team_name_dire: string,
  dire_score: number,
  radiant_score: number,
}

const MatchScore = (props: MatchScore) => (
  <div className='match-header'>
    <div className='score radiant'>
      <div className='score-icon'>
        {<IconRadiant height={'24'} />}
        {props.radiant_score || 0}
      </div>
      <div className='team-name ellipsis'>
        {props.team_name_radiant}
      </div>
    </div>

    <div className={'versus-container'}>
      <IconVersus height={'36'} />
    </div>

    <div className='score dire'>
      <div className='score-icon'>
        {props.dire_score || 0}
        {<IconDire height={'24'} />}
      </div>
      <div className='team-name ellipsis'>
        {props.team_name_dire}
      </div>
    </div>
  </div>
)

export default MatchScore
