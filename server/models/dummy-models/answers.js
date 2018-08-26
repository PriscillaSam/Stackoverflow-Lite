import repo from '../../repository/dummy-repo/vote';

const answers = [
  {
    id: 1,
    userId: 2,
    questionId: 1,
    answer: 'Its not hard, just difficult',
    isAccepted: false,
    ...repo.getVotes(1),
  },

  {
    id: 2,
    userId: 3,
    questionId: 1,
    answer: 'I love programming',
    isAccepted: false,
    ...repo.getVotes(2),

  },
  {
    id: 3,
    userId: 3,
    questionId: 2,
    answer: 'Cooking is not an inborn skill. It is learned',
    isAccepted: true,
    ...repo.getVotes(3),

  },
  {
    id: 4,
    userId: 6,
    questionId: 2,
    answer: 'It can be inborn and it can be learned as well',
    isAccepted: false,
    ...repo.getVotes(4),

  },
  {
    id: 5,
    userId: 5,
    questionId: 2,
    answer: 'I really dont care about cooking. I dont even know why you guys bother to cook. Eating out is the best option',
    isAccepted: false,
    ...repo.getVotes(5),

  },
  {
    id: 6,
    userId: 4,
    questionId: 3,
    answer: 'I really am not sure but I feel like God wants it so.',
    isAccepted: false,
    ...repo.getVotes(6),

  },
  {
    id: 7,
    userId: 3,
    questionId: 3,
    answer: 'I guess it helps to keep track of time.',
    isAccepted: true,
    ...repo.getVotes(7),

  },
  // use for votes
  {
    id: 8,
    userId: 3,
    questionId: 3,
    answer: 'I dont know the answer to this question but i just wanted to say i love the question',
    isAccepted: false,
    ...repo.getVotes(8),

  },
  {
    id: 9,
    userId: 3,
    questionId: 3,
    answer: 'Seasons are for timings and proceesses. I am not sure.',
    isAccepted: false,
    ...repo.getVotes(9),

  },
  {
    id: 10,
    userId: 3,
    questionId: 3,
    answer: 'Sample answer to question 3',
    isAccepted: false,
    ...repo.getVotes(10),

  },
  {
    id: 11,
    userId: 3,
    questionId: 3,
    answer: 'Another Sample answer for question 3.',
    isAccepted: false,
    ...repo.getVotes(11),

  },
  {
    id: 12,
    userId: 1,
    questionId: 4,
    answer: 'I think about 30ft',
    isAccepted: false,
    ...repo.getVotes(12),

  },
  {
    id: 13,
    userId: 5,
    questionId: 4,
    answer: 'They cant climb at all.',
    isAccepted: false,
    ...repo.getVotes(13),

  },
  {
    id: 14,
    userId: 7,
    questionId: 9,
    answer: 'Javascipt is not used for server side.',
    isAccepted: false,
    ...repo.getVotes(14),

  },
  {
    id: 15,
    userId: 1,
    questionId: 9,
    answer: 'I think its still better for the browser.',
    isAccepted: false,
    ...repo.getVotes(15),

  },
  {
    id: 16,
    userId: 3,
    questionId: 10,
    answer: 'You always catch them looking at you for no reason at all.',
    isAccepted: false,
    ...repo.getVotes(16),

  },
  {
    id: 17,
    userId: 2,
    questionId: 10,
    answer: 'They are usually nervous and fidgety around you.',
    isAccepted: false,
    ...repo.getVotes(17),

  },
  {
    id: 18,
    userId: 1,
    questionId: 10,
    answer: 'Sample answer for question 10',
    isAccepted: false,
    ...repo.getVotes(18),

  },
  {
    id: 19,
    userId: 3,
    questionId: 13,
    answer: 'Terminal inverse activity',
    isAccepted: false,
    ...repo.getVotes(19),

  },
  {
    id: 20,
    userId: 2,
    questionId: 13,
    answer: 'Who cares what TIA means?',
    isAccepted: false,
    ...repo.getVotes(20),

  },
  // test answer for acceptance
  {
    id: 21,
    userId: 1,
    questionId: 13,
    answer: 'This is Andela.',
    isAccepted: false,
    ...repo.getVotes(21),

  },
  {
    id: 22,
    userId: 3,
    questionId: 12,
    answer: 'Test answer',
    isAccepted: false,
    ...repo.getVotes(22),

  },
  {
    id: 23,
    userId: 1,
    questionId: 10,
    answer: 'Test answer for question 10',
    isAccepted: false,
    ...repo.getVotes(23),

  },
  {
    id: 24,
    userId: 5,
    questionId: 5,
    answer: 'I think it was a woman',
    isAccepted: false,
    ...repo.getVotes(24),

  },
  {
    id: 25,
    userId: 6,
    questionId: 5,
    answer: 'Garrys test answer',
    isAccepted: false,
    ...repo.getVotes(24),

  },
];

export default answers;
