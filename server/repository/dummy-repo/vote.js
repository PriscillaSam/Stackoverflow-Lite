import votes from '../../models/dummy-models/votes';

const repo = {
  /**
   * Get all votes for an answer
   * @param {number} id Answer Id to get votes for
   */
  getVotes(id) {
    const answerVotes = votes.filter(v => v.answerId === id);
    const upvotes = answerVotes.filter(v => v.voteStatus === 1).length;
    const downvotes = answerVotes.filter(v => v.voteStatus === 0).length;
    return {
      upvotes,
      downvotes,
    };
  },
  /**
   * Creates a vote on an answer
   * @param {number} userId Voting User id
   * @param {number} answerId Answer id
   */
  createVote(userId, answerId, voteStatus) {
    const userVote = votes.find(v => v.answerId === answerId && v.userId === userId);
    if (userVote) {
      // if user has voted before
      if (userVote.voteStatus === voteStatus) {
        if (voteStatus === 0) {
          return 'downvote error';
        }
        return 'upvote error';
      }

      // else get the vote and update it

      const index = votes.indexOf(userVote);
      userVote.voteStatus = voteStatus;
      const newVote = votes.splice(index, 1, userVote);
      switch (newVote[0].voteStatus) {
        case 0:
          return 'downvote success';
        case 1:
          return 'upvote success';
        default:
          return 0;
      }
    }
    const ids = votes.map(v => v.id);
    const newVote = {
      id: Math.max(...ids) + 1,
      userId,
      answerId,
      voteStatus,
    };

    votes.push(newVote);
    return newVote.voteStatus;
  },
};

export default repo;
