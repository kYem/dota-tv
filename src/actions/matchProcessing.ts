import { Match, PlayerWithStream } from '../models/TopLiveGames';
import { ProPlayer } from '../models/Player';
const proPlayers = require('../data/pro-players.json')

export function mapAccountToPlayer(playerObject: PlayerWithStream) {
  return Object.assign(
    playerObject,
    proPlayers.find((player: ProPlayer) => player.account_id === playerObject.account_id),
    {
      hero: {
        ...playerObject.hero,
        image: playerObject.hero.image || '/images/heroes/unknown-hero.jpeg'
      }
    }
  )
}

export function matchToPlayers(match: Match) {
  if (!match || !match.players) {
    return match
  }
  match.players.map(mapAccountToPlayer)
  return match
}

export function getKnownPlayers(players: PlayerWithStream[]) {
  if (!players) {
    return []
  }
  return players.filter(player => player.is_pro || player.stream?.id)
}

export function gameTime(time: number) {
  const minutes = Math.floor(time / 60)
  const seconds = time - (minutes * 60)
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds
  const formattedMinutes = minutes < 10 && minutes >= 0 ? `0${minutes}` : minutes

  return `${formattedMinutes}:${formattedSeconds}`
}
