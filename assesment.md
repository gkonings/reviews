# Zoover FE assessment

This is an assignment that requires creating a good web UI visual performing a set of mathematical calculations and a web UI for visualisation.
A ready server that returns a collection of reviews for one single accommodation is provided and this acco page needs to be implemented.

## What is provided

- After installing dependencies, run the server using `npm start`
- Now you can use the ready endpoints, they are fully configured to be used directly in all the required cases and CORS enabled so you build FE on a different server locally with no problem.
- use `/reviews` to get all reviews, `/reviews/average` to get averages. or try them yourself to get better understanding.

## what is required

1. Fix the missing `getReviewWeight` function in `_util.js` to do the required job. Each review has to have a weight value in the calculations. The weight value can be calculated as follows:
   when the review is older than 5 years its weight value defaults to 0.5. Otherwise it equals: 1 - (current_year - year_of_review)\*0.1

2. Build a UI to visualise the calculated rating values of the accommodation along with the list of reviews. It is up to you to choose how to serve reviews from the server; the choice will influence the assessment though. The following functionality is required:

- filter by traveledWith value.
- sort by travel date or review submission date.
- paginate between the list of reviews to show max 10 per page
- find the attached image for inspiration (Not required to be the same).

3. (Nice to implement but not required) implement a search functionality to search in the reviews about any text.

## General Note

We expect UI design to be responsive, it's nice to have code in TypeScript if possible (not a must), use React function components instead of classes, and Hooks whenever useful, show your code quality.
