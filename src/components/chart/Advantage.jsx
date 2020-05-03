import React from 'react'
import Chart from "react-apexcharts";

const options = {
  chart: {
    id: "basic-bar",
    toolbar: {
      show: false
    },
  },
  xaxis: {
    type: "categories",
    categories: [],
    labels: {
      show: false
    }
  },
};

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
          <Chart
            height={'250px'}
            options={options}
            series={[{ name: 'a', data: this.props.data }]}
            type="line"
          />
        </main>
      </div>
    )
  }
}
