import * as React from 'react';
import NoPic from '../../assets/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';
import { apiURL } from '../../globalConstants.ts';

interface ArtistProps {
  name: string;
  photo?: string | null;
  _id: string;
}

const ArtistItem: React.FC<ArtistProps> = ({name, photo}) => {
  const imageSrc = photo ? `${apiURL}/${photo}` : NoPic;

  return (
    <>
      <div className="col mb-5 h-100 d-flex">
        <div className="card">
          <img src={imageSrc} className="card-img-top" alt={name}/>
          <div className="card-body d-flex flex-column align-items-center">
            <h3 className="card-title">{name}</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtistItem;