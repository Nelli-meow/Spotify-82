import React from 'react';

interface Props {
  name: string;
  duration: string;
  datetime: string;
  artist: string;
}

const TracksHistoryItem: React.FC<Props> = ({ datetime, duration, name, artist}) => {

  return (
    <>
      <div className="border border-1 rounded-md shadow-sm my-5 p-4">
        <p>{name} - {artist}</p>
        <p>Duration: {duration}</p>
        <p>Date: {datetime}</p>
      </div>
    </>
  );
};

export default TracksHistoryItem;