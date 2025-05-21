export interface PlayerItem {
  id: number;
  name: string;
  image: string;
  charges?: number;
  cooldown?: number;
}

export interface UltimateState {
  cooldown: number;
  level: number;
  ready: boolean;
}

export interface PlayerAbility {
  id: number;
  name: string;
  image: string;
  level: number;
  cooldown?: number;
  is_ultimate?: boolean;
}

