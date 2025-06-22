// services/cryptoExchangesApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Optional API key header to avoid strict rate limiting
const cryptoExchangesHeaders = {
  "x-cg-demo-api-key": "CG-CtNwrC4E5PTC94Hszqccemp1",
};

const baseUrl = "https://api.coingecko.com/api/v3";

const createRequest = (url) => ({
  url,
  headers: cryptoExchangesHeaders,
});

export const cryptoExchangesApi = createApi({
  reducerPath: "cryptoExchangesApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getExchanges: builder.query({
      // This gets a list of exchanges; default pagination params
      query: ({ perPage = 50, page = 1 } = {}) =>
        createRequest(`/exchanges?per_page=${perPage}&page=${page}`),
    }),
  }),
});

export const { useGetExchangesQuery } = cryptoExchangesApi;
