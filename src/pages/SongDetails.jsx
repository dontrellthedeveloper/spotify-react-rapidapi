import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs, TopPlay } from '../components';

import { setActiveSong, playPause } from '../redux/features/playerSlice';
import { useGetSongDetailsQuery, useGetSongRelatedQuery } from '../redux/services/shazamCore';


const SongDetails = () => {

const dispatch = useDispatch();
const { songid, id: artistId } = useParams();
const { activeSong, isPlaying } = useSelector((state) => state.player);

const { data: songData, isFetching: isFetchingSongDetails } = useGetSongDetailsQuery({ songid });
const { data, isFetching: isFetchinRelatedSongs, error } = useGetSongRelatedQuery({ songid });

if (isFetchingSongDetails && isFetchinRelatedSongs) return <Loader title="Searching song details" />;

console.log(songData);

if (error) return <Error />;

const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

    return (

      <div className='px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse'>
        <div className="flex-1 h-fit pb-40 ">

          <div className="flex flex-col">
            <DetailsHeader
              artistId={artistId}
              songData={songData}
            />

              <div className="mb-10">
                  <h2 className="text-white text-3xl font-bold">Lyrics:</h2>

                  <div className="mt-5">
                      {songData?.sections[1].type === 'LYRICS'
                          ? songData?.sections[1]?.text.map((line, i) => (
                          <p key={`lyrics-${line}-${i}`} className="text-gray-400 text-base my-1">{line}</p>
                          ))
                          : (
                          <p className="text-gray-400 text-base my-1">Sorry, No lyrics found!</p>
                      )}
                  </div>
              </div>

              <RelatedSongs
                  data={data}
                  artistId={artistId}
                  isPlaying={isPlaying}
                  activeSong={activeSong}
                  handlePauseClick={handlePauseClick}
                  handlePlayClick={handlePlayClick}
              />
          </div>
        </div>
        <div className="xl:sticky hidden xl:block relative top-0 h-fit">
          <TopPlay />
        </div>
      </div>


    )
}
export default SongDetails;
