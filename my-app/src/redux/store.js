import { configureStore } from "@reduxjs/toolkit";
  import { enquiryApi } from "./service/enquiryApi";

  export const store = configureStore({
    reducer: {
      [enquiryApi.reducerPath]: enquiryApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(enquiryApi.middleware),
  });