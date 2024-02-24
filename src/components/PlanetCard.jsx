import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Residents from './Residents';
import './PlanetCard.css';

const PlanetCard = ({ planet, loadMore }) => {
  const [residents, setResidents] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchResidents = async () => {
      const residentPromises = planet.residents.slice(0, 5 * page).map(residentUrl =>
        axios.get(residentUrl)
      );

      const residentResponses = await Promise.all(residentPromises);
      setResidents(residentResponses.map(response => response.data));
      setIsLoading(false);
    };

    if (planet.residents.length > 0) {
      fetchResidents();
    } else {
      setIsLoading(false);
    }
  }, [planet.residents, page]);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <div className="planet-card">
      <h2>{planet.name}</h2>
      <p>Climate: {planet.climate}</p>
      <p>Population: {planet.population}</p>
      <p>Terrain: {planet.terrain}</p>
      <h3>Residents:</h3>
      {isLoading ? (
        <p>Loading...</p>
      ) : residents.length === 0 ? (
        <p>No residents found.</p>
      ) : (
        <Residents residents={residents} loadMore={handleLoadMore} />
      )}
    </div>
  );
};

export default PlanetCard;