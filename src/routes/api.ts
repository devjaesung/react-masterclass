
const BASEURL = 'https://api.coinpaprika.com';

    export async function fetchCoins() {
        return await (await fetch(`${BASEURL}/v1/coins`)).json();
    }

    export async function fetchCoinInfo(coinId: string) {
        return await (await fetch(`${BASEURL}/v1/coins/${coinId}`)).json();
    }

    export async function fetchCoinTickers(coinId: string) {
        return await (await fetch(`${BASEURL}/v1/tickers/${coinId}`)).json();
    }

    export async function fetchCoinHistory(coinId:string) {
        return await (await fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`)).json();
    }
 

    //${BASEURL}/v1/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}