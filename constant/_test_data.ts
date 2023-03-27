const series = {
  slug: 'series for test',
  time: 3600,
  title: 'SImple Test Series for testing',
  is_saved: false,
  is_marked: false,
  question_score: '56%',
  user_attempt_list: ['90%', '85%'],
};

const section = {
  title: 'English',
  questionsCount: '25',
  time: 3000,
  marks: {
    positive: 2,
    negative: -0.5,
  },
  questions: [
    {
      type: 'mcq',
      QSNo: 1,
      SSNo: 1,
      SSSNo: 0,
      hindi: {
        question: 'This is Test Questions One',
        options: [
          {
            prompt: '1',
            value: 'मंडल',
          },
          {
            prompt: '2',
            value: 'बहिर्मंडल',
          },
          {
            prompt: '3',
            value: 'बाह्य वायुमंडल',
          },
          {
            prompt: '4',
            value: 'क्षोभ मंडल',
          },
        ],
      },
      english: {
        question: 'The ______ lies above the mesopause and is a region in which temperatures increase with height.',
        options: [
          {
            prompt: '1',
            value: 'stratosphere',
          },
          {
            prompt: '2',
            value: 'exosphere',
          },
          {
            prompt: '3',
            value: 'thermosphere',
          },
          {
            prompt: '4',
            value: 'troposphere',
          },
        ],
      },
    },
  ],
};
