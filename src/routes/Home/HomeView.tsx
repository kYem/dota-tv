import React from 'react'
import { connect } from 'react-redux'
import './HomeView.scss'
import TopLiveMatches from '../../components/Match/TopLiveMatches'
import LiveMatch from '../../components/Match/LiveMatch'
import Progress from '../../components/Progress'
import {
  LiveMatchState,
  loadLiveMatch,
  subscribeToLiveMatch
} from './homeSlice'
import { RootState } from '../../store/rootReducer'
import { Match } from '../../models/TopLiveGames'

interface HomeViewProps {
  loadLiveMatch: () => void,
  subscribeToLiveMatch: any,
  matches: Match[],
  liveMatchServerId: string,
  liveMatchState: LiveMatchState,
}

class HomeView extends React.Component<HomeViewProps> {

  static defaultProps = {
    liveMatchServerId: '',
    matches: [],
  }
  refresh!: NodeJS.Timeout

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

    const { isLoading, updated, data } = this.props.liveMatchState
    return (<LiveMatch
      wsGetLiveMatchDetails={this.props.subscribeToLiveMatch}
      serverId={this.props.liveMatchServerId}
      isLoading={isLoading}
      updated={updated}
      {...data}
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

const mapStateToProps = (state: RootState) => ({
  matches: state.home.matches,
  liveMatchState: state.home.live,
  liveMatchServerId: state.home.server_steam_id
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
