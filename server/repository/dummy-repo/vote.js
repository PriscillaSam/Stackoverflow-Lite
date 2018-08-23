import votes from '../../models/dummy-models/votes';

const repo = {
  /**
   * Get all votes for an answer
   * @param {number} id Answer Id to get votes for
   * @returns {object} Answer Votes
   */
  getVotes(id) {
    const answerVotes = votes.filter(vote => vote.answerId === id);
    const upvotes = answerVotes.filter(vote => vote.voteStatus === 1).length;
    const downvotes = answerVotes.filter(vote => vote.voteStatus === 0).length;
    return {
      upvotes,
      downvotes,
    };
  },
  /**
   * Creates a vote on an answer
   * @param {number} userId Voting User id
   * @param {number} answerId Answer id
   * @param {number} voteStatus Vote Status 0-downvote 1-upvote
   * @returns {string} Vote message
   */
  createVote(userId, answerId, voteStatus) {
    const userVote = votes
      .find(vote => vote.answerId === answerId && vote.userId === userId);
    if (userVote) {
      if (userVote.voteStatus === voteStatus) {
        if (voteStatus === 0) {
          return 'downvote error';
        }
        return 'upvote error';
      }

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
    const ids = votes.map(vote => vote.id);
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
