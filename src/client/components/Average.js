import React from 'react';
import pt from 'prop-types';

import RatingOverview from './RatingOverview';

import StarRating from './StarRating';
import styles from './Average.module.scss';

const Average = ({ generalAvg, aspecsAvg, traveledWithAvg }) => {
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

Average.propTypes = {
  generalAvg: pt.string,
  aspecsAvg: pt.shape({}),
  traveledWithAvg: pt.shape({}),
};

Average.defaultProps = {
  generalAvg: null,
  aspecsAvg: null,
  traveledWithAvg: null,
};

export default Average;
