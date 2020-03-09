import React from 'react'
import { connect } from 'react-redux'
import './StreamView.scss'
import Loader from '../../components/loader/Loader'
import TwitchPlayer from '../../components/twitch/TwitchPlayer'
import { getLiveStreamsDetails } from './streamSlice'
import { Stream } from '../../models/Stream'
import { RootState } from '../../store/rootReducer'


interface StreamViewProp {
  streams: Stream[],
  getLiveStreamsDetails: () => void,
  loaded: boolean,
}

class StreamView extends React.Component<StreamViewProp> {


  static defaultProps = {
    streams: [],
    loaded: false,
  }

  state: { active: string[] } = {
    active: []
  }

  componentDidMount() {
    this.props.getLiveStreamsDetails()
  }


  toggleView = (stream: Stream) => {
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

  renderView(count: number) {
    return (
      <span>
        <i className='material-icons text-danger md-18 mr-2'>remove_red_eye</i>
        <span>{count}</span>
      </span>
    )
  }

  renderItem(stream: Stream) {
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
  getLiveStreamsDetails,
}

const mapStateToProps = (state: RootState) => ({
  streams: state.streams.data,
  loaded: state.streams.loaded
})

export default connect(mapStateToProps, mapDispatchToProps)(StreamView)

