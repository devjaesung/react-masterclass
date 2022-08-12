import { useQuery } from '@tanstack/react-query';
import { fetchCoinHistory } from './api';
import ApexChart from 'react-apexcharts'

interface ChartProps{
  coinId: string;
  isDark: boolean;
}
interface IHistorical {
  time_open: string
  time_close: string
  open:number
  high:number
  low: number
  close: number
  volume: number
  market_cap: number
  }


function Chart({coinId,isDark}:ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId),
    {
      refetchInterval: 10000, //10초마다 refetch실행 -> background에서 데이터 최신화
    }
  );
  return (
    <div>{isLoading? "Loading...": 
    <ApexChart 
    type='candlestick' 
    options={{
      theme:{mode:isDark? "dark" : "light"},
      chart:{height:300,width:500,type:"candlestick",toolbar:{show:false},background:"transparent"},
      xaxis: {labels:{show:false,datetimeFormatter:{month:"MMM 'yy"}},
      categories: data?.map((price) => +price.time_close * 1000),
      type: "datetime",},
      yaxis: {show:false},
      tooltip: {y: {formatter:(value)=>`$ ${value.toFixed(2)}`}}
    }}

    series={[
      {
      data: data?.map((price) => {
      return{
      x: price.time_close,
      y: [price.open, price.high, price.low, price.close]
      }
      })
      },
      ] as any}
    />}

    </div>
  )
}

export default Chart