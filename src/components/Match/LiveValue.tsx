import React from 'react'
import './LiveValue.scss'

interface LiveValueProps {
  value: number,
  includeSymbol: boolean,
  shouldResetStyle: boolean,
  positiveClass: string,
  negativeClass: string,
  changeClass: string,
  highlightClass: string,
}

interface LiveValueState {
  positiveNegative: string;
  isSymbolVisible: boolean;
  oldValue: number;
}

export default class LiveValue extends React.Component<LiveValueProps, LiveValueState> {


  static defaultProps = {
    positiveClass: 'up',
    negativeClass: 'down',
    changeClass: 'change',
    includeSymbol: false,
    highlightClass: 'highlight',
    shouldResetStyle: true,
  }


  static getDerivedStateFromProps(props: LiveValueProps, state: LiveValueState) {
    let positiveNegative = props.shouldResetStyle ? '' : state.positiveNegative
    if (props.value !== state.oldValue) {
      positiveNegative = props.value > state.oldValue ? props.positiveClass : props.negativeClass
    }

    return { positiveNegative, oldValue: props.value }
  }

  state = {
    positiveNegative: '',
    isSymbolVisible: false,
    oldValue: 0,
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

