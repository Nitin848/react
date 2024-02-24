import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlanetCard from './PlanetCard';
import './Planets.css';

const Planets = () => {
  const [planets, setPlanets] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`https://swapi.dev/api/planets/?format=json&page=${page}`)
      .then(response => {
        setPlanets(prevPlanets => [...prevPlanets, ...response.data.results]);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching planets:', error);
        setIsLoading(false);
      });
  }, [page]);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <div className="planets">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        planets.map(planet => (
          <PlanetCard
            key={`planet-${Math.floor(Math.random() * 1000000) + 1}-${planet.url.split('/')[5]}`}
            planet={planet} loadMore={handleLoadMore}
          />
        ))
      )}
      {planets.length > 0 && (
        <button onClick={handleLoadMore} className="load-more">
          Load More
        </button>
      )}
    </div>
  );
};

export default Planets;