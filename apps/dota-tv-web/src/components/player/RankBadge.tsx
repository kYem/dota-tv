import React from 'react'
import './RankBadge.scss'

const iconTopUrl = '/images/leaderboard/immortal-badge-top-10.png'
const iconUrl = '/images/leaderboard/immortal-badge.png'

export default function RankBadge(rank: number) {
  const imgSrc = rank > 10 ? iconUrl : iconTopUrl
  return (
    <div className='rank-tier-wrapper' title={`Rank #${rank}`}>
      <div className='rank-tier-images'>
        <img alt={`Rank ${rank}`} className='rank-tier-base' src={imgSrc} />
        <div className='leaderboard-rank-value'>{rank}</div>
      </div>
    </div>
  )
}

