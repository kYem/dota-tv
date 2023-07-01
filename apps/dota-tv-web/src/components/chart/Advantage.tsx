import React from 'react'
import Chart from "react-apexcharts";
import { ApexOptions } from 'apexcharts';

const options: ApexOptions = {
  chart: {
    id: "basic-bar",
    toolbar: {
      show: false
    },
  },
  xaxis: {
    type: "category",
    categories: [],
    labels: {
      show: false
    }
  },
};

interface Props {
  data: any[]
}

export default function Advantage(props: Props) {
  return (
    <div className='liveMatchChart'>
      <header>
        <h4 className='title'>Gold Advantage</h4>
      </header>
      <main>
        <Chart
          height={'250px'}
          options={options}
          series={[{ name: 'a', data: props.data }]}
          type="line"
        />
      </main>
    </div>
  )
}

Advantage.defaultProps = {
  data: [],
}
