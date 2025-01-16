import * as React from 'react';

interface TracksProps {
  name: string;
  duration: string;
  number: string;
}

const TracksItem: React.FC<TracksProps> = ({name, number, duration}) => {
  return (
    <>
      <div className="col mb-5">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">{name}</h3>
            <span className="card-text">{duration}</span>
            <div>
              <span className="card-text fs-5">{number}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TracksItem;