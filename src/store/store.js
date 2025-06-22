import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "../services/cryptoApi";
import { cryptoNewsApi } from "../services/cryptoNewsApi";
import { cryptoExchangesApi } from "../services/cryptoExchangesApi"; // ✅ Add this

const store = configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    [cryptoExchangesApi.reducerPath]: cryptoExchangesApi.reducer, // ✅ Add this
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(cryptoApi.middleware)
      .concat(cryptoNewsApi.middleware)
      .concat(cryptoExchangesApi.middleware), // ✅ Add this
});

export default store;

//getDefaultMiddleware()	Adds Redux's built-in features (like error checks)
//.concat(cryptoApi.middleware)	Adds RTK Query logic to handle API requests, caching, loading, etc.
//Whole line	Adds both types of helpers to make your store smart and API-ready

//cryptoApi.reducerPath is name of the slice
//This is the name we created in the cryptoApi service file.
//This tells redux-toolkit to use the reducer from the cryptoApi service.

//The automatic reducer that RTK Query creates for you.
// It is responsible for:
// Storing data returned from the API
// Tracking loading, success, and error states
// Handling caching and re-fetching
