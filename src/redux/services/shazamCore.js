import {createApi, fakeBaseQuery, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

// const options = {
//     method: 'GET',
//     headers: {
//       'X-RapidAPI-Key': 'ae633046a4mshfb7980a0cc6c5fap132de4jsnb33395669c79',
//       'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
//     }
//   };
  
//   fetch('https://shazam.p.rapidapi.com/charts/track', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));


 export const shazamApi = createApi({
    reducerPath: 'shazamApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core.p.rapidapi.com',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key','ae633046a4mshfb7980a0cc6c5fap132de4jsnb33395669c79');

            return headers;
        }
    }),
    endpoints: (builder) => ({
        getTopCharts: builder.query({query: () => '/v1/charts/world'}),
        getSongDetails: builder.query({query: ({songid}) => `/v1/tracks/details?track_id=${songid}`}),
        getSongRelated: builder.query({query: ({songid}) => `/v1/tracks/related?track_id=${songid}`}),
        getArtistDetails: builder.query({query: (artistId) => `/v2/artists/details?artist_id=${artistId}`})
    })
 })   


export const {
    useGetTopChartsQuery,
    useGetSongDetailsQuery,
    useGetSongRelatedQuery,
    useGetArtistDetailsQuery
} = shazamApi