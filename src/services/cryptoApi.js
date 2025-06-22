import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "X-RapidAPI-Key": "277ac1ba60msh68dc82c521bedf8p1fd025jsn5f23e7a38162",
  "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
};
//header are extra information sent with the request
//In this case we are sending the API key and host to authenticate our request

const baseUrl = "https://coinranking1.p.rapidapi.com"; //main address for the API

//createRequest Function is called in query to create the request object
//It takes a URL as an argument and returns an object with the URL and headers
const createRequest = (url) => ({
  url,
  headers: cryptoApiHeaders,
});
//createApi is the main that connect the API to the Redux store
export const cryptoApi = createApi({
  reducerPath: "cryptoApi", //reducerPath is the key in the Redux store where the API data will be stored
  //reducerPath is used to identify the API in the Redux store
  baseQuery: fetchBaseQuery({ baseUrl }),
  //fetchBaseQuery is a helper function that uses JavaScript’s fetch() behind the scenes.
  //Think of it like a smart fetch() shortcut that RTK Query uses to make API calls easily.

  //✅ Why we use it?
  //You could write fetch() manually, but it's long and messy.
  //Instead of doing this yourself:
  //fetch('https://api.com/some-data', {
  //   method: 'GET',
  //   headers: { 'X-API-Key': '12345' }
  // })

  endpoints: (builder) => ({
    //builder is an object you use to define different API calls (called endpoints).
    //Think of builder like a menu builder. You list out all the types of data you want to fetch

    //endpoints: The list of things you want to ask the API
    //getCryptos: The name you're giving this API call (you can name it anything)
    //query: () => ...: This is the actual request
    //"/exchanges": This is the endpoint — the specific thing you're asking for

    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
      //this query gets list of coins from api and we pass number in the URL to limit the number of coins returned
    }),
    getGlobalStats: builder.query({
      query: () => createRequest("/coins"),
      //this query gets global stats from api
      //means it will return everything about coins, exchanges, market cap, etc no limitation
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
      //this query gets details of a specific coin by its ID
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, timePeriod }) =>
        createRequest(`/coin/${coinId}/history?timePeriod=${timePeriod}`),
      //this query gets historical data of a specific coin by its ID
      //✅ corrected endpoint to use query param instead of path segment
    }),
    getExchanges: builder.query({
      query: () => createRequest("/exchanges"),
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetGlobalStatsQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
  useGetExchangesQuery,
} = cryptoApi;

//Redux Toolkit Query automatically generates React hooks for each endpoint you define.
// These hooks are used to fetch data in your React components.
// The name of the hook is derived from the endpoint name.
// For example, useGetCryptosQuery is the hook for the getCryptos endpoint.
//My endpoint is getCryptos, so the hook cannot be anytthing like useGetCoinsQuery or useGetCryptoQuery.
// This hook will handle fetching the data, caching it, and updating your component when the data changes.

// const axios = require("axios");

// const options = {
//   method: "GET",
//   url: "https://coinranking1.p.rapidapi.com/exchanges",
//   params: {
//     referenceCurrencyUuid: "yhjMzLPhuIDl",
//     limit: "50",
//     offset: "0",
//     orderBy: "24hVolume",
//     orderDirection: "desc",
//   },
//   headers: {
//     "x-rapidapi-key": "277ac1ba60msh68dc82c521bedf8p1fd025jsn5f23e7a38162",
//     "x-rapidapi-host": "coinranking1.p.rapidapi.com",
//   },
// };

// async function fetchData() {
//   try {
//     const response = await axios.request(options);
//     console.log(response.data);
//   } catch (error) {
//     console.error(error);
//   }
// }

// fetchData();
