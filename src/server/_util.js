function getAge(dateString) {
  const today = new Date(Date.now());
  const compareDate = new Date(dateString);
  let age = today.getFullYear() - compareDate.getFullYear();
  const m = today.getMonth() - compareDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < compareDate.getDate())) {
    age -= 1;
  }
  return age;
}

function getReviewWeight({ entryDate }) {
  // when the review is older than 5 years its weight value defaults to 0.5.
  if (getAge(entryDate) > 5) {
    return 0.5;
  }

  // Otherwise it equals: 1 - (current_year - year_of_review)\*0.1
  // note: I used getAge() here to be consistant with the above comparison, because it's
  // more acurate than current_year - year_of_review. But in the end this should be a business
  // descision
  return 1 - getAge(entryDate) * 0.1;
}

function getAverageRatings(reviews) {
  let generalCount = 0;
  const items = {};
  const itemsCounts = {};
  const aspects = Object.keys(reviews[0].ratings.aspects);
  reviews.forEach((review) => {
    const weight = getReviewWeight(review);
    generalCount += review.ratings.general.general * weight;
    aspects.forEach((a) => {
      items[a] = items[a] || 0;
      if (review.ratings.aspects[a]) {
        items[a] += review.ratings.aspects[a] * weight;
        itemsCounts[a] = itemsCounts[a] || 0;
        itemsCounts[a] += 1;
      }
    });
  });
  const generalAvg = (generalCount / reviews.length).toFixed(1);
  Object.keys(itemsCounts).forEach((item) => {
    itemsCounts[item] = (items[item] / itemsCounts[item]).toFixed(1);
  });
  return { generalAvg, aspecsAvg: itemsCounts };
}

function getAverageTravelledWith(reviews) {
  const categories = {};
  const categoriesCount = {};
  reviews.forEach((item) => {
    const category = item.traveledWith;
    categoriesCount[category] = categoriesCount[category] || 0;
    categoriesCount[category] += 1;
  });
  Object.keys(categoriesCount).forEach((item) => {
    categories[item] = (categoriesCount[item] * 10) / reviews.length;
  });

  return categories;
}

module.exports = {
  getAverageRatings,
  getAverageTravelledWith,
  getReviewWeight,
};
