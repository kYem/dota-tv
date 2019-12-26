import React from 'react'

const heroIconSize = 32
const mapCenter = 200 - (heroIconSize / 2)
export const mapScale = 400

export default (player, k) => <i
  key={k}
  className={`d2mh hero-${player.hero_id}`}
  style={{
    position: 'absolute',
    transition: '0.8s',
    left: `${(player.x * mapScale) + mapCenter}px`,
    bottom: `${(player.y * mapScale) + mapCenter}px`
  }}
/>

