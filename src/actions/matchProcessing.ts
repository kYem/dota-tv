import { PlayerWithStream } from '../models/TopLiveGames';

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
