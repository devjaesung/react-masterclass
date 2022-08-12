import { useLocation, useParams, Routes, Route, Link, useMatch } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from 'styled-components'
import Price from './Price'
import Chart from './Chart'
import { useQuery } from "@tanstack/react-query";
import {Helmet} from "react-helmet";
import { HelmetProvider } from "react-helmet-async";
import { fetchCoinInfo, fetchCoinTickers } from "./api";

interface RouteParams {
 coinId: string;
}
interface RouteState {
    state: {
        name: string;
        rank: number;
        }
}
interface InfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
  }
  interface PriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
      USD: {
        ath_date: string;
        ath_price: number;
        market_cap: number;
        market_cap_change_24h: number;
        percent_change_1h: number;
        percent_change_1y: number;
        percent_change_6h: number;
        percent_change_7d: number;
        percent_change_12h: number;
        percent_change_15m: number;
        percent_change_24h: number;
        percent_change_30d: number;
        percent_change_30m: number;
        percent_from_price_ath: number;
        price: number;
        volume_24h: number;
        volume_24h_change_24h: number;
      };
    };
  }
  interface ICoinProps {
    isDark : boolean;
  }
//styled-components
const Title = styled.h1`
    color: ${props=>props.theme.accentColor};
    font-size: 48px;
    text-align: center;
`
const Loader = styled.span`
    color: ${props=>props.theme.textColor};
    text-align: center;
    display: block;
`
const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;
const Header = styled.header`
    height: 10vh;
    display: flex;
    align-items: center;
`;
const Overview = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: ${props=>props.theme.boxColor};
    padding: 10px 20px;
    border-radius: 10px;
`;
const OverviewItem =  styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    span:first-child {
        font-size: 10px;
        font-weight: 400;
        text-transform: uppercase;
        margin-bottom: 5px;
  }
`
const Description = styled.p`
  margin: 20px 0px;
`;
const Tabs = styled.div`
  display  : grid;
  grid-template-columns: repeat(2,1fr);
  margin: 25px 0px;
  gap: 10px;
`;
const Tab = styled.span<{isActive : boolean}>` //isActive라는 prop으로 useMatch에서 받아온 값을 확인
    text-align: center;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 400;
    background-color: ${props=>props.theme.boxColor};
    padding: 7px 0;
    border-radius: 10px;
    a{
        display: block;
        color: ${props=> props.isActive ? props.theme.accentColor : props.theme.textColor}
    }
`
const BackBtn = styled.span`
    font-size: 18px;
    font-weight: bold;
    position: relative;
    padding: 20px;
    top: 0; left: 0;
    color: ${props=>props.theme.textColor};
    cursor: pointer;
    &:hover{
      color: ${props=>props.theme.accentColor}; 
    }
`

function Coin({isDark}:ICoinProps) {
const { coinId } = useParams<keyof RouteParams>() as RouteParams;
//useParams : url의 특정 파라미터를 알고싶을 사용하는 훅
const { state } = useLocation() as RouteState;
//useLocation : Coins.tsx에서 state로 보내준 값을 받기 위한 훅

// const [loading,setLoading] = useState(true);
// const [info,setInfo] = useState<InfoData>();
// const [priceInfo,setPriceInfo] = useState<PriceData>();
// useEffect(()=>{
//     (async()=>{
//         const infoData = await(
//             await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
//         ).json();
//         const priceData = await(
//             await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
//         ).json();
//         setInfo(infoData);
//         setPriceInfo(priceData);
//         setLoading(false);
//     })();
// },[coinId]);
const priceMatch = useMatch("/:coinId/price"); //특정 url에 위치해 있는지 확인하는 hook
const chartMatch = useMatch("/:coinId/chart");

const {isLoading: infoLoading,data: infoData} = useQuery<InfoData>(["info",coinId],()=>fetchCoinInfo(coinId))
const {isLoading: tickersLoading,data: tickersData} = useQuery<PriceData>(["tickers",coinId],()=>fetchCoinTickers(coinId),{refetchInterval:5000})
const loading = infoLoading || tickersLoading;

 return (
    <Container>
      <HelmetProvider>
      <Helmet> {/*문서의 헤드(브라우저 탭)로 보냄 */}
        <title>
        {state?.name ? state.name : loading? "loading..." : infoData?.name} 
        </title>
      </Helmet>
      </HelmetProvider>
    <Header>
      <Link to="/">
        <BackBtn>&lt; back</BackBtn>
      </Link>
        
        <Title>{state?.name ? state.name : loading? "loading..." : infoData?.name}</Title>
    </Header>
    {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>{tickersData?.quotes.USD.price.toFixed(2)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>

        <Tabs>
            <Tab isActive={chartMatch !== null}>
                <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
                <Link to ={`/${coinId}/price`}>Price</Link>
            </Tab>
        </Tabs>

          <Routes>
            <Route path="chart" element={<Chart coinId={coinId} isDark={isDark}/>} />
            <Route path="price" element={<Price coinId={coinId} isDark={isDark}/>} />
        </Routes>
        </>
      )}
    </Container>
 );
}

export default Coin;