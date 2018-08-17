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

};

export default repo;
