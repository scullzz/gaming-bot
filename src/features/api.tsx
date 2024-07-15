import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TelegramAuthDateDto } from "../types/TelegramAuthDateDto";
import { GetStreamerDto } from "../types/getStreamerDto";
import { createEntityAdapter, EntityState } from "@reduxjs/toolkit";
import { GetSubscriberDto } from "../types/getSubscriberDto";
import { GetSubscribersRequest } from "../types/getSubscribersRequest";
import { GetRaffleDto } from "../types/getRaffleDto";
import { GetRafflesRequest } from "../types/getRafflesRequest";
import { GetAdminDto } from "../types/getAdminDto";

export const subscribersAdapter = createEntityAdapter<GetSubscriberDto>();

export const rafflesAdapter = createEntityAdapter<GetRaffleDto>();

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
    getRaffles: builder.query<
      EntityState<GetRaffleDto, number>,
      GetRafflesRequest
    >({
      query: (req) =>
        `streamer/${req.id}/raffles?page=${req.page}&pageSize=${req.pageSize}&type=${req.type}`,
      transformResponse: (res: GetRaffleDto[]) => {
        return rafflesAdapter.addMany(rafflesAdapter.getInitialState(), res);
      },
      keepUnusedDataFor: 1,
      forceRefetch: ({ currentArg, previousArg }) => {
        return (
          currentArg?.page != previousArg?.page ||
          currentArg?.pageSize != previousArg?.pageSize
        );
      },
      serializeQueryArgs: ({ queryArgs, endpointName }) => {
        return `${endpointName}-${queryArgs.pageSize}-${queryArgs.id}-${queryArgs.type}`;
      },
      merge: (current, incoming) => {
        rafflesAdapter.addMany(
          current,
          rafflesAdapter.getSelectors().selectAll(incoming)
        );
      },
    }),
    getAdmins: builder.query<GetAdminDto[], string>({
      query: (req) => `streamer/${req}/admins`,
    }),
  }),
});

export const {
  useCheckAuthQuery,
  useGetAuthMutation,
  useGetStreamerQuery,
  useGetSubscribersQuery,
  useGetRafflesQuery,
  useGetAdminsQuery,
} = api;
