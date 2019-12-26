import React from 'react'
import { CartesianGrid, Line, LineChart, YAxis } from 'recharts'


export default class Advantage extends React.Component {

  static defaultProps = {
    data: [],
  }

  render() {
    return (
      <div className='liveMatchChart'>
        <header>
          <h4 className='title'>Gold Advantage</h4>
        </header>
        <main>
          <LineChart
            width={730}
            height={250}
            data={this.props.data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <YAxis />
            <Line
              type='natural'
              dot={false}
              strokeWidth={2}
              dataKey='value'
              stroke='#8884d8'
            />
          </LineChart>
        </main>
      </div>
    )
  }
}
