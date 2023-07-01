import { Stream } from './Stream'
import { Hero } from './Hero';

export interface TopLiveGames {
  game_list: Match[]
}
export interface Match {
  server_steam_id:   string;
  lobby_id:          string;
  match_id:          string;
  team_logo_radiant: string;
  team_logo_dire:    string;
  activate_time:     number;
  deactivate_time:   number;
  league_id:         number;
  lobby_type:        number;
  game_time:         number;
  delay:             number;
  spectators:        number;
  game_mode:         number;
  average_mmr:       number;
  series_id:         number;
  team_name_radiant: string;
  team_name_dire:    string;
  team_id_radiant:   number;
  team_id_dire:      number;
  sort_score:        number;
  last_update_time:  number;
  radiant_lead:      number;
  radiant_score:     number;
  dire_score:        number;
  players:           PlayerWithStream[];
  building_state:    number;
}

export interface PlayerWithStream {
  account_id: number;
  hero_id: number;
  name: string;
  hero: Hero
  stream: Stream;
  seasonLeaderboardRank?: number;
  is_pro: boolean
}

