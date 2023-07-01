import { Hero } from './Hero';

export interface LiveMatchData {
  match:       Match;
  teams:       Team[];
  buildings:   Building[];
  graph_data:  GraphData;
  delta_frame: boolean;
}

export interface Building {
  team:      number;
  heading:   number;
  type:      number;
  lane:      number;
  tier:      number;
  x:         number;
  y:         number;
  destroyed: boolean;
}

export interface GraphData {
  graph_gold: number[];
}

export interface Match {
  match_id:        string;
  server_steam_id: number;
  timestamp:       number;
  game_time:       number;
  game_mode:       number;
  league_id:       number;
  league_node_id:  number;
  game_state:      number;
}

export interface Team {
  team_logo:   string;
  team_number: number;
  team_id:     number;
  team_name:   string;
  team_tag:    string;
  score:       number;
  net_worth:   number;
  players:     Player[];
}

export interface Player {
  account_id:    number;
  player_id:     number;
  hero_id:       number;
  name:          string;
  team:          number;
  level:         number;
  kill_count:    number;
  death_count:   number;
  assists_count: number;
  denies_count:  number;
  lh_count:      number;
  gold:          number;
  x:             number;
  y:             number;
  net_worth:     number;
  hero: Hero
}
