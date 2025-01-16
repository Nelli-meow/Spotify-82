import * as React from 'react';
import { apiURL } from '../../globalConstants.ts';
import NoPic from '../../assets/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';

interface AlbumsProps {
  name: string;
  photo?: string | null;
  year: string;
  num: string;
}

const AlbumItem: React.FC<AlbumsProps> = ({name, photo, year, num}) => {
  const imageSrc = photo ? `${apiURL}/${photo}` : NoPic;

  return (
    <>
      <div className="col mb-5 h-100 d-flex">
        <div className="card">
          <img src={imageSrc} className="card-img-top" alt={name}/>
          <div className="card-body d-flex flex-column justify-content-between">
            <h3 className="card-title">{name}</h3>
            <span>{year}</span>
            <span>{num}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default AlbumItem;