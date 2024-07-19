import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TelegramAuthDateDto } from "../types/TelegramAuthDateDto";
import { GetStreamerDto } from "../types/getStreamerDto";
import { createEntityAdapter, EntityState } from "@reduxjs/toolkit";
import { GetSubscriberDto } from "../types/getSubscriberDto";
import { GetSubscribersRequest } from "../types/getSubscribersRequest";
import { GetRaffleDto } from "../types/getRaffleDto";
import { GetRafflesRequest } from "../types/getRafflesRequest";
import { GetAdminDto } from "../types/getAdminDto";
import { CreateRaffleRequest } from "../types/CreateRaffleRequest";

export const subscribersAdapter = createEntityAdapter<GetSubscriberDto>();

export const rafflesAdapter = createEntityAdapter<GetRaffleDto>();

export const streamersAdapter = createEntityAdapter<GetStreamerDto>();

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  tagTypes: ["streamers", "raffles", "subscribers"],
  endpoints: (builder) => ({
    checkAuth: builder.query<void, void>({
      query: () => `auth`,
    }),
    getAuth: builder.mutation<void, TelegramAuthDateDto>({
      query: (req) => ({ url: "auth", method: "POST", body: req }),
    }),
    getStreamers: builder.query<
      EntityState<GetStreamerDto, number>,
      { page: number; pageSize: number; userId: string }
    >({
      query: (req) =>
        `streamer?pageSize=${req.pageSize}&page=${req.page}&userId=${req.userId}`,
      transformResponse: (res: GetStreamerDto[]) => {
        return streamersAdapter.addMany(
          streamersAdapter.getInitialState(),
          res
        );
      },
      providesTags: [{ type: "streamers", id: "LIST" } as const],
      keepUnusedDataFor: 1,
      forceRefetch: ({ currentArg, previousArg }) => {
        return (
          currentArg?.page != previousArg?.page ||
          currentArg?.pageSize != previousArg?.pageSize ||
          currentArg?.userId != previousArg?.userId
        );
      },
      serializeQueryArgs: ({ queryArgs, endpointName }) => {
        return `${endpointName}-${queryArgs.pageSize}-${queryArgs.userId}`;
      },
      merge: (current, incoming) => {
        streamersAdapter.addMany(
          current,
          streamersAdapter.getSelectors().selectAll(incoming)
        );
      },
    }),
    getStreamer: builder.query<
      GetStreamerDto,
      { tgId: string; userId: string }
    >({
      query: (req) => `streamer/${req.tgId}?userId=${req.userId}`,
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
      providesTags: ["subscribers"],
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
    getAvailableSocials: builder.query<string[], void>({
      query: () => "streamer/socials",
    }),
    subscribeToStreamer: builder.mutation<
      void,
      { userId: string; streamerId: string }
    >({
      query: (req) => ({
        url: `streamer/${req.streamerId}/subscribers/${req.userId}`,
        method: "PUT",
      }),
      invalidatesTags: (res, error, { streamerId }) => [
        { type: "streamers", id: "LIST" },
        { type: "streamers", id: streamerId },
        { type: "subscribers", id: "LIST" },
      ],
    }),
    unSubFromStreamer: builder.mutation<
      void,
      { userId: string; streamerId: string }
    >({
      query: (req) => ({
        url: `streamer/${req.streamerId}/subscribers/${req.userId}`,
        method: "DELETE",
      }),
      invalidatesTags: (res, error, { streamerId }) => [
        { type: "streamers", id: streamerId },
        { type: "subscribers", id: "LIST" },
      ],
    }),
    getRaffles: builder.query<
      EntityState<GetRaffleDto, number>,
      GetRafflesRequest
    >({
      query: (req) =>
        `streamer/${req.id}/raffles?page=${req.page}&pageSize=${req.pageSize}&type=${req.type}&userId=${req.userId}`,
      transformResponse: (res: GetRaffleDto[]) => {
        return rafflesAdapter.addMany(rafflesAdapter.getInitialState(), res);
      },
      keepUnusedDataFor: 1,
      providesTags: ["raffles"],
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
    createRaffle: builder.mutation<void, CreateRaffleRequest & { id: string }>({
      query: (req) => ({
        url: `streamer/${req.id}/raffles`,
        method: "POST",
        body: { ...req },
      }),
      invalidatesTags: ["raffles"],
    }),
    getAvailableConditions: builder.query<string[], void>({
      query: () => "streamer/conditions",
    }),
    createPost: builder.mutation<void, { data: FormData; id: string }>({
      query: (req) => ({
        url: `streamer/${req.id}/posts`,
        body: req.data,
        method: "POST",
      }),
    }),
    doParticipantInRaffle: builder.mutation<
      void,
      { raffleId: number; userId: string; streamerId: string }
    >({
      query: (req) => ({
        url: `streamer/${req.streamerId}/raffles/${req.raffleId}/participants/${req.userId}`,
        method: "PUT",
      }),
    }),
    getRaffleById: builder.query<
      GetRaffleDto,
      { streamerId: string; raffleId: number }
    >({
      query: (req) => `streamer/${req.streamerId}/raffles/${req.raffleId}`,
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
  useGetStreamersQuery,
  useSubscribeToStreamerMutation,
  useGetAvailableSocialsQuery,
  useUnSubFromStreamerMutation,
  useCreateRaffleMutation,
  useGetAvailableConditionsQuery,
  useGetRaffleByIdQuery,
  useDoParticipantInRaffleMutation,
  useCreatePostMutation,
} = api;
