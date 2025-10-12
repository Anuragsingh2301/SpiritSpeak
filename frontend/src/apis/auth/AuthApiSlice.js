import { APISlice } from "../APISlice";

export const authApiSlice = APISlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/api/auth/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth", "User"],
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/api/auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth", "User"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/api/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth", "User"],
    }),
    getCurrentUser: builder.query({
      query: () => ({
        url: "/api/auth/me",
        method: "GET",
      }),
      providesTags: ["Auth", "User"],
    }),
  }),
});

export const { 
  useRegisterMutation,
  useLoginMutation, 
  useLogoutMutation, 
  useGetCurrentUserQuery,
} = authApiSlice;
