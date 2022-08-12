import { useQuery } from '@tanstack/react-query';
import { fetchCoinHistory } from './api';
import ApexChart from 'react-apexcharts'

interface ChartProps{
  coinId: string;
  isDark : boolean
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

function Price({coinId,isDark}:ChartProps) {

  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
  fetchCoinHistory(coinId),
  {
    refetchInterval: 10000, //10초마다 refetch실행 -> background에서 데이터 최신화
  }
);
  return (
   
    <div>{isLoading? "Loading...": 
    <ApexChart 
    type='line' 
    options={{
      theme:{mode:isDark? "dark" : "light"},
      chart:{height:300,width:500,toolbar:{show:false},background:"transparent"},
      stroke: {curve:'smooth',width:3},
      grid: {show:false},
      yaxis:{show:false},
      xaxis:{labels:{show:false,datetimeFormatter:{month:"MMM 'yy"}},
        axisTicks:{show:false},
        axisBorder:{show:false},
        categories: data?.map((price) => +price.time_close * 1000),
        type: "datetime"},
      fill: {type:"gradient",gradient:{gradientToColors:["tomato"],stops:[0,100]}},
      colors:[isDark?"#44bd32":"#7400C7"],
      tooltip: {y: {formatter:(value)=>`$ ${value.toFixed(2)}`}}
    }}
    series={[
      {
        name: "price",
        data: data?.map((price) => Number(price.close)) as number[],
      }
    ]}
    />}

    </div>
  )
}

export default Price