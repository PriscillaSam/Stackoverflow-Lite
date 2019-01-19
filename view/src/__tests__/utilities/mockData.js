export const signUp = {
  loader: {
    requesting: true,
  },
};

export const signUp2 = {
  loader: {
    requesting: true,
  },
};

export const logIn = {
  loader: {
    requesting: false,
  },
};

export const logIn2 = {
  loader: {
    requesting: true,
  },
};

export const questions = {
  getQuestions: {
    fetching: false,
    searchedQuestions: [
      {
        id: 1,
        name: 'Garry Doe',
        question: 'A new question',
      },
      {
        id: 2,
        name: 'Garry Doe',
        question: 'Another question',
      },
    ],
    error: null,
  },
  postQuestion: {
    sending: true,
    sent: false,
  },
};

export const questions2 = {
  getQuestions: {
    fetching: false,
    searchedQuestions: [],
    error: null,
  },
};

export const question = {
  singleQuestion: {
    fetching: false,
    question: {
      id: 1,
      question: 'Why is programming hard?',
      created_at: '2018-12-22T20:22:19.940Z',
      user_id: 6,
      name: 'Garry Doe',
      answers: [
        {
          id: 1,
          answer: 'Its not hard, just difficult',
          user_id: 2,
          name: 'John Doe',
          email: 'john.doe@gmailcom',
          upvotes: '0',
          downvotes: '0',
          comments: '0',
          created_at: '2018-12-22T20:22:19.940Z',
          is_accepted: false,
        },
        {
          id: 2,
          answer: 'I love programming',
          user_id: 3,
          name: 'Sam Doe',
          email: 'sami@gmail.com',
          upvotes: '0',
          downvotes: '0',
          comments: '0',
          created_at: '2018-12-22T20:22:19.940Z',
          is_accepted: false,
        },
      ],
    },
  },
  postAnswer: {
    posting: false,
    answers: [
      {
        id: 2,
        answer: 'I love programming',
        user_id: 3,
        email: 'sami@gmail.com',
        upvotes: '0',
        downvotes: '0',
        comments: '0',
        created_at: '2018-12-22T20:22:19.940Z',
        is_accepted: false,
      },
    ],
  },
  postQuestion: {
    sending: true,
    sent: false,
  },
};

export const question2 = {
  singleQuestion: {
    fetching: false,
    question: {
      id: 1,
      question: 'Why is programming hard?',
      created_at: '2018-12-22T20:22:19.940Z',
      user_id: 6,
      name: 'Garry Doe',
      answers: [
      ],
    },
  },
  postAnswer: {
    posting: false,
    answers: [],
  },
  postQuestion: {
    sending: true,
    sent: false,
  },
};

export const userProfile = {
  userProfile: {
    fetching: false,
    profile: {
      user_id: 4,
      answers: '1',
      asked: 2,
      most_answered: [
        {
          id: 3,
          question: 'Why do we have seasons and weather?',
          created_at: '2018-12-22T20:22:19.940Z',
          answers: '6',
        },
        {
          id: 2,
          question: 'Cooking is a skill or inborn?',
          created_at: '2018-12-22T20:22:19.940Z',
          answers: '3',
        },
      ],
      recent: [
        {
          id: 3,
          question: 'Why do we have seasons and weather?',
          created_at: '2018-12-22T20:22:19.940Z',
          answers: '6',
        },
        {
          id: 2,
          question: 'Cooking is a skill or inborn?',
          created_at: '2018-12-22T20:22:19.940Z',
          answers: '3',
        },
      ],
    },
  },
  postQuestion: {
    sending: false,
    questions: [
      {
        answers: 0,
        created_at: '2019-01-02T12:29:04.431Z',
        id: 22,
        question: 'A newer me and you and and and youuuuuuu',
      },
    ],
    sent: true,
    error: null,
  },
};

export const userProfile2 = {
  userProfile: {
    fetching: false,
    profile: {
      user_id: 4,
      answers: '1',
      asked: 2,
      most_answered: [],
      recent: [],
    },
  },
  postQuestion: {
    sending: true,
    questions: [],
    sent: true,
    error: null,
  },
};

export const postQuestion = {
  postQuestion: {
    sending: true,
    sent: false,
  },
};

export const postQuestion2 = {
  postQuestion: {
    sending: false,
    sent: true,
  },
};
