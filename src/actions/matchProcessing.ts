import { Match, Player } from '../models/TopLiveGames';
const proPlayers = require('../data/pro-players.json')

interface ProPlayer {
  account_id: number;
  steamid: string;
  avatar: string;
  avatarmedium: string;
  avatarfull: string;
  profileurl: string;
  personaname: string;
  last_login: null;
  full_history_time: string;
  cheese: number;
  fh_unavailable: boolean;
  loccountrycode: string;
  last_match_time: string;
  name: string;
  country_code: string;
  fantasy_role: number;
  team_id: number;
  team_name: string;
  team_tag: string;
  is_locked: boolean;
  is_pro: boolean;
  locked_until: null;
}

interface ExpandedPlayer extends ProPlayer, Player{
}

export function mapAccountToPlayer(playerObject: Player) {
  return Object.assign(
    playerObject,
    proPlayers.find((player: ProPlayer) => player.account_id === playerObject.account_id),
  )
}

export function matchToPlayers(match: Match) {
  if (!match || !match.players) {
    return match
  }
  match.players.map(mapAccountToPlayer)
  return match
}

export function getKnownPlayers(players: (ExpandedPlayer|Player)[]) {
  if (!players) {
    return []
  }
  return players.filter(player => {
    return ('is_pro' in player && player.is_pro)
      || (player.stream && player.stream.id);
  })
}

export function gameTime(time: number) {
  const minutes = Math.floor(time / 60)
  const seconds = time - (minutes * 60)
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds
  const formattedMinutes = minutes < 10 && minutes >= 0 ? `0${minutes}` : minutes

  return `${formattedMinutes}:${formattedSeconds}`
}
