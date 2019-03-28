import pollsData from '../data/polls.json';

const totalMandates = 120;

//
const numberOfEligibleCitizens = 6339279;
// Based on the percentage in 2015 - http://votes20.gov.il.
const votingPercentage = 72.34;

export function getPartyNames() {
  const firstPoll = Object.keys(pollsData)[0];
  const pollResults = pollsData[firstPoll];
  return pollResults.map(result => result.party);
}

export function getVotesDistribution() {
  const firstPoll = Object.keys(pollsData)[0];
  const pollResults = pollsData[firstPoll];

  return pollResults.reduce((resultsObject, { party, mandates }) => ({
    ...resultsObject,
    [party]: parseFloat(mandates, 10),
  }), {});
}

export function getVotersPerMandate() {
  // TODO: Factor in the number of people whose votes are lost on parties that don't pass the min %.
  const numberOfVoters = (numberOfEligibleCitizens * votingPercentage) / 100;
  return numberOfVoters / totalMandates;
}

export default {
  getPartyNames,
  getVotesDistribution,
  getVotersPerMandate,
}
