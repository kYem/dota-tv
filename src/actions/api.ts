import 'whatwg-fetch'
import BaseMapper from './baseMapper'
import config from '../project.config';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { Stream } from '../models/Stream';

export const API_ERROR = 'API_ERROR'

const DEFAULT_OPTIONS: RequestInit = {
  method: 'GET',
  credentials: 'same-origin',
  headers: new Headers({
    Accept: 'application/json',
  })
}

export const mapper = new BaseMapper()

export async function getLiveMatches(partner = 0) {
  const response = await fetch(`${config.apiHostname}/live?partner=${partner}`, DEFAULT_OPTIONS)
  return response.json()
}

export async function getLiveStreams() {
  const response = await fetch(`${config.apiHostname}/streams`, DEFAULT_OPTIONS)
  return response.json()
}

// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: 'api',
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: fetchBaseQuery({ baseUrl: config.apiHostname }),
  // The "endpoints" represent operations and requests for this server
  endpoints: builder => ({
    // The `getPosts` endpoint is a "query" operation that returns data
    getPosts: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: () => '/posts'
    }),
    getLiveStreams: builder.query<Stream[], void>({
      // The URL for the request is '/fakeApi/posts'
      query: () => '/streams'
    }),
  })
})


export const { useGetPostsQuery, useGetLiveStreamsQuery } = apiSlice
