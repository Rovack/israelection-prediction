import pollsData from '../data/polls.json';

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

export default {
  getPartyNames,
  getVotesDistribution,
}
