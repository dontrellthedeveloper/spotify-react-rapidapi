import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs, TopPlay } from '../components';

import { useGetArtistDetailsQuery } from '../redux/services/shazamCore';

const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: artistData, isFetching: isFetchingArtistDetails, error } = useGetArtistDetailsQuery(artistId);

  if (isFetchingArtistDetails) return <Loader title="Loading artist details..." />;

  if (error) return <Error />;

  console.log(artistData)

  return (
    <div className='px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse'>
      <div className="flex-1 h-fit pb-40 ">

        <div className="flex flex-col">
          <DetailsHeader
            artistId={artistId}
            artistData={artistData?.data[0]}
          />

          <RelatedSongs
            data={artistData?.data[0].views['top-songs']?.data}
            artistId={artistId}
            isPlaying={isPlaying}
            activeSong={activeSong}
            
          />
        </div>
      </div>
      <div className="xl:sticky hidden xl:block relative top-0 h-fit">
        <TopPlay />
      </div>
    </div>
  );
};

export default ArtistDetails;