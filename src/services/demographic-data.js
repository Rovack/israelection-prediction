import demographyData from '../data/demography.json';

// https://www.ynet.co.il/articles/0,7340,L-5469122,00.html
const numberOfEligibleCitizens = 6339279;

// Based on the percentage in 2015 - http://votes20.gov.il.
const votingPercentage = 72.34;

export function getTotalVoters() {
  // TODO: Factor in the number of people whose votes are lost on parties that don't pass the min %.
  return (numberOfEligibleCitizens * votingPercentage) / 100;
}

export function getQuestions() {
  return Object.keys(demographyData).map(question => ({
    question,
    possibleAnswers: demographyData[question].map(({ category }) => category),
  }));
}

export function getPeopleInDemographicGroup(params) {
  const votersFilteredByParams = Object.keys(params).reduce((peopleLeft, param) => {
    const categoriesForParam = demographyData[param];
    const userChosenCategory = params[param];
    const categoryData = categoriesForParam.find(possibleData =>
      possibleData.category === userChosenCategory);

    return peopleLeft * categoryData.percent;
  }, getTotalVoters());
  return Math.round(votersFilteredByParams);
}

export default {
  getTotalVoters,
  getQuestions,
  getPeopleInDemographicGroup,
};
