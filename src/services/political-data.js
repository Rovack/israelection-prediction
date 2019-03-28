import pollsData from '../data/polls.json';
import wingsData from '../data/wings.json';

const totalMandates = 120;

// https://www.ynet.co.il/articles/0,7340,L-5469122,00.html
const numberOfEligibleCitizens = 6339279;
// Based on the percentage in 2015 - http://votes20.gov.il.
const votingPercentage = 72.34;

// TODO: Base this on demographic data.
const userVotes = 100000;

function getVotersPerMandate() {
  // TODO: Factor in the number of people whose votes are lost on parties that don't pass the min %.
  const numberOfVoters = (numberOfEligibleCitizens * votingPercentage) / 100;
  return numberOfVoters / totalMandates;
}

export function getPartyNames() {
  const firstPoll = Object.keys(pollsData)[0];
  const pollResults = pollsData[firstPoll];
  return pollResults.map(result => result.party);
}

export function getMandatesDistributionByPolls() {
  const firstPoll = Object.keys(pollsData)[0];
  const pollResults = pollsData[firstPoll];

  return pollResults.reduce((resultsObject, { party, mandates }) => ({
    ...resultsObject,
    [party]: parseFloat(mandates, 10),
  }), {});
}

export function getDistributionConsideringUserVote(userVoteParty) {
  const baseDistribution = getMandatesDistributionByPolls();
  const mandatesControlledByUser = userVotes / getVotersPerMandate();

  const numberOfParties = getPartyNames().length;
  const mandatesTakenByUserFromEachParty = mandatesControlledByUser / numberOfParties;

  return Object.keys(baseDistribution).reduce((updated, partyName) => ({
    ...updated,
    [partyName]: partyName === userVoteParty ?
      (baseDistribution[partyName] + mandatesControlledByUser) :
      (baseDistribution[partyName] - mandatesTakenByUserFromEachParty)
  }), {});
}

export function getWingSizes(votesDistribution) {
  const affilitationsData = wingsData.basic_wings;

  const initialWingSizes = affilitationsData.reduce((currentCount, { party, wing }) => {
    const partyMandates = votesDistribution[party];

    switch (wing) {
      case 'right':
        return { ...currentCount, right: currentCount.right + partyMandates };
      case 'left':
        return { ...currentCount, left: currentCount.left + partyMandates };
      default:
        return { ...currentCount, center: currentCount.center + partyMandates };
    }
  },
  { left: 0, right: 0, center: 0 });

  const {
    right: absoluteRight,
    left: absoluteLeft,
    center,
  } = initialWingSizes;

  if (absoluteLeft > absoluteRight) {
    return { left: absoluteLeft + center, right: absoluteRight };
  } else {
    return { right: absoluteRight + center, left: absoluteLeft };
  }
}

export default {
  getPartyNames,
  getMandatesDistributionByPolls,
  getDistributionConsideringUserVote,
  getWingSizes,
}
