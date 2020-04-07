import React, { useState, useEffect } from 'react';

import { fetchAverage } from './services/reviewService';
import Average from './components/Average';
import Reviews from './components/Reviews';
import styles from './App.module.scss';

const App = () => {
  const [average, setAverage] = useState();
  const [error, setError] = useState();
  const filterOptions = [
    'all',
    'family',
    'couple',
    'single',
    'friends',
    'other',
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchAverage();
        setAverage(result);
      } catch {
        setError(
          `This page is currently not available (have you tried running 'npm run server'?)`
        );
      }
    };
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (error) {
    return <section>{error}</section>;
  }

  if (!average) {
    return null;
  }

  return (
    <>
      <Average {...average} />
      <div className={styles.filter}>
        <section>
          Filter reviews by (with whom was the trip)
          <select>
            <option>All</option>
          </select>
        </section>
      </div>
      <Reviews />
    </>
  );
};

export default App;
