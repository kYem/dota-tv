import React from 'react'
import PropTypes from 'prop-types'
import './MatchScore.scss'
import IconVersus from '../icons/IconVersus'
import IconRadiant from '../icons/IconRadiant'
import IconDire from '../icons/IconDire'

const propTypes = {
  team_name_radiant: PropTypes.string.isRequired,
  team_name_dire: PropTypes.string.isRequired,
  dire_score: PropTypes.number.isRequired,
  radiant_score: PropTypes.number.isRequired,
}

const MatchScore = props => (
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

MatchScore.propTypes = propTypes

export default MatchScore
