import React, { useState, useEffect } from 'react';

import { fetchAverage } from '../services/reviewService';
import RatingOverview from '../components/score/ScoreOverview';
import StarRating from '../components/StarRating';
import styles from './Average.module.scss';

const Average = () => {
  const [average, setAverage] = useState();
  const [error, setError] = useState();

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

  const { generalAvg, aspecsAvg, traveledWithAvg } = average;
  return (
    <section>
      <div className={styles.heading}>
        <h1 className={styles.title}>Accomodation X</h1>
        {generalAvg && (
          <StarRating rating={generalAvg} className={styles.rating} />
        )}
      </div>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac quam
        arcu. Curabitur fermentum condimentum massa sed laoreet. Fusce placerat
        lectus vel quam tristique, in blandit libero sollicitudin. Suspendisse
        accumsan magna non cursus tincidunt. Ut gravida mattis quam id interdum.
        Nullam et arcu posuere nulla vehicula elementum et sit amet enim. Ut at
        arcu id arcu finibus consectetur eu et magna. Fusce ullamcorper erat sit
        amet nunc placerat, sit amet bibendum urna dapibus. Nulla elementum sed
        lectus ut tempor. Phasellus pellentesque accumsan faucibus.{' '}
      </p>

      {aspecsAvg && (
        <>
          <h2>The average ratings of this accomodation</h2>
          <RatingOverview ratings={aspecsAvg} type="stars" />
        </>
      )}

      {traveledWithAvg && (
        <>
          <h2>The percentage of traveledWith</h2>
          <RatingOverview ratings={traveledWithAvg} type="percentage" />
        </>
      )}
    </section>
  );
};

export default Average;
