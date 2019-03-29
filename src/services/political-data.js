import pollsData from '../data/polls.json';
import wingsData from '../data/wings.json';
import {
  getPeopleInDemographicGroup,
  getTotalVoters,
} from './demographic-data';

const totalMandates = 120;

function getVotersPerMandate() {
  const numberOfVoters = getTotalVoters();
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

export function getDistributionConsideringUserVote(userVoteParty, demographicParams) {
  const userVotes = getPeopleInDemographicGroup(demographicParams);

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
