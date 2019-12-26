import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './LiveView.scss'
import LiveMatch from '../../../components/Match/LiveMatch'
import { getLiveMatchDetails } from '../../../actions/api'

export class LiveView extends React.Component {

  static propTypes = {
    getLiveMatchDetails: PropTypes.func.isRequired,
    liveMatch: PropTypes.shape({
      teams:  PropTypes.array,
    })
  }

  componentDidMount() {
    this.props.getLiveMatchDetails(this.props.params.serverId, 'live')
  }

  render() {
    let match = null
    if (this.props.liveMatch && this.props.liveMatch.teams) {
      match = <LiveMatch getLiveMatchDetails={this.props.getLiveMatchDetails} {...this.props.liveMatch} />
    }

    return (
      <div style={{ margin: '0 auto' }} >
          {this.props.liveMatch === undefined ? 'Loading ...' : match || <h6>match data not available</h6>}
      </div>
    )
  }
}


const mapDispatchToProps = {
  getLiveMatchDetails,
}

const mapStateToProps = state => ({
  liveMatch: state.live.live
})

export default connect(mapStateToProps, mapDispatchToProps)(LiveView)

