import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

  export const enquiryApi = createApi({
    reducerPath: "enquiryApi",
    baseQuery: fetchBaseQuery({
      baseUrl: import.meta.env.VITE_API_URL || "http://localhost:8000",
      headers: { "Content-Type": "application/json" },
    }),
    tagTypes: ["Enquiry"],
    endpoints: (builder) => ({
      submitEnquiry: builder.mutation({
        query: (body) => ({ url: "/api/enquiry", method: "POST", body }),
        invalidatesTags: ["Enquiry"],
      }),
      getEnquiries: builder.query({
        query: ({ skip = 0, limit = 100 } = {}) =>
          `/api/enquiries?skip=${skip}&limit=${limit}`,
        providesTags: ["Enquiry"],
      }),
    }),
  });

  export const { useSubmitEnquiryMutation, useGetEnquiriesQuery } = enquiryApi;
