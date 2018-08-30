import votes from '../dummyModels/votes';

let voteValues = '';

const getVotes = () => {
  votes.forEach((vote, index) => {
    if (index === votes.length - 1) {
      voteValues += `
      ('${vote.userId}', 
      '${vote.answerId}', 
      ${vote.voteStatus})`;
    } else {
      voteValues += `
      ('${vote.userId}', 
      '${vote.answerId}', 
      ${vote.voteStatus}),`;
    }
  });
  return voteValues;
};

const seedVotes = `
INSERT INTO votes (userid, answerid, vote) VALUES ${getVotes()}`;

export default seedVotes;
