import React from 'react'

interface TwitchUser {
  _id: string;
  bio: string;
  created_at: string;
  display_name: string;
  logo: string;
  name: string;
  type?: string;
  updated_at?: string;
}

interface TwitchPlayerBaseProps {
  /** Custom class name to target */
  targetClass: string,
  /** Optional for VOD embeds; otherwise, required. Name of the chat room and channel to stream. */
  channel: string,
  /** ID of a VOD to play. */
  video?: string,
  /** Width of video embed including chat */
  width?:  string|number,
  /** Maximum width of the rendered element, in pixels. This can be expressed as a percentage, by passing a string like 100% */
  height?:  string|number,
  /** If true, the player can go full screen. Default: true. */
  allowfullscreen?: boolean,
  /** If true, the video starts playing automatically, without the user clicking play. The exception is mobile platforms, on which video cannot be played without user interaction. Default: true. */
  autoplay?: boolean,
  /** Specifies the type of chat to use. Valid values:
   * default: Default value, uses full-featured chat.
   * mobile: Uses a read-only version of chat, optimized for mobile devices.
   To omit chat, specify a value of video for the layout option. */
  chat?: 'default' | 'mobile',
  /** The VOD collection to play. If you use this, you also must specify an initial video in the VOD collection. All VODs are auto-played. Rechat is not supported */
  collection?: string,
  /** Determines the screen layout. Valid values:
   video-and-chat: Default if channel is provided. Shows both video and chat side-by-side. At narrow sizes, chat renders under the video player.
   * video: Default if channel is not provided. Shows only the video player (omits chat). */
  layout?: string,
  /** Specifies whether the initial state of the video is muted. Default: false. */
  muted?: boolean,
  /** If true, the embedded player plays inline for mobile iOS apps. Default: false. */
  playsinline?: boolean,
  /** The Twitch embed color theme to use. Valid values: light or dark. Default: light. */
  theme?: string,
  /** Time in the video where playback starts. Specifies hours, minutes, and seconds. Default: 0h0m0s (the start of the video). */
  time?: string,
  /** User has logged in callback */
  onUserLogin?: (user: TwitchUser) => void,
  /** The video started playing. This callback receives an object with a sessionId property. */
  onVideoPlay?: () => void,
  /** The video player is ready for API commands. This callback receives the player object. */
  onPlayerReady?: (player: any) => void,
}


interface TwitchPlayerProps extends TwitchPlayerBaseProps {
  targetClass: string,
  channel: string,
  width: string | number,
  height: string | number,
}

class TwitchPlayer extends React.PureComponent<TwitchPlayerProps> {

  static defaultProps = {
    targetClass: 'twitch-embed',
    width: '940',
    height: '480'
  };

  componentDidMount() {
    if (window.Twitch && window.Twitch.Embed) {
      const embed = new window.Twitch.Embed(this.props.targetClass, { ...this.props })
      this.addEventListeners(embed)
    } else {
      const script = document.createElement('script')
      script.setAttribute(
        'src',
        'https://embed.twitch.tv/embed/v1.js'
      )
      script.addEventListener('load', () => {
        const embed = new window.Twitch.Embed(this.props.targetClass, { ...this.props })
        this.addEventListeners(embed)
      })

      document.body.appendChild(script)
    }
  }

  addEventListeners(embed: TwitchPlayerEmbed) {
    /** Player ready for programmatic commands */
    embed.addEventListener(window.Twitch.Embed.VIDEO_READY, () => {
      const player = embed.getPlayer()

      if (this.props.onPlayerReady) {
        this.props.onPlayerReady(player)
      }
    })
  }

  render() {
    return (
      <div id={this.props.targetClass} />
    )
  }
}

export default TwitchPlayer
