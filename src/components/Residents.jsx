import React, { useState } from 'react';

const Residents = ({ residents, loadMore }) => {
  const [displayedResidents, setDisplayedResidents] = useState(residents.slice(0, 5));

  const handleLoadMore = () => {
    const newDisplayedResidents = displayedResidents.concat(residents.slice(displayedResidents.length, displayedResidents.length + 5));
    setDisplayedResidents(newDisplayedResidents);

    if (loadMore) {
      loadMore();
    }
  };

  return (
    <div>
      <ul className="residents">
        {displayedResidents.map(resident => (
          <li key={resident.name} className="resident">
            <p className="resident-name">{resident.name}</p>
            <p className="resident-details">Height: {resident.height}</p>
            <p className="resident-details">Mass: {resident.mass}</p>
            <p className="resident-details">Gender: {resident.gender}</p>
          </li>
        ))}
      </ul>
      {residents.length > displayedResidents.length && (
        <button onClick={handleLoadMore} className="load-more">
          Load More
        </button>
      )}
    </div>
  );
};

export default Residents;