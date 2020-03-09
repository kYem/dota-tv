import React from 'react'
import PropTypes from 'prop-types'
import connect from 'react-redux/es/connect/connect'
import './HomeView.scss'
import TopLiveMatches from '../../components/Match/TopLiveMatches'
import LiveMatch from '../../components/Match/LiveMatch'
import Progress from '../../components/Progress'
import { loadLiveMatch, subscribeToLiveMatch } from './homeSlice'

class HomeView extends React.Component {
  static propTypes = {
    loadLiveMatch: PropTypes.func.isRequired,
    subscribeToLiveMatch: PropTypes.func.isRequired,
    matches: PropTypes.array,
    liveMatch: PropTypes.shape({}),
    liveMatchServerId: PropTypes.string
  }

  static defaultProps = {
    liveMatchServerId: '',
    liveMatch: null,
    matches: [],
  }

  componentDidMount() {
    this.props.loadLiveMatch()
    this.refresh = setInterval(() => {
      this.props.loadLiveMatch()
    }, 6000)
  }

  componentWillUnmount() {
    clearInterval(this.refresh)
  }

  getMatches() {
    if (this.props.matches.length === 0) {
      return <Progress />
    }

    return this.props.matches.map(match => (
      <TopLiveMatches
        subscribeLiveMatch={this.props.subscribeToLiveMatch}
        active={this.props.liveMatchServerId === match.server_steam_id ? 'active' : 'inactive'}
        key={match.server_steam_id}
        {...match}
      />))
  }

  renderLiveMatch() {
    if (!this.props.liveMatchServerId) {
      return <Progress />
    }

    return (<LiveMatch
      wsGetLiveMatchDetails={this.props.subscribeToLiveMatch}
      serverId={this.props.liveMatchServerId}
      {...this.props.liveMatch}
    />)
  }

  render() {
    return (
      <div className={'row'}>
        <div className={'col-md-4 col-lg-3'}>
          {this.getMatches()}
        </div>
        <div className={'col-md-8 col-lg-9'}>
          {this.renderLiveMatch()}
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  loadLiveMatch,
  subscribeToLiveMatch,
}

const mapStateToProps = state => ({
  matches: state.home.matches,
  liveMatch: state.home.live,
  liveMatchServerId: state.home.server_steam_id
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
