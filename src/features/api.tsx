import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TelegramAuthDateDto } from "../types/TelegramAuthDateDto";
import { GetStreamerDto } from "../types/getStreamerDto";
import { createEntityAdapter, EntityState } from "@reduxjs/toolkit";
import { GetSubscriberDto } from "../types/getSubscriberDto";
import { GetSubscribersRequest } from "../types/getSubscribersRequest";

export const subscribersAdapter = createEntityAdapter<GetSubscriberDto>();

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    checkAuth: builder.query<void, void>({
      query: () => `auth`,
    }),
    getAuth: builder.mutation<void, TelegramAuthDateDto>({
      query: (req) => ({ url: "auth", method: "POST", body: req }),
    }),
    getStreamer: builder.query<GetStreamerDto, string>({
      query: (req) => `streamer/${req}`,
    }),
    getSubscribers: builder.query<
      EntityState<GetSubscriberDto, number>,
      GetSubscribersRequest
    >({
      query: (req) =>
        `streamer/${req.id}/subscribers?page=${req.page}&pageSize=${req.pageSize}`,
      transformResponse: (res: GetSubscriberDto[]) => {
        return subscribersAdapter.addMany(
          subscribersAdapter.getInitialState(),
          res
        );
      },
      keepUnusedDataFor: 1,
      forceRefetch: ({ currentArg, previousArg }) => {
        return (
          currentArg?.page != previousArg?.page ||
          currentArg?.pageSize != previousArg?.pageSize
        );
      },
      serializeQueryArgs: ({ queryArgs, endpointName }) => {
        return `${endpointName}-${queryArgs.pageSize}-${queryArgs.id}`;
      },
      merge: (current, incoming) => {
        subscribersAdapter.addMany(
          current,
          subscribersAdapter.getSelectors().selectAll(incoming)
        );
      },
    }),
  }),
});

export const {
  useCheckAuthQuery,
  useGetAuthMutation,
  useGetStreamerQuery,
  useGetSubscribersQuery,
} = api;
