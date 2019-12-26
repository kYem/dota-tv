import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './StreamView.scss'
import { getLiveStreams } from '../../../actions/api'
import Loader from '../../../components/loader/Loader'
import TwitchPlayer from '../../../components/twitch/TwitchPlayer'

class StreamView extends React.Component {

  static propTypes = {
    getLiveStreams: PropTypes.func.isRequired,
    streams: PropTypes.arrayOf(PropTypes.shape({
      game_id: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      language: PropTypes.string.isRequired,
      started_at: PropTypes.string.isRequired,
      thumbnail_url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      user_id: PropTypes.string.isRequired,
      user_name: PropTypes.string.isRequired,
      viewer_count: PropTypes.number.isRequired
    })).isRequired,
    loaded: PropTypes.bool,
  }

  static defaultProps = {
    streams: [],
    loaded: false,
  }

  state = {
    active: []
  }

  constructor(props) {
    super(props)
    this.toggleView.bind(this)
  }

  componentDidMount() {
    this.props.getLiveStreams()
  }


  toggleView(stream) {
    const key = stream.user_name
    const activeList = [...this.state.active]
    const index = activeList.indexOf(key)
    if (index > -1) {
      activeList.splice(index, 1)
    } else {
      activeList.push(key)
    }

    this.setState({ active: activeList })
  }

  renderList() {
    return (
      <ul className='list-group'>
        {this.props.streams.map(v =>
          (<li onClick={() => this.toggleView(v)} className='list-group-item' key={v.id}>
            {this.renderItem(v)}
          </li>)
        )}
      </ul>
    )
  }

  renderView(count) {
    return (
      <span>
        <i className='material-icons text-danger md-18 mr-2'>remove_red_eye</i>
        <span>{count}</span>
      </span>
    )
  }

  renderItem(stream) {
    return (
      <div>
        <h6>{stream.user_name} - {this.renderView(stream.viewer_count)}</h6>
        {this.state.active.includes(stream.user_name) ?
          <TwitchPlayer
            theme={'dark'}
            width={'100%'}
            targetClass={`twitch_${stream.user_id}`}
            channel={stream.user_name}
          />
          :
          ''
        }
      </div>
    )
  }

  render() {
    if (!this.props.loaded) {
      return <Loader />
    }
    return (
      <div style={{ margin: '0 auto' }}>
        {
          this.props.streams.length === 0 ?
            <h6>No streams found</h6>
            : this.renderList()

        }
      </div>
    )
  }

}


const mapDispatchToProps = {
  getLiveStreams,
}

const mapStateToProps = state => ({
  streams: state.streams.data,
  loaded: state.streams.loaded
})

export default connect(mapStateToProps, mapDispatchToProps)(StreamView)

