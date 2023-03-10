import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

import { logo } from '../assets';


const SongCard = ({ song, isPlaying, activeSong, data, i }) => {
  const dispatch = useDispatch();

  // console.log(song)


  const handlePauseClick = () => {
    dispatch(playPause(false));

  }

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  }

  return (
    <>
    { song.hub?.actions && 
      <div className="flex flex-col w-[260px] md:w-[200px] p-2 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
        <div className="relative w-full group">
          <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.title === song.title ? 'flex bg-black bg-opacity-70' : 'hidden'}`}>
            <PlayPause
              isPlaying={isPlaying}
              activeSong={activeSong}
              song={song}
              handlePause={handlePauseClick}
              handlePlay={handlePlayClick}
            />
          </div>
          <img alt={logo} src={song.images?.coverart ? song.images?.coverart : logo} />
        </div>

        <div className="mt-4 flex flex-col">
          <p className="font-semibold text-lg text-white truncate">
            <Link to={`/songs/${song?.key}`}>
              {song.title}
            </Link>
          </p>
          <p className="text-sm truncate text-gray-300 mt-1">
            <Link to={song.artists ? `/artists/${song?.artists[0]?.adamid}` : '/top-artists'}>
              {song.subtitle}
            </Link>
          </p>
        </div>
    </div>
    }
    
    </>


  )
}

export default SongCard