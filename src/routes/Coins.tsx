import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components"
import { fetchCoins } from "./api";
import {Helmet} from "react-helmet";
import { HelmetProvider } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
    background-color: ${props=>props.theme.boxColor};
    color: ${props=>props.theme.textColor};
    margin-bottom: 10px;
    border-radius: 15px;
    a{
        display: flex;
        align-items: center;
        padding: 20px; //링크의 영역 확장(ux)
        transition: color .2s ease-in-out;
    }
    &:hover{
        a{
            color: ${props=>props.theme.accentColor};
        }
    }
`;

const Title = styled.h1`
    color: ${props=>props.theme.accentColor};
    font-size: 48px;
`
const Loader = styled.span`
    color: ${props=>props.theme.textColor};
    text-align: center;
    display: block;
`
const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`
const ToggleBtn = styled.button`
    position: fixed;
    top: 20px;
    left:0;
    border: none;
    border-radius: 10px;
    padding: 10px;
    margin-left: 10px;
    background-color: ${props=>props.theme.textColor};
    color: ${props=>props.theme.boxColor};
    cursor: pointer;
`


interface ICoin {
    "id": string,
    "name": string,
    "symbol": string,
    "rank": number,
    "is_new": boolean,
    "is_active": boolean,
    "type": string
}
interface ICoinsProps {
    toggleTheme: () => void;
    isDark:boolean;
}

function Coins({toggleTheme,isDark}:ICoinsProps) {

const {isLoading,data} = useQuery<ICoin[]>(["allCoins"],fetchCoins)
// const [coins,setCoins] = useState<ICoin[]>([]);
// const [loading,setLoading] = useState(true);

// useEffect(()=>{
//     (async()=>{
//         const response = await fetch("https://api.coinpaprika.com/v1/coins");
//         const json = await response.json();
//         setCoins(json.slice(0,100));
//         setLoading(false);
//     })()
// },[])

  return (
    <Container>
        <ToggleBtn onClick={toggleTheme}>{isDark?"Light":"ToDark"}</ToggleBtn>
        <HelmetProvider>
        <Helmet> {/*문서의 헤드로 보냄 */}
        <title>
            Coins
        </title>
      </Helmet>
        </HelmetProvider>
        <Header>
            <Title>Coins</Title>
        </Header>
        { isLoading ? <Loader>Loading...</Loader> : 
        <CoinsList>
            {data?.slice(0,100).map((coin)=>(
                <Coin key={coin.id}>
                    <Link to={`/${coin.id}`} state={coin} > {/*state를 통해 화면간 비하인드씬으로 데이터를 보냄 */}
                        <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} alt="coin_img" />
                        {coin.name} &rarr;
                    </Link>
                </Coin>
            ))}
        </CoinsList>}
    </Container>
  )
}

export default Coins