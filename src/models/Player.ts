import { PlayerWithStream } from './TopLiveGames';


export interface ProPlayer {
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

export interface ExpandedPlayer extends ProPlayer, PlayerWithStream{
}
