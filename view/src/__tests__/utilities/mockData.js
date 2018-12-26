export const signUp = {
  signUp: {
    creating: false,
    message: '',
    error: '',
  },
};

export const logIn = {
  logIn: {
    loggingIn: false,
    token: '',
    message: '',
    error: '',
  },
};

export const questions = {
  getQuestions: {
    fetching: false,
    questions: [
      {
        id: 1,
      },
      {
        id: 2,
      },
    ],
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
      answers: [],
    },
  },
};
