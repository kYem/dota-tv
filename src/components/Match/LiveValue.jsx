import React from 'react'
import PropTypes from 'prop-types'
import './LiveValue.scss'

export default class LiveValue extends React.Component {

  static propTypes = {
    value: PropTypes.number.isRequired,
    includeSymbol: PropTypes.bool.isRequired,
    shouldResetStyle: PropTypes.bool.isRequired,
    positiveClass: PropTypes.string.isRequired,
    negativeClass: PropTypes.string.isRequired,
    changeClass: PropTypes.string.isRequired,
    highlightClass: PropTypes.string.isRequired,
  }

  static defaultProps = {
    positiveClass: 'up',
    negativeClass: 'down',
    changeClass: 'change',
    includeSymbol: false,
    highlightClass: 'highlight',
    shouldResetStyle: true,
  }


  static getDerivedStateFromProps(props, state) {
    let positiveNegative = props.shouldResetStyle ? '' : state.positiveNegative
    if (props.value !== state.oldValue) {
      positiveNegative = props.value > state.oldValue ? props.positiveClass : props.negativeClass
    }

    return { positiveNegative, oldValue: props.value }
  }

  state = {
    positiveNegative: '',
    isSymbolVisible: false,
  }

  render() {
    return (
      <span
        className={`stats-count ${this.state.positiveNegative} ${this.props.highlightClass}`}
        data-value={this.state.oldValue}
      >
        {this.props.includeSymbol ? <span className={this.props.changeClass} /> : ''}
        {this.props.value}
      </span>
    )
  }
}

