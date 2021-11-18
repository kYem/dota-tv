import React from 'react'
import { connect } from 'react-redux'
import './HomeView.scss'
import TopLiveMatches from '../../components/Match/TopLiveMatches'
import { LiveMatch } from '../../components/Match/LiveMatch'
import Progress from '../../components/Progress'
import { loadLiveMatch, setLiveMatchId } from './homeSlice'
import { Match } from '../../models/TopLiveGames'
import { RootState } from '../../store/store';

interface HomeViewProps {
  loadLiveMatch: () => void,
  setLiveMatchId: any,
  matches: Match[],
  liveMatchServerId: string,
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
        setLiveMatchId={this.props.setLiveMatchId}
        active={this.props.liveMatchServerId === match.server_steam_id ? 'active' : 'inactive'}
        key={match.server_steam_id}
        {...match}
      />))
  }

  render() {
    return (
      <div className={'row'}>
        <div className={'col-md-4 col-lg-3'}>
          {this.getMatches()}
        </div>
        <div className={'col-md-8 col-lg-9'}>
          <LiveMatch server_steam_id={this.props.liveMatchServerId} />
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  loadLiveMatch,
  setLiveMatchId,
}

const mapStateToProps = (state: RootState) => ({
  matches: state.home.matches,
  liveMatchServerId: state.home.server_steam_id
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
