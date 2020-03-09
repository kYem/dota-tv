export interface GameList {
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
  players:           Player[];
  building_state:    number;
}

export interface Player {
  account_id:             number;
  hero_id:                number;
  stream:                 Stream;
  seasonLeaderboardRank?: number;
}

export interface Stream {
  id:            string;
  user_id:       string;
  user_name:     string;
  game_id:       string;
  community_ids: null;
  type:          string;
  title:         string;
  viewer_count:  number;
  started_at:    Date;
  language:      string;
  thumbnail_url: string;
}
