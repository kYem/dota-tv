/// <reference types="react-scripts" />


interface TwitchPlayerEmbed extends HTMLDivElement {
  getPlayer: () => any
}

interface EmbedTwitchPlayer extends HTMLDivElement {
  new (targetClass: string, props: TwitchPlayerBaseProps): TwitchPlayerEmbed;
  AUTHENTICATE: string;
  VIDEO_PLAY: string;
  VIDEO_READY: string;
}

interface Window {
  Twitch: {
    Embed: EmbedTwitchPlayer
  };
}
